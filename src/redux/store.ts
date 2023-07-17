import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// export default the store
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
