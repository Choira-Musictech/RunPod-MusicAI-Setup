import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth";
import messageReducer from "./message";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;