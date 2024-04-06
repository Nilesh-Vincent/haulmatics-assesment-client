import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { selectAuth } from "../../store/authSlice";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [axiosErr, setAxiosErr] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(selectAuth);

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

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrors({});

    let isValid = true;

    if (!formData.firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Please enter your first name.",
      }));
      isValid = false;
    }

    if (!formData.lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Please enter your last name.",
      }));
      isValid = false;
    }
    if (!formData.username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter your name.",
      }));
      isValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
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

    if (formData.password !== formData.passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: "Passwords do not match.",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log(formData);
      try {
        setIsLoading(false);
        const response = await axios.post(
          "http://localhost:5001/auth/signup",
          formData
        );
        console.log("Signup successful:", response.data);
        toast.success("SignUp successful!");
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        setIsLoading(true);
        setAxiosErr(error.message);
        console.log(error);
        setIsLoading(false);
      }
    }

    setFormData({
      ...formData,
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <ClipLoader
            color="black"
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loading && (
        <div className={styles["signup-container"]}>
          <h2>Sign Up</h2>
          {axiosErr && (
            <div className={styles["error-message-backend"]}>{axiosErr}</div>
          )}
          <form onSubmit={handleSignup}>
            <div className={styles["form-group"]}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <div className={styles["error-message"]}>
                  {errors.firstName}
                </div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <div className={styles["error-message"]}>{errors.lastName}</div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="username">User Name</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className={styles["error-message"]}>{errors.email}</div>
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
            <div className={styles["form-group"]}>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
              />
              {errors.passwordConfirm && (
                <div className={styles["error-message"]}>
                  {errors.passwordConfirm}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading && "Loading..."}
              {!loading && "SignUp"}
            </button>
          </form>
          <p className={styles["login-link"]}>
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      )}
    </>
  );
}

export default Signup;
