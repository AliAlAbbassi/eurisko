import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  access_token: string;
}

// Define the initial state using that type
const initialState: UserState = {
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
});

export const { setAccessToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccessToken = (state: RootState) => state.user.access_token;

export default userSlice.reducer;
