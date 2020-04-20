import React, { Component } from "react";

import { SafeAreaView, StyleSheet, Platform, ScrollView } from "react-native";

import { Header } from "../components/Header";
import { Balance } from "../components/Balance";
import { Today } from "../components/Today";
import { ThisMonth } from "../components/ThisMonth";
import { History } from "../components/History";
import { Button } from "../components/primaryButton";
import TxHandler from "../utils/handlers/transactionHandler";
import { ButtonIcon } from "../components/buttonIcon";

import { BannerAd, InterstitialAd } from "../ads/ads";

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    // cash in hand
    cashInHand: 0,

    // History States

    expenseData: [],
    incomeData: [],

    // Today States

    income_today: null,
    expense_today: null,
    yesterday_income_comparison: null,
    yesterday_expense_comparison: null,
    yesterday_expense_comparison_color: "black",
    yesterday_income_comparison_color: "black",

    // This Month
    income_thisMonth: null,
    expense_thisMonth: null,
    last_month_income_comparison: null,
    last_month_expense_comparison_color: null,
    last_month_expense_comparison: null,
    last_month_income_comparison_color: null,
  };

  componentDidMount() {
    this.fetchData();
    this.fetchCashInHand();
    this.getTodayTransactionAmounts();
    this.getThisMonthTransactionAmounts();
  }

  async fetchData() {
    TxHandler.fetchIncome().then(() => {
      TxHandler.fetchExpense().then(() => {
        this.setState({
          expenseData: TxHandler.expense_data,
          incomeData: TxHandler.income_data,
        });
      });
    });
  }

  async getIncomeComparisons() {
    await TxHandler.getYesterdayIncome().then(() => {
      let percentage = TxHandler.compare(
        TxHandler.income_today,
        TxHandler.income_yesterday
      );

      let color = percentage > 1 ? "green" : percentage == 1 ? "black" : "red";

      percentage *= 100;

      this.setState({
        yesterday_income_comparison: percentage,
        yesterday_income_comparison_color: color,
      });
    });
  }

  async getMonthlyExpenseComparisons() {
    await TxHandler.getLastMonthExpense().then(() => {
      let percentage = TxHandler.compare(
        TxHandler.expense_this_month,
        TxHandler.last_month_expense
      );
      let color = percentage < 1 ? "green" : percentage == 1 ? "black" : "red";
      percentage *= 100;

      this.setState({
        last_month_expense_comparison: percentage,
        last_month_expense_comparison_color: color,
      });
    });
  }

  async getMonthlyIncomeComparisons() {
    await TxHandler.getLastMonthIncome().then(() => {
      let percentage = TxHandler.compare(
        TxHandler.income_this_month,
        TxHandler.last_month_income
      );
      let color = percentage > 1 ? "green" : percentage == 0 ? "black" : "red";
      percentage *= 100;

      this.setState({
        last_month_income_comparison: percentage,
        last_month_income_comparison_color: color,
      });
    });
  }

  async getExpenseComparisons() {
    await TxHandler.getYesterdayExpense().then(() => {
      let percentage = TxHandler.compare(
        TxHandler.expense_today,
        TxHandler.expense_yesterday
      );

      let color = percentage < 1 ? "green" : "red";

      percentage *= 100;
      percentage = +percentage.toFixed(2);

      this.setState({
        yesterday_expense_comparison_color: color,
        yesterday_expense_comparison: percentage,
      });
    });
  }

  async getTodayTransactionAmounts() {
    TxHandler.getIncomeToday().then(async () => {
      await TxHandler.getExpenseToday().then(() => {
        this.getIncomeComparisons();
        this.getExpenseComparisons();

        this.setState({
          income_today: TxHandler.income_today,
          expense_today: TxHandler.expense_today,
        });
      });
    });
  }

  async getThisMonthTransactionAmounts() {
    await TxHandler.getThisMonthIncomeAmount().then(async () => {
      await TxHandler.getThisMonthExpenseAmount().then(() => {
        this.getMonthlyExpenseComparisons();
        this.getMonthlyIncomeComparisons();

        this.setState({
          income_thisMonth: TxHandler.income_this_month,
          expense_thisMonth: TxHandler.expense_this_month,
        });
      });
    });
  }

  async newTransactionPage() {
    await InterstitialAd();
    this.props.navigation.navigate("NewTransaction");
  }

  async fullHistoryPage() {
    await InterstitialAd();
    this.props.navigation.navigate("History");
  }

  fetchCashInHand() {
    TxHandler.cashInHandCalculator().then(() => {
      this.setState({ cashInHand: TxHandler.cashInHand });
    });
  }

  reload() {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          ...style.container,
        }}
      >
   <ScrollView>
        <Header
          text="Expense Tracker"
          weight="bold"
          align="center"
          verticalGap={Platform.OS == "android" ? 10 : 0}
        />
        <ButtonIcon
          name="ios-refresh"
          size={30}
          onPress={() => this.reload()}
        />
        <Balance cashInHand={this.state.cashInHand} />
        <Today
          income_today={this.state.income_today}
          expense_today={this.state.expense_today}
          yesterday_expense_comparison_color={
            this.state.yesterday_expense_comparison_color
          }
          yesterday_income_comparison_color={
            this.state.yesterday_income_comparison_color
          }
          yesterday_expense_comparison={this.state.yesterday_expense_comparison}
          yesterday_income_comparison={this.state.yesterday_income_comparison}
        />
        <ThisMonth
          income_thisMonth={this.state.income_thisMonth}
          expense_thisMonth={this.state.expense_thisMonth}
          incomeComparison={this.state.last_month_income_comparison}
          incomeComparisonColor={this.state.last_month_income_comparison_color}
          expenseComparisonColor={
            this.state.last_month_expense_comparison_color
          }
          expenseComparison={this.state.last_month_expense_comparison}
        />
        <History
          incomeData={this.state.incomeData}
          expenseData={this.state.expenseData}
          reset={() => {
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
          onPress={() => this.fullHistoryPage()}
        />
        <Header text="Add New Transaction" verticalGap={10} />
        <Button
          title="Add New Transaction"
          onPress={() => this.newTransactionPage()}
        />
        <BannerAd />
     </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    backgroundColor: "#ececec",
    width: "100%",
    height: "100%",
  },

  centerAlign: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
