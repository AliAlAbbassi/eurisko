import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  access_token: string;
  isAuth: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  access_token: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload;
    },
    authenticate: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAccessToken, authenticate } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccessToken = (state: RootState) => state.user.access_token;
export const selectisAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
