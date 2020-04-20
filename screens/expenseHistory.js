import React, { Component } from "react";
import { Header } from "../components/Header";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { Item } from "../components/ListItem";
import { FlatList } from "react-native-gesture-handler";
import TxHandler from "../utils/handlers/transactionHandler";

export class ExpenseHistory extends Component {
  state = {
    expenseData: [],
  };

  componentDidMount() {
    this.fetchExpense();
  }

  async fetchExpense() {
    await TxHandler.fetchAllExpense().then((expense) => {
      this.setState({ expenseData: TxHandler.allExpenses });
    });
  }

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
            TxHandler.deleteExpense(id, () => {
              this.props.navigation.navigate("History");
              alert("Transaction Deleted Successfully!");
            });
          },
        },
      ]
    );
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header text="Expense History" weight="bold" align="center" />
        <FlatList
          data={this.state.expenseData}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.expenseTitle}
              amount={item.expenseAmount}
              date={item.date}
              month={item.month}
              year={item.year}
              onLongPress={() => this.deleteExpense(item.id)}
            />
          )}
        />
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
