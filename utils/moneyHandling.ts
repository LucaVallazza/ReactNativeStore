import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { Alert } from "react-native";

export const storageMonedasSave = async (amount: any) => {
  const moneyData = {
    balance: amount,
  };
  try {
    await AsyncStorage.setItem(
      constants.dataItemNames.money,
      JSON.stringify(moneyData)
    );
  } catch {
    Alert.prompt("Error saving balance");
  }
};

export const storageMonedasBalanceGet = async () => {
  return AsyncStorage.getItem(constants.dataItemNames.money)
    .then((moneyDataString) => {
      if (moneyDataString !== null) {
        const moneyData = JSON.parse(moneyDataString);
        if (moneyData.balance) {
          console.log("HAY BALANCE: " + moneyData.balance);
          return moneyData.balance;
        }
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving balance", error);
    });

    
};
