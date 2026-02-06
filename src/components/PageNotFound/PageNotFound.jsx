import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found-container">
      <img
        src="https://res.cloudinary.com/dppqkypts/image/upload/v1642330084/Group_7504_zlsxtk.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-message">
        We are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage
      </p>
      <button className="home-page-button" onClick={() => navigate("/")}>
        Home Page
      </button>
    </div>
  );
};

export default PageNotFound;
