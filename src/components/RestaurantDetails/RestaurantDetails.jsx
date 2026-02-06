import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SkeletonRestaurantDetails from "../Loader/SkeletonRestaurantDetails";
import FoodItem from "../FoodItem/FoodItem";
import { CartContext } from "../../context/CartContext";
import BentoGrid from "../BentoGrid/BentoGrid";
import "./RestaurantDetails.css";

const sortByOptions = [
  { id: 0, displayText: "A-Z", value: "A-Z" },
  { id: 1, displayText: "Z-A", value: "Z-A" },
  { id: 2, displayText: "Price: Low to High", value: "LOW_TO_HIGH" },
  { id: 3, displayText: "Price: High to Low", value: "HIGH_TO_LOW" },
];

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("A-Z");
  const [sortedFoodItems, setSortedFoodItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchRestaurantDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRestaurantDetails = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
        setSortedFoodItems(data.food_items);
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (restaurant && restaurant.food_items) {
      let sorted = [...restaurant.food_items];

      switch (sortBy) {
        case "A-Z":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "LOW_TO_HIGH":
          sorted.sort((a, b) => a.cost - b.cost);
          break;
        case "HIGH_TO_LOW":
          sorted.sort((a, b) => b.cost - a.cost);
          break;
        default:
          break;
      }

      setSortedFoodItems(sorted);
    }
  }, [sortBy, restaurant]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="restaurant-details-container">
        <Navbar />
        <SkeletonRestaurantDetails testid="restaurant-details-loader" />
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-details-container">
        <Navbar />
        <div className="error-message">Restaurant not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="restaurant-details-container">
      <Navbar />
      <div className="restaurant-details-content">
        {/* Restaurant Header */}
        <div className="restaurant-header">
          <img
            src={restaurant.image_url}
            alt="restaurant"
            className="restaurant-header-image"
          />
          <div className="restaurant-header-info">
            <h1 className="restaurant-header-name">{restaurant.name}</h1>
            <p className="restaurant-header-cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-header-location">{restaurant.location}</p>
            <div className="restaurant-header-stats">
              <div className="stat-item">
                <AiFillStar className="star-icon" />
                <span className="stat-value">{restaurant.rating}</span>
                <span className="stat-label">
                  {restaurant.reviews_count}+ Ratings
                </span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">₹{restaurant.cost_for_two}</span>
                <span className="stat-label">Cost for two</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Items */}
        <div className="food-items-section">
          <div className="sort-header">
            <h2 className="food-items-heading">Food Items</h2>
            <div className="sort-container">
              <label className="sort-label">Sort by:</label>
              <select
                className="sort-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                {sortByOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="food-items-grid">
            {sortedFoodItems.map((foodItem) => (
              <FoodItem
                key={foodItem.id}
                foodItem={foodItem}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
        <BentoGrid />
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantDetails;
