import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { FavoritesContext } from "../../context/FavoritesContext";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, toggleFoodFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="favorites-container">
      <Navbar />
      <div className="favorites-content">
        <div className="favorites-header">
          <h1 className="favorites-heading">Favorites</h1>
          <p className="favorites-subtitle">
            Your saved restaurants, all in one place.
          </p>
        </div>

        {favorites.restaurants.length === 0 &&
        favorites.foodItems.length === 0 ? (
          <div className="favorites-empty">
            <h2 className="favorites-empty-heading">No favorites yet</h2>
            <p className="favorites-empty-text">
              Tap the heart on a restaurant card to save it here.
            </p>
            <button
              type="button"
              className="favorites-empty-button"
              onClick={() => navigate("/")}
            >
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div className="favorites-sections">
            {favorites.restaurants.length > 0 && (
              <div className="favorites-section">
                <h2 className="favorites-section-heading">
                  Favorite Restaurants
                </h2>
                <div className="favorites-grid">
                  {favorites.restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleRestaurantClick(restaurant)}
                    />
                  ))}
                </div>
              </div>
            )}

            {favorites.foodItems.length > 0 && (
              <div className="favorites-section">
                <h2 className="favorites-section-heading">Favorite Items</h2>
                <div className="favorite-food-grid">
                  {favorites.foodItems.map((item) => (
                    <div key={item.id} className="favorite-food-card">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="favorite-food-image"
                      />
                      <div className="favorite-food-info">
                        <h3 className="favorite-food-name">{item.name}</h3>
                        <p className="favorite-food-price">₹ {item.cost}</p>
                        {item.rating && (
                          <p className="favorite-food-rating">
                            ⭐ {item.rating}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="favorite-food-remove"
                        onClick={() => toggleFoodFavorite(item)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
