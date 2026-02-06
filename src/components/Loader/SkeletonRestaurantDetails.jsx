import React from "react";
import "./Loader.css";

const SkeletonRestaurantDetails = ({ testid }) => {
  return (
    <div className="skeleton-details" testid={testid}>
      <div className="skeleton-header">
        <div className="skeleton-block skeleton-header-image"></div>
        <div className="skeleton-header-info">
          <div className="skeleton-block skeleton-line"></div>
          <div className="skeleton-block skeleton-line short"></div>
          <div className="skeleton-block skeleton-line tiny"></div>
          <div className="skeleton-block skeleton-line short"></div>
        </div>
      </div>
      <div className="skeleton-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`detail-skeleton-${index}`} className="skeleton-card">
            <div className="skeleton-block skeleton-image"></div>
            <div className="skeleton-body">
              <div className="skeleton-block skeleton-line"></div>
              <div className="skeleton-block skeleton-line short"></div>
              <div className="skeleton-block skeleton-line tiny"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonRestaurantDetails;
