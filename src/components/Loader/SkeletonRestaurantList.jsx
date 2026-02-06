import React from "react";
import "./Loader.css";

const SkeletonRestaurantList = ({ testid }) => {
  return (
    <div className="skeleton-list" testid={testid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="skeleton-card">
          <div className="skeleton-block skeleton-image"></div>
          <div className="skeleton-body">
            <div className="skeleton-block skeleton-line"></div>
            <div className="skeleton-block skeleton-line short"></div>
            <div className="skeleton-block skeleton-line tiny"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonRestaurantList;
