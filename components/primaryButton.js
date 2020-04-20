import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

export class Button extends Component {
  render() {
    return (
      <>
        <TouchableOpacity
          style={{
            ...style.button,
          }}
          onPress={this.props.onPress}
        >
          <Text
            style={{
              ...style.buttonText,
            }}
          >
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}

const style = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 25,
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    color: "#ff1493",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
