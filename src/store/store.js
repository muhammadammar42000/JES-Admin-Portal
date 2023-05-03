import { configureStore } from "@reduxjs/toolkit";
import saveId from "../store/slice";

const store = configureStore({
  reducer: {
    saveAllId: saveId,
  },
});

export default store;
