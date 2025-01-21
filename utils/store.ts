import { configureStore } from "@reduxjs/toolkit";
import { inventoryReducer } from "./slices/inventorySlices";
import { moneyReducer } from "./slices/moneySlice";


export const store = configureStore({
  reducer : {
    inventory : inventoryReducer,
    money: moneyReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch