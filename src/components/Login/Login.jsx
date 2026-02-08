// import React, { useState, useEffect } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const jwtToken = Cookies.get("jwt_token");
//     if (jwtToken) {
//       navigate("/", { replace: true });
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMsg("");

//     const userDetails = { username, password };
//     const options = {
//       method: "POST",
//       body: JSON.stringify(userDetails),
//     };

//     try {
//       const response = await fetch("https://apis.ccbp.in/login", options);
//       const data = await response.json();

//       if (response.ok) {
//         Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
//         navigate("/", { replace: true });
//       } else {
//         setErrorMsg(data.error_msg || "Invalid credentials");
//       }
//     } catch (error) {
//       setErrorMsg("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-content">
//         {/* <div className="login-image-container">
//           <img
//             src="https://res.cloudinary.com/dppqkypts/image/upload/v1642046474/cooking_1_1x_tzbirv.png"
//             alt="website login"
//             className="login-image"
//           />
//         </div> */}
//         <div className="login-form-container">
//           <form className="login-form" onSubmit={handleSubmit}>
//             <div >
//               <img
//                 src="https://res.cloudinary.com/dttsqdjta/image/upload/v1770376319/Group_7420_og7n5a.png"
//                 alt="website logo"
//                 className="login-logo"
//               />
//               <vedio className="logo-container"
//                 src="https://res.cloudinary.com/dttsqdjta/video/upload/v1770439696/854345-hd_1280_720_30fps_de0t1b.mp4"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               />
//               <h1 className="logo-heading">Tasty Kitchens</h1>
//             </div>
//             <h2 className="login-heading">Login</h2>
//             <div className="input-container">
//               <label htmlFor="username" className="input-label">
//                 USERNAME
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="input-field"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder=""
//                 required
//               />
//             </div>
//             <div className="input-container">
//               <label htmlFor="password" className="input-label">
//                 PASSWORD
//               </label>
//               <div className="password-field">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   className="input-field"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder=""
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   aria-pressed={showPassword}
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </button>
//               </div>
//             </div>
//             {errorMsg && <p className="error-message">{errorMsg}</p>}
//             <button type="submit" className="login-button" disabled={isLoading}>
//               {isLoading ? "Loading..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    try {
      const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
        navigate("/", { replace: true });
      } else {
        setErrorMsg(data.error_msg || "Invalid credentials");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Video */}
      <video
        className="login-video"
        src="https://res.cloudinary.com/dttsqdjta/video/upload/v1770439696/854345-hd_1280_720_30fps_de0t1b.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="video-overlay"></div>

      {/* Login Card */}
      <div className="login-content">
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
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
