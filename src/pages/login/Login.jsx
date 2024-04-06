import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch,useSelector  } from "react-redux";
import { loginUser, selectAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); 
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setErrors({});

    let isValid = true;
    if (!formData.username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter your username.",
      }));
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    }

    if (isValid) {
      dispatch(loginUser(formData));
    }

    setFormData({
      ...formData,
      password: "",
    });
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && (
            <div className={styles["error-message"]}>{errors.username}</div>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className={styles["error-message"]}>{errors.password}</div>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Log In
        </button>
      </form>
      <p className={styles["signup-link"]}>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default Login;
