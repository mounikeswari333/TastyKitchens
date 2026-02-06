import React from "react";
import "./BentoGrid.css";

const bentoItems = [
  {
    id: 1,
    state: "Telangana",
    food: "Hyderabadi Biryani",
    image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972",
  },
  {
    id: 2,
    state: "Punjab",
    food: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
  },
  {
    id: 3,
    state: "Tamil Nadu",
    food: "Dosa",
    image: "https://www.shutterstock.com/image-photo/side-view-isometric-angle-crispy-600nw-2600398075.jpg",
  },
  {
    id: 4,
    state: "Gujarat",
    food: "Dhokla",
    image: "https://cdn.dotpe.in/longtail/store-items/5661665/OgMzsNjM.jpeg",
  },
  {
    id: 5,
    state: "West Bengal",
    food: "Mishti Doi",
    image: "https://bakewithshivesh.com/wp-content/uploads/2023/04/mishti-doi-scaled.jpg",
  },
  {
    id: 6,
    state: "Rajasthan",
    food: "Dal Baati",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1_xKAn2MftH01vVKdKuZnQmF_otEdofRsQ&s",
  },
];

const BentoGrid = () => {
  return (
    <section className="bento-section" aria-label="Regional food highlights">
      <div className="bento-header">
        <h2>Regional Food Highlights</h2>
        <p>Explore popular dishes from different Indian states.</p>
      </div>
      <div className="bento-grid">
        {bentoItems.map((item, index) => (
          <div
            key={item.id}
            className={`bento-card bento-card--${index + 1}`}
            style={{ "--card-image": `url(${item.image})` }}
            role="img"
            aria-label={`${item.state} - ${item.food}`}
            tabIndex={0}
          >
            <div className="bento-overlay">
              <span className="bento-state">{item.state}</span>
              <h3 className="bento-food">{item.food}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
