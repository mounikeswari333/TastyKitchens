# TasteTown - Food Delivery Application

A modern food delivery application built with React, featuring user authentication, restaurant browsing, cart management, and responsive design.

## Features

### 🔐 Authentication

- Login functionality with JWT token authentication
- Protected routes for authenticated users
- Persistent session using cookies

### 🏠 Home Page

- Beautiful carousel displaying restaurant offers
- Browse popular restaurants
- Sort restaurants by rating (Highest/Lowest)
- Pagination support for restaurant listings
- Responsive design for mobile and desktop

### 🍔 Restaurant Details

- View detailed information about each restaurant
- Browse food items with images and prices
- Add items to cart with quantity selection
- Restaurant ratings and reviews

### 🛒 Shopping Cart

- Add/remove items from cart
- Adjust item quantities
- Persistent cart using Local Storage
- Real-time total calculation
- Place order functionality
- Payment success confirmation

### 📱 Additional Features

- Fully responsive design (mobile & desktop)
- Loading states for better UX
- 404 Page Not Found route
- Social media links in footer
- Smooth navigation with React Router

## Technologies Used

- **React** - UI library
- **React Router DOM** - Routing
- **React Slick** - Carousel component
- **React Icons** - Icon library
- **js-cookie** - Cookie management
- **Context API** - State management
- **CSS** - Styling (No Tailwind)

## Installation

1. Navigate to the project directory:

```bash
cd TasteTown
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Valid Login Credentials

You can use any of the following credentials to login:

- Username: `rahul`, Password: `rahul@2021`
- Username: `aakash`, Password: `sky@007`
- Username: `agastya`, Password: `myth#789`
- Username: `advika`, Password: `world@5`
- Username: `binita`, Password: `modest*6`

## API Endpoints

- **Login**: `https://apis.ccbp.in/login`
- **Offers**: `https://apis.ccbp.in/restaurants-list/offers`
- **Restaurants List**: `https://apis.ccbp.in/restaurants-list?offset={offset}&limit={limit}&sort_by_rating={sortBy}`
- **Restaurant Details**: `https://apis.ccbp.in/restaurants-list/{id}`

## Routes

- `/login` - Login page
- `/` - Home page (Protected)
- `/restaurant/:id` - Restaurant details page (Protected)
- `/cart` - Shopping cart page (Protected)
- `*` - 404 Page Not Found

## Project Structure

```
TasteTown/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── Cart.jsx
│   │   │   └── Cart.css
│   │   ├── FoodItem/
│   │   │   ├── FoodItem.jsx
│   │   │   └── FoodItem.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Loader/
│   │   │   ├── Loader.jsx
│   │   │   └── Loader.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── PageNotFound/
│   │   │   ├── PageNotFound.jsx
│   │   │   └── PageNotFound.css
│   │   ├── ProtectedRoute/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── RestaurantCard/
│   │   │   ├── RestaurantCard.jsx
│   │   │   └── RestaurantCard.css
│   │   └── RestaurantDetails/
│   │       ├── RestaurantDetails.jsx
│   │       └── RestaurantDetails.css
│   ├── context/
│   │   └── CartContext.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── package.json
└── README.md
```

## Features Implementation

### Context API for Cart Management

The application uses React Context API to manage cart state globally, ensuring cart data persists across components and page refreshes using Local Storage.

### Protected Routes

Authentication is handled using JWT tokens stored in cookies. Protected routes redirect unauthenticated users to the login page.

### Responsive Design

All components are fully responsive with mobile-first CSS design, ensuring a great experience on all device sizes.

### Pagination

Restaurants list includes pagination with previous/next buttons and page indicators.

### Sort Functionality

Users can sort restaurants by rating (Highest or Lowest) with real-time updates.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

---

Made with ❤️ using React
