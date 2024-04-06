import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
 
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const { auth } = store.getState();
  localStorage.setItem('isLoggedIn', auth.isLoggedIn);
  localStorage.setItem('token', auth.token);
});

export default store;
