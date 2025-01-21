import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { contadorStyles, shopStyle, styles } from "../style/globalStyling";
import { useEffect, useState } from "react";
import { InventoryItem, storageInventoryGet } from "../utils/inventoryHandling";
import { storageMonedasBalanceGet } from "../utils/moneyHandling";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import {
  asyncInitInventory,
  asyncSetInventory,
} from "../utils/slices/inventorySlices";
import { asyncMoneyGet } from "../utils/slices/moneySlice";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const { inventory, isLoading } = useSelector(
    (state: RootState) => state.inventory
  );

  const { balance } = useSelector((state: RootState) => state.money);

  useEffect(() => {
    dispatch(asyncMoneyGet());
    dispatch(asyncInitInventory());
  }, []);

  return (
    <View style={styles.container}>
      <View>
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
          <Text style={{ color: "white" }}> {balance} </Text>
        </View>
      </View>
      <Text style={{ fontSize: 40 }}>
        My Items
        {inventory.length != 0 ? (
          <View>
            <Button
              title="Clear"
              onPress={() => dispatch(asyncSetInventory([]))}
            ></Button>
          </View>
        ) : (
          ""
        )}
      </Text>
      {inventory.length != 0 ? (
        <ScrollView
          style={shopStyle.itemsContainer}
          contentContainerStyle={{
            alignContent: "space-around",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {inventory.map((item) => (
            <View key={item.item.name} style={shopStyle.itemContainer}>
              <Image
                style={shopStyle.tinyLogo}
                source={{ uri: item.item.url }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {item.item.name} (x{item.amount}){" "}
              </Text>

              <Text>{item.item.value} $</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            display: "flex",
            width: '100%',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: 60
          }}
        >
          <Text style ={{fontSize: 18, textAlign: "center"}} >No items to show. Buy some on the shop!</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
