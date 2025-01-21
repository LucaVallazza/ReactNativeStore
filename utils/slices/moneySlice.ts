import { storageMonedasBalanceGet, storageMonedasSave } from "../moneyHandling";
import { store } from "../store";
import { buildPollingHandler } from "./../../node_modules/@reduxjs/toolkit/src/query/core/buildMiddleware/polling";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MoneyState {
  balance: number;
}

const initialState: MoneyState = { balance: 0 };

const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(asyncMoneyGet.fulfilled, (state, action) =>{
      console.log(`asyncMoneyGet fullfiled with payload ${action.payload}`)
      state.balance = action.payload
    })
    .addCase(asyncMoneySet.fulfilled, (state, action) =>{
      console.log(`asyncMoneyGet fullfiled with payload ${action.payload}`)
      state.balance = action.payload
    })
  },
});

export const asyncMoneyGet = createAsyncThunk(
  "money/asyncMoneyGet",
  async () => {
    try {
      return await storageMonedasBalanceGet();
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
);

export const asyncMoneySet = createAsyncThunk(
  "money/asyncMoneySet",
  async (amount : number) => {
    try {
      await storageMonedasSave(amount)
      return amount
      
    } catch (e) {
      console.error(e);
      return 0;
    }
    
  }
);

export const moneyReducer = moneySlice.reducer