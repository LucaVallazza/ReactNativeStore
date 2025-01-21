import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { contadorStyles, shopStyle, styles } from "../style/globalStyling";
import { useEffect, useState } from "react";
import { InventoryItem, storageInventoryGet } from "../utils/inventoryHandling";
import { storageMonedasBalanceGet } from "../utils/moneyHandling";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/store";
import { asyncInitInventory } from "../utils/slices/inventorySlices";
import { asyncMoneyGet } from "../utils/slices/moneySlice";

const HomeScreen = () => {

    const dispatch = useDispatch<AppDispatch>()
    // const [inventory, setInventory] = useState<InventoryItem[]>([]);

    const {inventory, isLoading} = useSelector((state : RootState) => state.inventory)

    const {balance} = useSelector((state : RootState) => state.money)

    useEffect(() => {

        dispatch(asyncMoneyGet())
        dispatch(asyncInitInventory())

    }, []);

    return ( 
    <View style = {styles.container}>
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
        <Text style={{fontSize: 40}}>
            Items
        </Text>
                <ScrollView style = {shopStyle.itemsContainer}
                contentContainerStyle = {{alignContent: 'space-around', justifyContent: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {inventory.map((item)=>(
                        <View key={item.item.name} style={shopStyle.itemContainer}>
                            <Image style={shopStyle.tinyLogo} source={{uri: item.item.url}} />
                            <Text style= {{fontWeight:'bold'}}>{item.item.name} (x{item.amount}) </Text>
       
                                <Text>{item.item.value} $</Text>
                        </View>
                    ))}
                </ScrollView>
    </View> );
}
 


export default HomeScreen