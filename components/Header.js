import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export class Header extends Component {
  render() {
    return (
      <>
        <Text
          style={{
            ...style.headerStyle,
            fontSize: this.props.size || 17,
            marginVertical: 10,
            marginHorizontal: 10,
            fontWeight: this.props.weight || "normal",
            textAlign: this.props.align,
            paddingTop: this.props.verticalGap,
          }}
        >
          {this.props.text}
        </Text>
      </>
    );
  }
}

const style = StyleSheet.create({
  headerStyle: {
    fontSize: 17,
    textTransform: "uppercase",
  },
});
