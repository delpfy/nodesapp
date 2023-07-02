import { configureStore } from "@reduxjs/toolkit";
import nodeReduser from "./nodesSlice";


const store = configureStore({
  reducer: {
    node: nodeReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;