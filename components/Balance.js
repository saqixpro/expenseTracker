import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export class Balance extends Component {
  render() {
    return (
      <>
        <Text style={style.balanceText}>CASH IN HAND</Text>
        <Text style={{ ...style.balance }}>{this.props.cashInHand}</Text>
      </>
    );
  }
}

const style = StyleSheet.create({
  balanceText: {
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 10,
    marginHorizontal: 10,
  },
});
