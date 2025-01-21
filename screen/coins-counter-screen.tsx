import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { contadorStyles, styles } from "../style/globalStyling";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { storageMonedasSave } from "../utils/moneyHandling";
import { asyncMoneyGet, asyncMoneySet } from "../utils/slices/moneySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";


const CoinsCounterScreen = () => {
  // AppState.addEventListener(
  //   'change', appstate =>{ToastAndroid.show(appstate , ToastAndroid.SHORT)}
  // )

  const dispatch = useDispatch<AppDispatch>()

  const monedas = useSelector((state : RootState) => state.money.balance)

  // const [monedas, setMonedas] = useState<number>(0);
  const [monto, setMonto] = useState<number>(0);

  useEffect(() => {
    dispatch(asyncMoneyGet())
  }, []);




  const onButtonPress = () => {
    if (Number(monto)) {   
      dispatch(asyncMoneySet(monedas + Number(monto)));
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
            dispatch(asyncMoneySet(0));
            storageMonedasSave(0);
          }}
        />
        
      </View>

    </View>
  );
};

export default CoinsCounterScreen;
