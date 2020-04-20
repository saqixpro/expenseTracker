import React, { Component } from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
export class Input extends Component {
  render() {
    return (
      <>
        <Text style={style.label}>{this.props.label}</Text>
        <TextInput
          style={{
            ...style.input,
            borderRadius: this.props.roundness,
            borderColor: this.props.borderColor,
            borderWidth: this.props.thickness,
          }}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          editable={this.props.editable}
          enabled={this.props.enabled}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onEndEditing={this.props.onEndEditing}
          onFocus={this.props.onFocus}
          onGestureEvent={this.props.onGestureEvent}
          onMagicTap={this.props.onMagicTap}
          onKeyPress={this.props.onKeyPress}
        />
      </>
    );
  }
}

const style = StyleSheet.create({
  label: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 12,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#FFF",
    color: "#000",
    marginTop: 5,
    textAlign: "center",
    padding: 10,
  },
});
