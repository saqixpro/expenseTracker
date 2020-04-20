import Database from "../database/database";
export default class TxHandler {
  static income_data = [];
  static expense_data = [];
  static cashInHand = 0;
  static income_today = 0;
  static expense_today = 0;
  static expense_yesterday = 0;
  static income_yesterday = 0;
  static income_this_month = 0;
  static expense_this_month = 0;
  static last_month_expense = 0;
  static last_month_income = 0;
  static allIncomes = [];
  static allExpenses = [];

  static async addTransaction(type, title, amount) {
    switch (type) {
      case "income":
        await Database.AddIncome(title, amount)
          .then(() => {
            alert(`${type} added successfully!`);
          })
          .catch((err) => {
            alert(err);
          });
        break;
      case "expense":
        if (amount <= TxHandler.cashInHand) {
          await Database.AddExpense(title, amount)
            .then(() => {
              alert(`${type} added successfully!`);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert("Insufficient Cash In Hand For That Expense!");
        }
        break;
    }
  }

  static async fetchAllIncome() {
    await Database.getAllIncomes().then((incomes) => {
      TxHandler.allIncomes = incomes.filter((income) => {
        return income.month == new Date().getMonth() + 1;
      });
    });
  }

  static async fetchAllExpense() {
    await Database.getAllExpenses().then((expenses) => {
      TxHandler.allExpenses = expenses.filter((expense) => {
        return expense.month == new Date().getMonth() + 1;
      });
    });
  }

  static async fetchIncome() {
    await Database.getAllIncomeForToday()
      .then((res) => {
        TxHandler.income_data = res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async getThisMonthIncomeAmount() {
    await Database.getThisMonthIncome().then((income) => {
      TxHandler.income_this_month = income;
    });
  }

  static async getThisMonthExpenseAmount() {
    await Database.getThisMonthExpense().then((expense) => {
      TxHandler.expense_this_month = expense;
    });
  }

  static async getIncomeToday() {
    await Database.getIncomeToday().then((income) => {
      TxHandler.income_today = income;
    });
  }

  static async getExpenseToday() {
    await Database.getExpenseToday().then((expense) => {
      TxHandler.expense_today = expense;
    });
  }

  static async fetchExpense() {
    await Database.getAllExpenseForToday()
      .then((res) => {
        TxHandler.expense_data = res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static deleteIncome(id, callback) {
    Database.deleteIncomeByID(id).then(callback());
  }

  static async deleteExpense(id, callback) {
    await Database.deleteExpenseByID(id).then(callback());
  }

  static async cashInHandCalculator() {
    await Database.getTotalIncome().then(async (income) => {
      await Database.getTotalExpense().then((expense) => {
        TxHandler.cashInHand = +income - +expense;
      });
    });
  }

  static compare(tsx1, tsx2) {
    let percentage = 0;
    if (!tsx2 || tsx2 == 0) percentage = 0;
    else percentage = tsx1 / tsx2;
    return percentage.toFixed(2);
  }

  static async getYesterdayIncome() {
    await Database.getYesterDayIncome()
      .then((income) => {
        TxHandler.income_yesterday = income;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getYesterdayExpense() {
    Database.getYesterDayExpense()
      .then((expense) => {
        TxHandler.expense_yesterday = expense;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getLastMonthIncome() {
    Database.getLastMonthIncome().then((income) => {
      TxHandler.last_month_income = income;
    });
  }

  static async getLastMonthExpense() {
    Database.getLastMonthExpense().then((expense) => {
      TxHandler.last_month_expense = expense;
    });
  }
}
