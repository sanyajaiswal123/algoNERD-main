import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StaggeredMenu from "../components/Navbar";
import "../css/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Curriculum", link: "/curriculum" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    
    if (!email || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      await login({ email, password });
      navigate("/curriculum");
    } catch (err) {
      setLocalError(err.message || "Failed to log in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="navbar-wrapper text-[1.5rem]" style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        <StaggeredMenu items={menuItems} socialItems={socialItems} />
      </div>

      <div className="auth-glow-bg"></div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">
            algo<span className="highlight">NERD</span>
          </h1>
          <p className="auth-subtitle">&lt; Access Your Workspace /&gt;</p>
        </div>

        {localError && <div className="auth-error">{localError}</div>}

        <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: localError ? "1rem" : 0 }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="nerd@algonerd.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Authenticating..." : "Log In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create One
          </Link>
        </div>
      </div>
    </div>
  );
}
