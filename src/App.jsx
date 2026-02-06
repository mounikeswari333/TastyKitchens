import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
import Cart from "./components/Cart/Cart";
import Favorites from "./components/Favorites/Favorites";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Chatbot from "./components/Chatbot/Chatbot";

export const sortByOptions = [
  { id: 0, displayText: "Highest", value: "Highest" },
  { id: 1, displayText: "Lowest", value: "Lowest" },
];

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant/:id"
              element={
                <ProtectedRoute>
                  <RestaurantDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Chatbot />
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
