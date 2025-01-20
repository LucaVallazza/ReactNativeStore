import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/inventorySlices";


export const store = configureStore({
  reducer : {
    inventory : reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch