import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../signup/Signup.module.css";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { selectAuth, updateToken } from "../../store/authSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";


function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    newPassword: "",
    currentPassword: "",
  });

  const [axiosErr, setAxiosErr] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          "http://localhost:5001/auth/get-me"
        );
        const { firstName, lastName, username, email, role } = response.data;
        setFormData({ firstName, lastName, username, email, role });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

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

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.patch(
          "http://localhost:5001/auth/update-me",
          formData
        );
        console.log("Update successful:", response.data);
        toast.success("Update successful!");
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating user:", error);
        setAxiosErr(error.message);
        toast.error("Error updating user");
        setIsLoading(false);
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    let isValid = true;

    if (!passwordFormData.currentPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        currentPassword: "Please enter your current password.",
      }));
      isValid = false;
    }

    if (
      !passwordFormData.newPassword ||
      passwordFormData.newPassword.length < 8
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    }

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post(
          "/auth/change-password",
          passwordFormData
        );
        console.log("Password change successful:", response.data);
        toast.success("Password changed successfully!");
        dispatch(updateToken(response.data.accessToken));
        setIsLoading(false);
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
        });
      } catch (error) {
        console.error("Error changing password:", error);
        setAxiosErr(error.message);
        toast.error("Error changing password");
        setIsLoading(false);
      }
    }
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
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loading && (
        <div
          className={styles["signup-container"]}
          style={{
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              marginBottom: "20px",
            }}
          >
            {formData.role == "admin" && (
              <Link to="/admin">
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Admin Dashboard
                </button>
              </Link>
            )}
            <h2>View or Edit Profile</h2>
          </div>
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

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading && "Loading..."}
              {!loading && "Update"}
            </button>
          </form>

          <form onSubmit={handlePasswordSubmit}>
            <div className={styles["form-group"]} style={{ marginTop: "25px" }}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordInputChange}
              />
              {errors.currentPassword && (
                <div className={styles["error-message"]}>
                  {errors.currentPassword}
                </div>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordFormData.newPassword}
                onChange={handlePasswordInputChange}
              />
              {errors.newPassword && (
                <div className={styles["error-message"]}>
                  {errors.newPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              onClick={handlePasswordInputChange}
              className={styles.submitBtn}
              style={{ marginTop: "15px" }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <button
              type="submit"
              className={styles.submitBtn}
              style={{ marginTop: "15px", backgroundColor: "red" }}
              disabled={loading}
              onClick={async () => {
                try {
                  setDeleting(true);
                  await axiosInstance.delete(
                    "/auth/delete-account"
                  );
                  toast.success("Account Deleted Successfully!");
                  setDeleting(false);
                  navigate("/signup");
                } catch (error) {
                  setDeleting(true);
                  setAxiosErr(error.message);
                  toast.error("Error changing password");
                  setDeleting(false);
                }
              }}
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
       
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
