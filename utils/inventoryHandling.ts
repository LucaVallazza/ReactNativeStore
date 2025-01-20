import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { Alert } from "react-native";
import { ShopItem } from "../data/shopItems";

export interface InventoryItem {
  item: ShopItem;
  amount: number;
}

export const storageInventorySave = async (inventory: InventoryItem[]) => {
  console.log("storageinventorySave");
  try {
    return AsyncStorage.setItem(
      constants.dataItemNames.inventory,
      JSON.stringify(inventory)
    );
  } catch {
    Alert.prompt("Error handling items");
  }
};

export const storageInventoryGet = async () => {
  return AsyncStorage.getItem(constants.dataItemNames.inventory)
    .then((inv) => {
      if (inv !== null) {
        const invData = JSON.parse(inv);
        if (invData)
            console.log('HAY INV: ')
            console.log(invData)
            return invData;
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving balance", error);
    });

  return [];
};
