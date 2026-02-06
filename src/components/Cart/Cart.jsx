import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Cart.css";

const Cart = () => {
  const {
    cartData,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
    clearCart,
  } = useContext(CartContext);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setShowPaymentSuccess(true);
  };

  const handleGoToHomePage = () => {
    clearCart();
    setShowPaymentSuccess(false);
    navigate("/");
  };

  if (showPaymentSuccess) {
    return (
      <div className="cart-container">
        <Navbar />
        <div className="payment-success-container">
          <div className="success-checkmark">✓</div>
          <h2 className="success-heading">Payment Successful</h2>
          <p className="success-message">
            Thank you for ordering
            <br />
            Your payment is successfully completed!
          </p>
          <button className="go-home-button" onClick={handleGoToHomePage}>
            Go To Home Page
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-content">
        {cartData.length === 0 ? (
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/dppqkypts/image/upload/v1642058395/EmptyCart_gziiaa.png"
              alt="empty cart"
              className="empty-cart-image"
            />
            <h2 className="empty-cart-heading">No Orders Yet!</h2>
            <p className="empty-cart-message">
              Your cart is empty. Add something from the menu.
            </p>
            <button className="order-now-button" onClick={() => navigate("/")}>
              Order Now
            </button>
          </div>
        ) : (
          <div className="cart-items-container">
            <h1 className="cart-heading">Cart</h1>
            <div className="cart-items-list">
              {cartData.map((item) => (
                <div key={item.id} testid="cartItem" className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-quantity-controller">
                      <button
                        testid="decrement-quantity"
                        className="cart-quantity-button"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span
                        testid="item-quantity"
                        className="cart-quantity-value"
                      >
                        {item.quantity}
                      </span>
                      <button
                        testid="increment-quantity"
                        className="cart-quantity-button"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-price">
                      ₹ {item.cost * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className="order-total-label">Order Total:</h2>
              <p testid="total-price" className="order-total-price">
                ₹ {getCartTotal().toFixed(2)}
              </p>
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
