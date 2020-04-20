import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

let { width } = Dimensions.get("window");

export class Item extends Component {
  constructor({ id, title, amount, date, month, year }) {
    super();
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.date = `${date}-${month}-${year}`;
  }

  render() {
    if (this.amount && this.date) {
      return (
        <TouchableOpacity
          style={{
            ...style.listItem,
            borderRightColor: this.amount > 0 ? "green" : "red",
          }}
          onLongPress={this.props.onLongPress}
          onPress={this.props.onPress}
        >
          <Text style={{ flex: !this.date.includes("undefined") ? 0.6 : 0.5 }}>
            {this.title}
          </Text>
          <Text
            style={{
              flex: !this.date.includes("undefined") ? 0.3 : 0.2,
              color: this.amount > 0 ? "green" : "red",
            }}
          >
            {Math.abs(this.amount)}
          </Text>
          <Text style={{ flex: 0.3, fontSize: 12, right: -30 }}>
            {!this.date.includes("undefined") ? this.date : null}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            ...style.listButtonItem,
          }}
          onLongPress={this.props.onLongPress}
          onPress={this.props.onPress}
        >
          <Text
            style={{
              ...style.buttonText,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {this.title}
          </Text>
        </TouchableOpacity>
      );
    }
  }
}

let style = StyleSheet.create({
  title: {
    flex: 0.6,
  },
  amount: {
    flex: 0.3,
  },
  listButtonItem: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    width: width - 30,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 12,
    borderRightColor: "#ff1493",
    borderLeftColor: "#ff1493",
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderRadius: 4,
  },

  buttonText: {
    flex: 1,
  },

  listItem: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 5,
    width: width - 30,
    padding: 10,
    borderRightColor: "red",
    borderRightWidth: 5,
    borderRadius: 2,
  },
});
