import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export class ButtonIcon extends Component {
  render() {
    return (
      <>
        <TouchableOpacity
          style={{
            ...style.button,
            width: this.props.size,
          }}
          onPress={this.props.onPress}
        >
          <Ionicons name={this.props.name} size={this.props.size} />
        </TouchableOpacity>
      </>
    );
  }
}

const style = StyleSheet.create({
  button: {
    padding: 5,
    alignSelf: "flex-end",
    marginRight: 10,
  },
});
