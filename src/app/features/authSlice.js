import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../firebase";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const { user } = await auth.signInWithEmailAndPassword(email, password);
//     dispatch(setUser(user));
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setError(error.message));
//     dispatch(setLoading(false));
//   }
// };

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     await auth.signOut();
//     dispatch(setUser(null));
//     dispatch(setLoading(false));
//   } catch (error) {
//     dispatch(setError(error.message));
//     dispatch(setLoading(false));
//   }
// };

export default authSlice.reducer;
