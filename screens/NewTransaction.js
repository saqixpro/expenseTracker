import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Picker } from "react-native";
import { Header } from "../components/Header";
import { Input } from "../components/input";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "../components/primaryButton";
import TxHandler from "../utils/handlers/transactionHandler";

export class NewTransaction extends Component {
  state = {
    type: "expense",
    title: "",
    amount: 0,
  };

  handleChangeType(itemValue, itemIndex) {
    this.setState({ type: itemValue });
  }

  submitHandler = () => {
    TxHandler.addTransaction(
      this.state.type,
      this.state.title,
      this.state.amount
    ).then(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <ScrollView>
          <Header text="Add New Transaction" weight="bold" align="center" />
          <Header text="Transaction Type" />
          <Picker
            style={style.picker}
            itemStyle={style.picker}
            selectedValue={this.state.type}
            onValueChange={(itemValue, itemIndex) =>
              this.handleChangeType(itemValue, itemIndex)
            }
          >
            <Picker.Item value="expense" key="expense" label="Expense" />
            <Picker.Item value="income" key="income" label="Income" />
          </Picker>
          <Input
            label="Title"
            roundness={25}
            onChangeText={(val) => this.setState({ title: val })}
          />
          <Input
            label="Amount"
            roundness={25}
            onChangeText={(val) => this.setState({ amount: val })}
          />
          <Button
            title="Save Transaction"
            verticalGap={10}
            onPress={() => {
              this.submitHandler();
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    marginBottom: 0,
    padding: 0,
    paddingLeft: 5,
  },
});
