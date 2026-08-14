import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  loginApi,
  registerApi,
  logoutApi,
  getMeApi,
} from "../api/auth.api";
import { getProgressApi, updateProgressApi } from "../api/progress.api";

// Create Context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState({
    completedQuestions: [],
    completedTopics: [],
    totalSolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial progress when user is logged in
  const fetchProgress = useCallback(async () => {
    try {
      const res = await getProgressApi();
      if (res?.data) {
        setUserProgress(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch user progress:", err.message);
    }
  }, []);

  // Restore persistent login session on initial mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const meRes = await getMeApi();
        if (meRes?.data) {
          setUser(meRes.data);
          await fetchProgress();
        }
      } catch (err) {
        // Unauthenticated session - clear local token if invalid
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [fetchProgress]);

  // Login handler
  const login = async (credentials) => {
    setError(null);
    try {
      const res = await loginApi(credentials);
      const { user: userData, token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      setUser(userData);
      await fetchProgress();
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Register handler
  const register = async (userDataInput) => {
    setError(null);
    try {
      const res = await registerApi(userDataInput);
      const { user: userData, token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      setUser(userData);
      await fetchProgress();
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout API error:", err.message);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setUserProgress({
        completedQuestions: [],
        completedTopics: [],
        totalSolved: 0,
      });
    }
  };

  // Toggle single question completion and sync to backend
  const toggleQuestionCompletion = async (questionId) => {
    if (!user) return;
    const currentCompleted = userProgress.completedQuestions || [];
    const numericId = Number(questionId);
    
    let updatedQuestions;
    if (currentCompleted.includes(numericId)) {
      updatedQuestions = currentCompleted.filter((id) => id !== numericId);
    } else {
      updatedQuestions = [...currentCompleted, numericId];
    }

    // Optimistic UI update
    setUserProgress((prev) => ({
      ...prev,
      completedQuestions: updatedQuestions,
      totalSolved: updatedQuestions.length,
    }));

    try {
      const res = await updateProgressApi({
        completedQuestions: updatedQuestions,
        completedTopics: userProgress.completedTopics || [],
      });
      if (res?.data) {
        setUserProgress(res.data);
      }
    } catch (err) {
      console.error("Failed to sync progress to server:", err.message);
      // Revert state if backend update failed
      await fetchProgress();
    }
  };

  // Clear all progress on server
  const clearProgress = async () => {
    if (!user) return;
    setUserProgress((prev) => ({
      ...prev,
      completedQuestions: [],
      totalSolved: 0,
    }));
    try {
      const res = await updateProgressApi({
        completedQuestions: [],
        completedTopics: userProgress.completedTopics || [],
      });
      if (res?.data) {
        setUserProgress(res.data);
      }
    } catch (err) {
      console.error("Failed to clear progress on server:", err.message);
      await fetchProgress();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProgress,
        loading,
        error,
        login,
        register,
        logout,
        toggleQuestionCompletion,
        clearProgress,
        fetchProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
