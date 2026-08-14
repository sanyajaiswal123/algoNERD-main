import apiClient from "./axios";

export const getProgressApi = async () => {
  const response = await apiClient.get("/progress");
  return response.data;
};

export const updateProgressApi = async (progressData) => {
  const response = await apiClient.put("/progress", progressData);
  return response.data;
};
