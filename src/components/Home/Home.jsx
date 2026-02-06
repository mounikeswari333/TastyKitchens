import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import SkeletonRestaurantList from "../Loader/SkeletonRestaurantList";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { sortByOptions } from "../../App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const LIMIT = 9;
const COST_RANGES = {
  LOW: { label: "Budget", min: 0, max: 300 },
  MEDIUM: { label: "Mid", min: 301, max: 600 },
  HIGH: { label: "Premium", min: 601, max: Number.POSITIVE_INFINITY },
};

const testimonials = [
  {
    id: 1,
    name: "Ananya",
    location: "Hyderabad",
    rating: 4.8,
    feedback:
      "Fast delivery and the biryani was hot and flavorful. Loved the packaging!",
  },
  {
    id: 2,
    name: "Rohit",
    location: "Chennai",
    rating: 4.6,
    feedback:
      "Great variety of South Indian meals. Filters make it easy to find veg options.",
  },
  {
    id: 3,
    name: "Meera",
    location: "Pune",
    rating: 4.7,
    feedback:
      "Consistent taste every time. The app is clean and the cart updates are instant.",
  },
  {
    id: 4,
    name: "Karan",
    location: "Delhi",
    rating: 4.5,
    feedback:
      "Loved the variety of biryani options. Delivery was quicker than expected.",
  },
  {
    id: 5,
    name: "Sneha",
    location: "Mumbai",
    rating: 4.9,
    feedback:
      "Smooth ordering and the food arrived fresh. Pizza crust was perfectly crisp.",
  },
  {
    id: 6,
    name: "Arjun",
    location: "Bengaluru",
    rating: 4.6,
    feedback:
      "Great breakfast choices and the filters make it easy to pick healthy meals.",
  },
];

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isOffersLoading, setIsOffersLoading] = useState(true);
  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[1].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    rating4: false,
    cost: "",
    openNow: false,
    onlineDelivery: false,
  });
  const [recentRestaurants, setRecentRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedRecents = localStorage.getItem("recentRestaurants");
    if (storedRecents) {
      try {
        const parsed = JSON.parse(storedRecents);
        if (Array.isArray(parsed)) {
          setRecentRestaurants(parsed);
        }
      } catch (error) {
        console.error("Error parsing recent restaurants:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, selectedSortBy]);

  const fetchOffers = async () => {
    setIsOffersLoading(true);
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await fetch(
        "https://apis.ccbp.in/restaurants-list/offers",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsOffersLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    setIsRestaurantsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const offset = (activePage - 1) * LIMIT;

    try {
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setRestaurants(data.restaurants);
        setTotalPages(Math.ceil(data.total / LIMIT));
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setIsRestaurantsLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSelectedSortBy(e.target.value);
    setActivePage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActivePage(1);
  };

  const handleFilterToggle = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    setActivePage(1);
  };

  const handleCostChange = (e) => {
    setFilters((prev) => ({ ...prev, cost: e.target.value }));
    setActivePage(1);
  };

  const handleRemoveChip = (chipKey) => {
    if (chipKey === "search") {
      setSearchQuery("");
      return;
    }

    if (chipKey === "cost") {
      setFilters((prev) => ({ ...prev, cost: "" }));
      return;
    }

    setFilters((prev) => ({ ...prev, [chipKey]: false }));
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setRecentRestaurants((prev) => {
      const filtered = prev.filter((item) => item.id !== restaurant.id);
      const updated = [restaurant, ...filtered].slice(0, 5);
      localStorage.setItem("recentRestaurants", JSON.stringify(updated));
      return updated;
    });
    navigate(`/restaurant/${restaurant.id}`);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonialSettings = {
    dots: false,
    infinite: true,
    speed: 12000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name || "";
    const cuisine = restaurant.cuisine || "";
    const rating = Number(restaurant.user_rating?.rating || 0);
    const costForTwo = Number(
      restaurant.cost_for_two ?? restaurant.costForTwo ?? 0,
    );
    const isOpen = restaurant.is_open ?? restaurant.isOpen ?? false;
    const hasOnlineDelivery =
      restaurant.has_online_delivery ?? restaurant.hasOnlineDelivery ?? false;

    const matchesSearch =
      !normalizedQuery ||
      name.toLowerCase().includes(normalizedQuery) ||
      cuisine.toLowerCase().includes(normalizedQuery);
    const matchesRating = !filters.rating4 || rating >= 4;
    const costRange = COST_RANGES[filters.cost];
    const matchesCost =
      !filters.cost ||
      (costForTwo >= costRange.min && costForTwo <= costRange.max);
    const matchesOpen = !filters.openNow || isOpen === true;
    const matchesOnline = !filters.onlineDelivery || hasOnlineDelivery === true;

    return (
      matchesSearch &&
      matchesRating &&
      matchesCost &&
      matchesOpen &&
      matchesOnline
    );
  });

  const appliedChips = [];
  if (searchQuery.trim()) {
    appliedChips.push({ key: "search", label: `Search: ${searchQuery}` });
  }
  if (filters.rating4) {
    appliedChips.push({ key: "rating4", label: "Rating 4+" });
  }
  if (filters.cost) {
    appliedChips.push({
      key: "cost",
      label: `Cost: ${COST_RANGES[filters.cost].label}`,
    });
  }
  if (filters.openNow) {
    appliedChips.push({ key: "openNow", label: "Open now" });
  }
  if (filters.onlineDelivery) {
    appliedChips.push({ key: "onlineDelivery", label: "Online delivery" });
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        {/* Carousel Section */}
        <div className="carousel-container">
          {isOffersLoading ? (
            <Loader testid="restaurants-offers-loader" />
          ) : (
            <Slider {...carouselSettings}>
              {offers.map((offer) => (
                <div key={offer.id} className="carousel-item">
                  <img
                    src={offer.image_url}
                    alt="offer"
                    className="carousel-image"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Restaurants Section */}
        <div className="restaurants-section">
          <div className="restaurants-header">
            <div>
              <h1 className="popular-restaurants-heading">
                Popular Restaurants
              </h1>
              <p className="restaurants-subtitle">
                Search and filter by cuisine, rating, and availability.
              </p>
              <div className="restaurants-search">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search by restaurant or cuisine"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="sort-container">
              <p className="sort-label">Sort by</p>
              <select
                className="sort-select"
                value={selectedSortBy}
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

          <div className="filters-panel">
            <div className="filters-row">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.rating4}
                  onChange={() => handleFilterToggle("rating4")}
                />
                Rating 4+
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={() => handleFilterToggle("openNow")}
                />
                Open now
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.onlineDelivery}
                  onChange={() => handleFilterToggle("onlineDelivery")}
                />
                Online delivery
              </label>
              <div className="filter-select-wrapper">
                <label className="filter-select-label" htmlFor="costFilter">
                  Cost for two
                </label>
                <select
                  id="costFilter"
                  className="filter-select"
                  value={filters.cost}
                  onChange={handleCostChange}
                >
                  <option value="">Any</option>
                  <option value="LOW">Budget (&lt;= 300)</option>
                  <option value="MEDIUM">Mid (301 - 600)</option>
                  <option value="HIGH">Premium (601+)</option>
                </select>
              </div>
            </div>
          </div>

          {appliedChips.length > 0 && (
            <div className="filter-chips">
              {appliedChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className="filter-chip"
                  onClick={() => handleRemoveChip(chip.key)}
                >
                  {chip.label}
                  <span className="chip-remove">×</span>
                </button>
              ))}
            </div>
          )}

          {isRestaurantsLoading ? (
            <SkeletonRestaurantList testid="restaurants-list-loader" />
          ) : (
            <>
              {recentRestaurants.length > 0 && !normalizedQuery && (
                <div className="recent-section">
                  <h2 className="recent-heading">Recently Viewed</h2>
                  <div className="restaurants-list">
                    {recentRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={() => handleRestaurantClick(restaurant)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredRestaurants.length === 0 ? (
                <div className="empty-results">
                  <h2 className="empty-results-heading">
                    No restaurants match your filters
                  </h2>
                  <p className="empty-results-text">
                    Try clearing filters or adjusting your search.
                  </p>
                </div>
              ) : (
                <div className="restaurants-list">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => handleRestaurantClick(restaurant)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="pagination-container">
                <button
                  testid="pagination-left-button"
                  className="pagination-button"
                  onClick={handlePrevPage}
                  disabled={activePage === 1}
                >
                  &lt;
                </button>
                <span className="pagination-info">
                  <span testid="active-page-number">{activePage}</span> of{" "}
                  {totalPages}
                </span>
                <button
                  testid="pagination-right-button"
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={activePage === totalPages}
                >
                  &gt;
                </button>
              </div>
              <div className="testimonials-section">
                <div className="testimonials-header">
                  <h2>Customer Feedback</h2>
                  <p>Ratings and comments from real food lovers.</p>
                </div>
                <div className="testimonials-slider">
                  <Slider {...testimonialSettings}>
                    {testimonials.map((item) => (
                      <div key={item.id} className="testimonial-slide">
                        <div className="testimonial-card">
                          <div className="testimonial-top">
                            <div>
                              <h3 className="testimonial-name">{item.name}</h3>
                              <span className="testimonial-location">
                                {item.location}
                              </span>
                            </div>
                            <div className="testimonial-rating">
                              {item.rating.toFixed(1)} / 5.0
                            </div>
                          </div>
                          <p className="testimonial-text">{item.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
