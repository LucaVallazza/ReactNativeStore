import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { Alert } from "react-native";
import { MoneyState } from "./slices/moneySlice";

export const storageMonedasSave = async (amount: any) => {
  const moneyData : MoneyState = {
    balance: amount,
  };
  try {
    await AsyncStorage.setItem(
      constants.dataItemNames.money,
      JSON.stringify(moneyData)
    );
    console.log('guardado ' + moneyData.balance)
  } catch {
    Alert.prompt("Error saving balance");
  }
};

export const storageMonedasBalanceGet = async () => {
  return AsyncStorage.getItem(constants.dataItemNames.money)
    .then((moneyDataString) => {

      console.log('moneyDataString')
      console.log(moneyDataString)
      if (moneyDataString !== null) {
        const moneyData = JSON.parse(moneyDataString);
        if (moneyData.balance) {
          console.log("HAY BALANCE: " + moneyData.balance);
          return moneyData.balance;
        }
        return 0
      } else {
        console.log("No balance found");
        return 0
      }
    })
    .catch((error) => {
      console.error("Error retrieving balance", error);
      return 0
    });
    return 0;

    
};
