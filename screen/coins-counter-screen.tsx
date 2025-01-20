import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Button,
  Dimensions,
  InputAccessoryView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { contadorStyles, styles } from "../style/globalStyling";
import { CircleDollarSign } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { storageMonedasSave } from "../utils/moneyHandling";

const CoinsCounterScreen = () => {
  // AppState.addEventListener(
  //   'change', appstate =>{ToastAndroid.show(appstate , ToastAndroid.SHORT)}
  // )

  const [monedas, setMonedas] = useState<number>(0);
  const [monto, setMonto] = useState<number>(0);

  useEffect(() => {

    const setMonedasFromStorage = async () =>{
      return AsyncStorage.getItem(constants.dataItemNames.money)
      .then((moneyDataString) => {
        if (moneyDataString !== null) {
          const moneyData = JSON.parse(moneyDataString);
          if (moneyData.balance)
            setMonedas(moneyData.balance)
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error("Error retrieving balance", error);
      });
    }
    
    setMonedasFromStorage()

  }, []);




  const onButtonPress = () => {
    if (Number(monto)) {   
      storageMonedasSave(monedas + Number(monto))
      setMonedas(monedas + Number(monto));
      ToastAndroid.show(
        `Se han agregado ${monto} monedas!`,
        ToastAndroid.SHORT
      );
      return;
    }
    ToastAndroid.show("Debes ingresar un valor", ToastAndroid.SHORT);
  };

  const onMontoChange = (_monto: any) => {
    setMonto(_monto);
  };

  return (
    <View style = {styles.container}>
      <StatusBar style="auto" />
      <View style={{ ...contadorStyles.saldoContainer }}>
        <Text
          style={{
            borderRadius: 50,
            height: 20,
            width: 20,
            textAlign: "center",
            alignContent: "center",
            backgroundColor: "yellow",
            color: "black",
          }}
        >
          $
        </Text>
        <Text style={{ color: "white" }}> {monedas} </Text>
      </View>
      <View style={styles.forminput}>
        <Text>Add amount</Text>
        <TextInput
          onChangeText={onMontoChange}
          keyboardType="number-pad"
          placeholder="500"
          style={styles.textinput}
        ></TextInput>
      </View>
      <View style={[styles.containerVertical]}>
        <Button title="Add" onPress={onButtonPress} />
        <Button
          title="Clear"
          onPress={() => {
            setMonedas(0);
            storageMonedasSave(0);
          }}
        />
        
      </View>

    </View>
  );
};

export default CoinsCounterScreen;
