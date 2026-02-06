import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      try {
        setCartData(JSON.parse(storedCartData));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (item) => {
    const itemQuantity = item.quantity ?? 1;
    const existingItem = cartData.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
            : cartItem,
        ),
      );
    } else {
      setCartData([...cartData, { ...item, quantity: itemQuantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCartData(cartData.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id) => {
    setCartData(
      cartData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = (id) => {
    const item = cartData.find((item) => item.id === id);
    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      setCartData(
        cartData.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCartData([]);
  };

  const getCartTotal = () => {
    return cartData.reduce(
      (total, item) => total + item.cost * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
