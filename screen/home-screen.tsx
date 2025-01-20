import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { contadorStyles, shopStyle, styles } from "../style/globalStyling";
import { useEffect, useState } from "react";
import { InventoryItem, storageInventoryGet } from "../utils/inventoryHandling";
import { storageMonedasBalanceGet } from "../utils/moneyHandling";

const HomeScreen = () => {

    const [balance, setBalance] = useState(0);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);

    useEffect(() => {
        const getBalance = async ()=>{
            const _balance = await storageMonedasBalanceGet()
            setBalance(_balance)
        }

        const getInventory = async () => {
            const inv = await storageInventoryGet()
            setInventory(inv)
        }

        getInventory()
        getBalance()

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