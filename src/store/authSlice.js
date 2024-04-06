import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
    token: localStorage.getItem('token') || null,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.accessToken;
      state.error = null;
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem('isLoggedIn', 'true');
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, updateToken } = authSlice.actions;

export const loginUser = (formData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:5001/auth/signin', formData);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
