import React, { Component } from "react";

import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { Header } from "./Header";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "./primaryButton";
import TxHandler from "../utils/handlers/transactionHandler";
import { Item } from "./ListItem";

let { width } = Dimensions.get("window");

export class History extends Component {
  constructor(props) {
    super(props);
  }

  deleteIncome = (id) => {
    Alert.alert(
      "Confirm Delete Income",
      "This Action Cannot Be Reverted, Are You Sure?",
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            TxHandler.deleteIncome(id, this.props.reset);
          },
        },
      ]
    );
  };

  deleteExpense = (id) => {
    Alert.alert(
      "Confirm Delete Expense",
      "This Action Cannot Be Reverted, Are You Sure?",
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            TxHandler.deleteExpense(id, this.props.reset);
          },
        },
      ]
    );
  };

  render() {
    if (this.props.expenseData.length > 0 && this.props.incomeData.length > 0) {
      return (
        <>
          <Header text="History" />
          <View style={{ ...style.container }}>
            <Header text="Income" size={12} />
            <FlatList
              data={this.props.incomeData}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.incomeTitle}
                  amount={item.incomeAmount}
                  onLongPress={() => {
                    this.deleteIncome(item.id);
                  }}
                />
              )}
            />
            <Header text="Expense" size={12} verticalGap={3} />
            <FlatList
              data={this.props.expenseData}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.expenseTitle}
                  amount={-item.expenseAmount}
                  onLongPress={() => {
                    this.deleteExpense(item.id);
                  }}
                />
              )}
            />
          </View>
          <Button title="Show Full History" onPress={this.props.onPress} />
        </>
      );
    } else if (
      this.props.incomeData.length > 0 &&
      !this.props.expenseData.length > 0
    ) {
      return (
        <>
          <Header text="History" />
          <View style={{ ...style.container }}>
            <Header text="Income" size={12} />
            <FlatList
              data={this.props.incomeData}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.incomeTitle}
                  amount={item.incomeAmount}
                  onLongPress={() => {
                    this.deleteIncome(item.id);
                  }}
                />
              )}
            />
            <Header text="Expense" size={12} />
            <View style={style.centerAlign}>
              <Text>No Records</Text>
            </View>
          </View>
          <Button title="Show Full History" onPress={this.props.onPress} />
        </>
      );
    } else if (
      this.props.expenseData.length > 0 &&
      !this.props.incomeData.length > 0
    ) {
      return (
        <>
          <Header text="History" />
          <View style={{ ...style.container }}>
            <Header text="Income" size={12} />
            <View style={style.centerAlign}>
              <Text>No Records</Text>
            </View>
            <Header text="Expense" size={12} />
            <FlatList
              data={this.props.expenseData}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  title={item.expenseTitle}
                  amount={-item.expenseAmount}
                  onLongPress={() => {
                    this.deleteExpense(item.id);
                  }}
                />
              )}
            />
          </View>
          <Button title="Show Full History" onPress={this.props.onPress} />
        </>
      );
    } else {
      return (
        <>
          <Header text="History" />
          <View style={{ ...style.container }}>
            <Header text="Income" size={12} />
            <View style={style.centerAlign}>
              <Text>No Records</Text>
            </View>
            <Header text="Expense" size={12} />
            <View style={style.centerAlign}>
              <Text>No Records</Text>
            </View>
          </View>
          <Button title="Show Full History" onPress={this.props.onPress} />
        </>
      );
    }
  }
}

const style = StyleSheet.create({
  container: {
    width: width - 30,
    marginHorizontal: width / 30,
  },

  centerAlign: {
    justifyContent: "center",
    alignItems: "center",
  },
});
