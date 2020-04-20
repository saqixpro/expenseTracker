import React, { Component } from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Header } from "./Header";

let { width } = Dimensions.get("screen");

export class ThisMonth extends Component {
  render() {
    return (
      <>
        <Header text="This Month" verticalGap={5} />
        <View style={{ ...style.container }}>
          <View style={{ ...style.subContainer, ...style.rightThickBorder }}>
            <Text style={{ ...style.centerText }}>Income</Text>
            <Text
              style={{
                ...style.CashDisplayer,
                ...style.centerText,
              }}
            >
              {this.props.income_thisMonth || 0}
            </Text>
            <Text
              style={{
                ...style.smallBottomText,
                color: this.props.incomeComparisonColor,
              }}
            >
              {this.props.incomeComparison || 0}%{" "}
              <Text style={style.vsText}>{"   "}vs last Month</Text>
            </Text>
          </View>
          <View style={{ ...style.subContainer }}>
            <Text style={{ ...style.centerText }}>Expense</Text>
            <Text
              style={{
                ...style.CashDisplayer,
                ...style.centerText,
              }}
            >
              {this.props.expense_thisMonth || 0}
            </Text>
            <Text
              style={{
                ...style.smallBottomText,
                color: this.props.expenseComparisonColor,
              }}
            >
              {this.props.expenseComparison || 0}%{" "}
              <Text style={style.vsText}>{"   "}vs last Month</Text>
            </Text>
          </View>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    marginHorizontal: width / 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: width - 40,
  },
  subContainer: {
    flex: 0.5,
  },

  smallText: {
    fontSize: 8,
  },

  CashDisplayer: {
    fontSize: 25,
    marginVertical: 5,
  },

  greenText: {
    color: "green",
  },

  redText: {
    color: "red",
  },

  smallBottomText: {
    paddingLeft: 10,
    fontSize: 14,
  },

  rightThickBorder: {
    borderRightColor: "#000",
    borderRightWidth: 2,
  },

  centerText: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  vsText: {
    color: "black",
    fontSize: 10,
  },
});
