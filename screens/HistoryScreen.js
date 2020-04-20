import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Header } from "../components/Header";
import { FlatList } from "react-native-gesture-handler";
import { Item } from "../components/ListItem";

let buttons = [
  {
    id: 1,
    title: "Income",
    amount: null,
  },
  {
    id: 2,
    title: "Expense",
    amount: null,
  },
];

export class History extends Component {
  handlePress = (id) => {
    switch (id) {
      case 1:
        this.props.navigation.navigate("IncomeHistory");
        break;
      case 2:
        this.props.navigation.navigate("ExpenseHistory");
        break;
    }
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header text="History" align="center" weight="bold" />
        <View style={{ marginVertical: 50 }}>
          <FlatList
            data={buttons}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                title={item.title}
                onPress={() => {
                  this.handlePress(item.id);
                }}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#EEE",
    width: "100%",
    height: "100%",
    padding: 20,
  },

  centerAlign: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
