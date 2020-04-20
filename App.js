import React, { Component } from "react";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Components
import { Home } from "./screens/Home";
import { NewTransaction } from "./screens/NewTransaction";
import { History } from "./screens/HistoryScreen";
import { IncomeHistory } from "./screens/IncomeHistory";
import { ExpenseHistory } from "./screens/expenseHistory";

const { Navigator, Screen } = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: "horizontal",
            ...TransitionPresets.SlideFromRightIOS,
          }}
          animation="fade"
        >
          <Screen name="Home" component={Home} />
          <Screen name="NewTransaction" component={NewTransaction} />
          <Screen name="History" component={History} />
          <Screen name="IncomeHistory" component={IncomeHistory} />
          <Screen name="ExpenseHistory" component={ExpenseHistory} />
        </Navigator>
      </NavigationContainer>
    );
  }
}
