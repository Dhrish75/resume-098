import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleNavigation = () => {
    navigate("/"); // Navigate to the homepage
  };

  const handleLoginNavigation = () => {
    navigate("/signup"); // Navigate to the login (signup) page
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#E0E0E0" }}>
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Clickable Logo */}
          <span
            className="navbar-brand"
            onClick={handleNavigation}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none", // Prevent underline
            }}
          >
            RESUME BUILDER
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Contact with Hover Popup */}
            <div
              className="nav-item"
              onMouseEnter={() => setShowContactPopup(true)}
              onMouseLeave={() => setShowContactPopup(false)}
              style={{
                position: "relative",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Contact
              {showContactPopup && (
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 10,
                    width: "200px",
                  }}
                >
                  <p style={{ margin: "5px 0" }}>+1-123-456-7890</p>
                  <p style={{ margin: "5px 0" }}>+1-987-654-3210</p>
                  <p style={{ margin: "5px 0" }}>+1-555-555-5555</p>
                </div>
              )}
            </div>

            {/* Login Button using useNavigate */}
            <button
              onClick={handleLoginNavigation}
              className="nav-item2"
              style={{
                background: "none",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <Outlet /> {/* Render child components */}
    </>
  );
};

export default Navbar;
