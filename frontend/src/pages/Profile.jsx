import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StaggeredMenu from "../components/Navbar";
import "../css/Auth.css";

export default function Profile() {
  const { user, userProgress, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Curriculum", link: "/curriculum" },
    { label: "Problems", link: "/question" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initialLetter = user?.name ? user.name.charAt(0).toUpperCase() : "N";
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const totalSolved = userProgress?.totalSolved || 0;
  const completedIds = userProgress?.completedQuestions || [];

  return (
    <div className="profile-container">
      <div className="navbar-wrapper text-[1.5rem]" style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        <StaggeredMenu items={menuItems} socialItems={socialItems} />
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{initialLetter}</div>
          <div className="profile-info">
            <h1>{user?.name || "Nerd Coder"}</h1>
            <p>{user?.email || "coder@algonerd.com"}</p>
            <p style={{ marginTop: "0.4rem", color: "#ffa500", fontSize: "0.8rem" }}>
              Member since: {joinedDate}
            </p>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="stat-box">
            <div className="stat-value">{totalSolved}</div>
            <div className="stat-label">Problems Solved</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{user?.role?.toUpperCase() || "USER"}</div>
            <div className="stat-label">Account Role</div>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#ffa500" }}>
            Solved Problem IDs ({completedIds.length})
          </h3>
          {completedIds.length === 0 ? (
            <p style={{ color: "#9ca3af", fontFamily: "'JetBrains Mono', monospace" }}>
              No problems completed yet. Head to the curriculum to start solving!
            </p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {completedIds.map((id) => (
                <span
                  key={id}
                  onClick={() => navigate(`/question/${id}`)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    backgroundColor: "rgba(255, 165, 0, 0.15)",
                    border: "1px solid rgba(255, 165, 0, 0.4)",
                    borderRadius: "6px",
                    color: "#ffa500",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  #{id}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => navigate("/curriculum")}
            className="auth-submit-btn"
            style={{ flex: 1 }}
          >
            Go To Curriculum
          </button>
          <button
            onClick={handleLogout}
            className="auth-submit-btn"
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid #ef4444",
              color: "#ef4444",
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
