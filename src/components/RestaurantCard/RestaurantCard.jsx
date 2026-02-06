import React, { useContext } from "react";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./RestaurantCard.css";
import { FavoritesContext } from "../../context/FavoritesContext";

const RestaurantCard = ({ restaurant, onClick }) => {
  const { name, cuisine, image_url, user_rating } = restaurant;
  const { toggleRestaurantFavorite, isRestaurantFavorite } =
    useContext(FavoritesContext);
  const favorite = isRestaurantFavorite(restaurant.id);

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    toggleRestaurantFavorite(restaurant);
  };

  return (
    <div testid="restaurant-item" className="restaurant-card" onClick={onClick}>
      <img src={image_url} alt="restaurant" className="restaurant-image" />
      <button
        type="button"
        className={`favorite-button ${favorite ? "active" : ""}`}
        onClick={handleToggleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={favorite}
      >
        {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-cuisine">{cuisine}</p>
        <div className="restaurant-rating">
          <AiFillStar className="star-icon" />
          <span className="rating-text">{user_rating.rating}</span>
          <span className="rating-count">
            ({user_rating.total_reviews} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
