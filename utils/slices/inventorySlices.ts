import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShopItem } from "../../data/shopItems";
import { storageInventoryGet, storageInventorySave } from "../inventoryHandling";

export interface InventoryItem {
  item: ShopItem;
  amount: number;
}

export interface InventoryState {
  inventory: InventoryItem[],
  isLoading: boolean
}

const initialState : InventoryState = {
  inventory : [],
  isLoading: false
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers : {
    setInventory : (state, action) =>{
      state.inventory = action.payload
    }
  },
  extraReducers : builder => {
    builder.addCase(asyncSetInventory.pending , (state) => {
      state. isLoading = true;
    })
    .addCase(asyncSetInventory.fulfilled , (state, action) => {
      console.log(`asyncSetInventory fullfilled. Payload count : ${action.payload.length}`)
      state.inventory = action.payload;
      state. isLoading = false;
    })
    .addCase(asyncInitInventory.pending , (state ) =>{
      state.isLoading = true
    })
    .addCase(asyncInitInventory.fulfilled , (state, action) =>{
      console.log(`asyncInitInventory fullfilled. Payload count : ${action.payload.length}`)
      state.inventory = action.payload
      state.isLoading = false
    })
  }
})

export const asyncSetInventory = createAsyncThunk(
  'inventory/asyncSetInventory',
  async (newInventory : InventoryItem[]) =>{
    try{
      await storageInventorySave(newInventory)
      return newInventory

    }catch{
      console.error('Error setting inventory')
      return []
    }
  }
)

export const asyncInitInventory = createAsyncThunk(
  'inventory/asyncInitInventory',
  async () =>{
    try{
      return await storageInventoryGet()
    }catch(e){
      console.error('Error initing inventory')
      return []
    }
  }
)

export const {setInventory} = inventorySlice.actions

export const inventoryReducer = inventorySlice.reducer