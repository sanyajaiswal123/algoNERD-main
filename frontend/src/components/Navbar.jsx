/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function StaggeredMenu({ items = [], socialItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    toggleMenu();
    await logout();
    navigate("/login");
  };

  // Build dynamic menu items combining provided items with Auth actions
  const dynamicItems = [...items];

  // Remove existing auth links if present in items array to avoid duplicates
  const baseItems = dynamicItems.filter(
    (item) =>
      !["Login", "Register", "Profile", "Logout"].includes(item.label)
  );

  if (user) {
    baseItems.push({ label: `Profile (${user.name.split(" ")[0]})`, link: "/profile" });
    baseItems.push({ label: "Logout", action: handleLogoutClick });
  } else {
    baseItems.push({ label: "Login", link: "/login" });
    baseItems.push({ label: "Register", link: "/register" });
  }

  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.5 } },
    open: { x: 0, transition: { type: "tween", duration: 0.5 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.4 },
    }),
  };

  const handleItemClick = (item) => {
    toggleMenu();
    if (item.action) {
      item.action();
    } else if (item.link) {
      navigate(item.link);
    }
  };

  return (
    <>
      <button
        className="nav-toggle-btn"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <div style={{ position: "relative", width: "24px", height: "24px" }}>
          <span
            className="hamburger-line"
            style={{
              top: isOpen ? "11px" : "4px",
              transform: isOpen ? "rotate(45deg)" : "rotate(0)",
            }}
          />
          <span
            className="hamburger-line"
            style={{ top: "11px", opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="hamburger-line"
            style={{
              top: isOpen ? "11px" : "18px",
              transform: isOpen ? "rotate(-45deg)" : "rotate(0)",
            }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "#0f1012",
              zIndex: 1999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <nav style={{ textAlign: "center" }}>
              {baseItems.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  style={{ margin: "20px 0" }}
                >
                  <button
                    onClick={() => handleItemClick(item)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "2rem",
                      color: item.label === "Logout" ? "#ef4444" : "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}

              <div
                style={{
                  marginTop: "8vh",
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {socialItems.map((social, i) => (
                  <motion.div
                    key={i}
                    custom={baseItems.length + i}
                    variants={itemVariants}
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#FFA500",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {social.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
