import React from "react";
import "./Loader.css";

const Loader = ({ testid }) => {
  return (
    <div className="loader-container" testid={testid}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
