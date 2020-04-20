import React, { Component } from "react";
import { Header } from "../components/Header";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { Item } from "../components/ListItem";
import { FlatList } from "react-native-gesture-handler";
import TxHandler from "../utils/handlers/transactionHandler";

export class IncomeHistory extends Component {
  state = {
    incomeData: [],
  };

  componentDidMount() {
    this.fetchIncomes();
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
            TxHandler.deleteIncome(id, () => {
              this.props.navigation.navigate("History");
              alert("Transaction Deleted Successfully!");
            });
          },
        },
      ]
    );
  };

  async fetchIncomes() {
    await TxHandler.fetchAllIncome().then(() => {
      this.setState({ incomeData: TxHandler.allIncomes });
    });
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header text="Income History" weight="bold" align="center" />
        <FlatList
          data={this.state.incomeData}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.incomeTitle}
              amount={item.incomeAmount}
              date={item.date}
              month={item.month}
              year={item.year}
              onLongPress={() => this.deleteIncome(item.id)}
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
