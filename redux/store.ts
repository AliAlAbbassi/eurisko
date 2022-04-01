import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./articles/articlesSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    artciles: articlesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
