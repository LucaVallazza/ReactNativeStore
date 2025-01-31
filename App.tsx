import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screen/home-screen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import ShopScreen from "./screen/shop-screen";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import AddCoinsScreen from "./screen/add-coins-screen";

export default function App() {
  const RootTabs = createBottomTabNavigator();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer >
          <RootTabs.Navigator >
            <RootTabs.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="home" size={size} color={color} />
                ),
              }}
            />
            <RootTabs.Screen
              name="Add Coins"
              component={AddCoinsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="bitcoin" size={size} color={color} />
                ),
              }}
            />
            <RootTabs.Screen
              name="Shop"
              component={ShopScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="shop" size={size} color={color} />
                ),
              }}
            />
          </RootTabs.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
