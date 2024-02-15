import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;

      console.log(`Action payload after updateSuccess: ${action.payload}`);
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      // state.currentUser = null;
      // state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateFailure,
  updateSuccess,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
