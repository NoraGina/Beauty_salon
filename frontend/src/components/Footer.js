import { Link, useNavigate } from "react-router-dom";
import React from "react";

import "../css/main.css";
import "../css/footer.css";

const Footer = () => {
  let navigate = useNavigate();
  const useAuth = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  let user = useAuth();

  const roleStaff = () => {
    if (user) {
      const items = JSON.parse(localStorage.getItem("user") || "[]");
      if (items.role === "STAFF") {
        return true;
      } else {
        return false;
      }
    }
  };
  const isStaff = roleStaff();
  const roleAdmin = () => {
    if (user) {
      const items = JSON.parse(localStorage.getItem("user") || "[]");
      if (items.role === "ADMIN") {
        return true;
      } else {
        return false;
      }
    }
  };
  const isAdmin = roleAdmin();
  const getUserId = () => {
    if (isStaff) {
      const items = JSON.parse(localStorage.getItem("user") || "[]");
      if (items) {
        return items.id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const userId = parseInt(getUserId());
  const logout = () => {
    localStorage.clear();
    user = false;
    navigate("/");
  };
  return (
    <footer>
      {!!isAdmin ? (
        <div className="footer-container">
          <div className="footer-item">
            <div className="footer-left-part">
              <div className="footer-list">
                <Link to="/" className="footer-link link-item">
                  <i className="bi bi-house-door-fill nav-icon">Home </i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to="/departments" className="footer-link link-item">
                  <i className="bi bi-list-ol"> Departments</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to="/addDepartment" className="footer-link link-item">
                  <i className="bi bi-file-earmark-plus">Add department</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to="/users" className="footer-link link-item">
                  <i className="bi bi-person-vcard-fill"> Users</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to="/addUser" className="footer-link link-item">
                  <i className="bi bi-person-plus-fill"> Add user</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to="/profiles" className="footer-link link-item">
                  <i className="bi bi-card-list"> Profiles</i>
                </Link>
              </div>
            </div>
            <div className="footer-right-part">
              <div className="footer-list">
                <button
                  className="footer-logout-btn footer-link link-item"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right" id="logoutIcon">
                    Logout
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !!isStaff ? (
        <div className="footer-container">
          <div className="footer-item">
            <div className="footer-left-part">
              <div className="footer-list">
                <Link to="/" className="footer-link link-item">
                  <i className="bi bi-house-door-fill nav-icon">Home </i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to={`profile/add`} className="footer-link link-item">
                  <i className="bi bi-people-fill">Add Profile</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to={`/editProfile/${userId}`} className="footer-link link-item">
                  <i className="bi bi-person-vcard-fill">Edit Profile</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to={`/portofolio/${userId}/add`} className="footer-link link-item">
                  <i className="bi bi-file-plus-fill">Add Portofolio</i>
                </Link>
              </div>
              <div className="footer-list">
                <Link to={`/staffPortofolios/${userId}`} className="footer-link link-item">
                  <i className="bi bi-images">Portofolios</i>
                </Link>
              </div>
            </div>
            <div className="footer-right-part">
              <button
                className="footer-logout-btn footer-link link-item"
                onClick={logout}
              >
                <i className="bi bi-box-arrow-right" id="logoutIcon">
                  Logout
                </i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="footer-container">
            <div className="footer-item">
            <div className="footer-left-part">
            <div className="footer-list">
                <Link to="/" className="footer-link link-item">
                  <i className="bi bi-house-door-fill nav-icon">Home </i>
                </Link>
              </div>
            </div>
            </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;
