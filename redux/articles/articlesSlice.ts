import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doc } from "../../types";
import type { RootState } from "../store";

interface UserState {
  doc?: Doc;
  docs?: Doc[];
}

// Define the initial state using that type
const initialState: UserState = {
  doc: undefined,
  docs: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    cacheDocs: (state, action: PayloadAction<UserState>) => {
      state.doc = action.payload.doc;
      state.docs = action.payload.docs;
    },
  },
});

export const { cacheDocs } = articlesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDoc = (state: RootState) => state.artciles.doc;
export const selectDocs = (state: RootState) => state.artciles.docs;

export default articlesSlice.reducer;
