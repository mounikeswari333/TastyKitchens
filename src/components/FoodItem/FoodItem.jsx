import React, { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./FoodItem.css";
import { FavoritesContext } from "../../context/FavoritesContext";

const FoodItem = ({ foodItem, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const { id, name, cost, image_url, rating } = foodItem;
  const { toggleFoodFavorite, isFoodFavorite } = useContext(FavoritesContext);
  const favorite = isFoodFavorite(id);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({
        id,
        name,
        cost,
        imageUrl: image_url,
        quantity,
      });
      setQuantity(0);
    }
  };

  const handleToggleFavorite = () => {
    toggleFoodFavorite({
      id,
      name,
      cost,
      image_url,
      rating,
    });
  };

  return (
    <div testid="foodItem" className="food-item">
      <img src={image_url} alt={name} className="food-item-image" />
      <button
        type="button"
        className={`food-favorite-button ${favorite ? "active" : ""}`}
        onClick={handleToggleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={favorite}
      >
        {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <div className="food-item-details">
        <h3 className="food-item-name">{name}</h3>
        <p className="food-item-price">₹ {cost}</p>
        {rating && <p className="food-item-rating">⭐ {rating}</p>}
        <div className="food-item-actions">
          <div className="quantity-controller">
            <button
              testid="decrement-count"
              className="quantity-button"
              onClick={handleDecrement}
            >
              -
            </button>
            <span testid="active-count" className="quantity-value">
              {quantity}
            </span>
            <button
              testid="increment-count"
              className="quantity-button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          {quantity > 0 && (
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
