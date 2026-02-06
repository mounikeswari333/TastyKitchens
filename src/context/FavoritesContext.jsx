import React, { createContext, useEffect, useMemo, useState } from "react";

export const FavoritesContext = createContext();

const STORAGE_KEY = "favorites";
const LEGACY_KEY = "favoriteRestaurants";

const loadFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) {
      return { restaurants: [], foodItems: [] };
    }
    try {
      const parsedLegacy = JSON.parse(legacy);
      return Array.isArray(parsedLegacy)
        ? { restaurants: parsedLegacy, foodItems: [] }
        : { restaurants: [], foodItems: [] };
    } catch (error) {
      console.error("Error parsing legacy favorites:", error);
      return { restaurants: [], foodItems: [] };
    }
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return { restaurants: parsed, foodItems: [] };
    }
    return {
      restaurants: Array.isArray(parsed.restaurants) ? parsed.restaurants : [],
      foodItems: Array.isArray(parsed.foodItems) ? parsed.foodItems : [],
    };
  } catch (error) {
    console.error("Error parsing favorites:", error);
    return { restaurants: [], foodItems: [] };
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const restaurantIds = useMemo(
    () => new Set(favorites.restaurants.map((item) => item.id)),
    [favorites.restaurants],
  );
  const foodIds = useMemo(
    () => new Set(favorites.foodItems.map((item) => item.id)),
    [favorites.foodItems],
  );

  const isRestaurantFavorite = (id) => restaurantIds.has(id);
  const isFoodFavorite = (id) => foodIds.has(id);

  const toggleRestaurantFavorite = (restaurant) => {
    setFavorites((prev) => {
      const exists = prev.restaurants.find((item) => item.id === restaurant.id);
      return {
        ...prev,
        restaurants: exists
          ? prev.restaurants.filter((item) => item.id !== restaurant.id)
          : [restaurant, ...prev.restaurants],
      };
    });
  };

  const toggleFoodFavorite = (foodItem) => {
    setFavorites((prev) => {
      const exists = prev.foodItems.find((item) => item.id === foodItem.id);
      return {
        ...prev,
        foodItems: exists
          ? prev.foodItems.filter((item) => item.id !== foodItem.id)
          : [foodItem, ...prev.foodItems],
      };
    });
  };

  const removeRestaurantFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      restaurants: prev.restaurants.filter((item) => item.id !== id),
    }));
  };

  const removeFoodFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      foodItems: prev.foodItems.filter((item) => item.id !== id),
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleRestaurantFavorite,
        toggleFoodFavorite,
        removeRestaurantFavorite,
        removeFoodFavorite,
        isRestaurantFavorite,
        isFoodFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
