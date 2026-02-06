import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch("https://apis.ccbp.in/login", options);
      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
        navigate("/", { replace: true });
      } else {
        setErrorMsg(data.error_msg || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1642046474/cooking_1_1x_tzbirv.png"
            alt="website login"
            className="login-image"
          />
        </div> */}
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dttsqdjta/image/upload/v1770376319/Group_7420_og7n5a.png"
                alt="website logo"
                className="login-logo"
              />
              <h1 className="logo-heading">Tasty Kitchens</h1>
            </div>
            <h2 className="login-heading">Login</h2>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
              />
            </div>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
