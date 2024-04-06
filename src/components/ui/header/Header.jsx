import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, selectAuth } from "../../../store/authSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token  } = useSelector(selectAuth);

  return (
    <>
      <main className={styles.header}>
        <div className={styles.headerItems}>
          <Link to="/">
            <div> Haulmatics Assesment</div>
          </Link>
          {!isLoggedIn && (
            <section className={styles.headerAuth}>
              <Link to="/login">
                <button className={styles.headerAuthBtn}>Login</button>
              </Link>
              <Link to="/signup">
                <button
                  className={`${styles.signupBtn} ${styles.headerAuthBtn}`}
                >
                  Signup
                </button>
              </Link>
            </section>
          )}

          {isLoggedIn && (
            <section className={styles.headerAuth}>
              <button
                className={`${styles.headerAuthBtn}`}
                onClick={() => dispatch(logout())}
                >
                Logout
              </button>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Header;
