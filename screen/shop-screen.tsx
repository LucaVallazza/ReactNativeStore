import {
  Alert,
  Button,
  Image,
  RootTagContext,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { contadorStyles, shopStyle, styles } from "../style/globalStyling";
import { ShopItem, shopItems } from "../data/shopItems";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../style/constants";
import { storageMonedasBalanceGet } from "../utils/moneyHandling";
import {
  InventoryItem,
  storageInventoryGet,
  storageInventorySave,
} from "../utils/inventoryHandling";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import {
  asyncInitInventory,
  asyncSetInventory,
} from "../utils/slices/inventorySlices";
import { asyncMoneyGet, asyncMoneySet } from "../utils/slices/moneySlice";

const ShopScreen = () => {
  // const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const { inventory, isLoading } = useSelector(
    (state: RootState) => state.inventory
  );
  const { balance } = useSelector((state: RootState) => state.money);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncMoneyGet());
    dispatch(asyncInitInventory());
  }, []);
  const buyItem = async (item: ShopItem) => {
    console.log(balance);

    if (balance >= item.value) {
      console.log(`Puede comprar ${item.name} a ${item.value}`);
      if (inventory.find((e) => e.item.name == item.name)) {
        const newInventory = inventory.map((inventoryItem) => {
          if (inventoryItem.item.name === item.name)
            return { ...inventoryItem, amount: inventoryItem.amount + 1 };

          return inventoryItem;
        });
        dispatch(asyncMoneySet(balance - item.value));
        dispatch(asyncSetInventory(newInventory));
      } else {
        var newInventory = [];
        if (inventory) newInventory = [...inventory, { item: item, amount: 1 }];
        else newInventory = [{ item: item, amount: 1 }];
        dispatch(asyncMoneySet(balance - item.value));
        dispatch(asyncSetInventory(newInventory));
      }
    } else {
      console.log(`No puede comprar ${item.name} a ${item.value}`);
    }
  };

  const _shopItems: ShopItem[] = shopItems;

  return (
    <View style={[styles.container]}>
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
      <Text style={{ fontSize: 40 }}>Shop</Text>
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
        {shopItems.map((item) => (
          <View key={item.name} style={shopStyle.itemContainer}>
            <Image style={shopStyle.tinyLogo} source={{ uri: item.url }} />
            <Text style={{ fontWeight: "bold" }}> {item.name} </Text>
            <View style={styles.containerVertical}>
              <View
                style={{
                  ...contadorStyles.saldoContainer,
                  padding: 0,
                  paddingVertical: 5,
                  width: 70,
                }}
              >
                <Text
                  style={{
                    borderRadius: 50,
                    height: 20,
                    width: 20,
                    margin: 0,
                    textAlign: "center",
                    alignContent: "center",
                    backgroundColor: "yellow",
                    color: "black",
                  }}
                >
                  $
                </Text>
                <Text style={{ color: "white", margin: 0 }}>
                  {" "}
                  {item.value}{" "}
                </Text>
              </View>
              <Button title="Buy" onPress={() => buyItem(item)}></Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShopScreen;
