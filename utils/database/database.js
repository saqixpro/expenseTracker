import * as SQLite from "expo-sqlite";

let sqlite = SQLite.openDatabase("data.db", "1.0");

export default class Database {
  static date() {
    let date = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    date = date.split("-");
    return { date: date[0], month: date[1], year: date[2] };
  }
  static AddIncome(title, amount) {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO income values(?,?,?,?,?,?)`,
          [null, title, amount, date, month, year],
          (tx, result) => {
            resolve("success");
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static AddExpense(title, amount) {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO expense values(?,?,?,?,?,?)`,
          [null, title, amount, date, month, year],
          (tx, result) => {
            resolve("success");
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllExpenses() {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from expense where 1=1`,
          [],
          (tx, result) => {
            let Expenses = [];
            let len = result.rows.length;

            for (let i = 0; i < len; i++) {
              Expenses.push(result.rows.item(i));
            }
            resolve(Expenses);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllIncomes() {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from income where 1=1`,
          [],
          (tx, result) => {
            let Expenses = [];
            let len = result.rows.length;

            for (let i = 0; i < len; i++) {
              Expenses.push(result.rows.item(i));
            }
            resolve(Expenses);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static deleteIncomeByID(id) {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM income WHERE id = ?`,
          [id],
          (tx, result) => {
            resolve(`Success`);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getIncomeToday() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(incomeAmount) as totalIncome from income WHERE date = ? AND month = ? AND year = ?`,
          [date, month, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalIncome;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getExpenseToday() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(expenseAmount) as totalExpense from expense WHERE date = ? AND month = ? AND year = ?`,
          [date, month, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalExpense;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getTotalExpense() {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(expenseAmount) as totalExpense from expense WHERE 1=1`,
          [],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalExpense;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getTotalIncome() {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(incomeAmount) as totalIncome from income WHERE 1=1`,
          [],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalIncome;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static deleteExpenseByID(id) {
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `DELETE from expense where id = ?`,
          [id],
          (tx, result) => {
            resolve(`Success`);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllExpenseForToday() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from expense Where date = ? AND month = ? AND year = ?`,
          [date, month, year],
          (tx, result) => {
            let Result = [];
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i);
              Result.push(item);
            }
            resolve(Result);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllIncomeForToday() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from income Where date = ? AND month = ? AND year = ?`,
          [date, month, year],
          (tx, result) => {
            let Result = [];
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i);
              Result.push(item);
            }
            resolve(Result);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllExpenseTransactionsFromThisMonth() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from expense Where month = ? AND year = ?`,
          [month, year],
          (tx, result) => {
            let Result = [];
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i);
              Result.push(item);
            }
            resolve(Result);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getAllIncomeTransactionsFromThisMonth() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT * from income Where month = ? AND year = ?`,
          [month, year],
          (tx, result) => {
            let Result = [];
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i);
              Result.push(item);
            }
            resolve(Result);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getYesterDayIncome() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(incomeAmount) as totalIncome from income WHERE date = ? AND month = ? AND year = ?`,
          [date - 1, month, year],
          (tx, result) => {
            let amount = 0;
            amount = result.rows.item(0).totalIncome;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getThisMonthIncome() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(incomeAmount) as totalIncome FROM income WHERE month = ? AND year = ?`,
          [month, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalIncome;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getLastMonthIncome() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(incomeAmount) as totalIncome FROM income WHERE month = ? AND year = ?`,
          [month - 1, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalIncome;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getThisMonthExpense() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(expenseAmount) as totalExpense FROM expense WHERE month = ? AND year = ?`,
          [month, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalExpense;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getLastMonthExpense() {
    let { month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(expenseAmount) as totalExpense FROM expense WHERE month = ? AND year = ?`,
          [month - 1, year],
          (tx, result) => {
            let amount;
            amount = result.rows.item(0).totalExpense;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }

  static getYesterDayExpense() {
    let { date, month, year } = Database.date();
    return new Promise((resolve, reject) => {
      sqlite.transaction((tx) => {
        tx.executeSql(
          `SELECT SUM(expenseAmount) as totalExpense from expense WHERE date = ? AND month = ? AND year = ?`,
          [date - 1, month, year],
          (tx, result) => {
            let amount = 0;
            amount = result.rows.item(0).totalExpense;
            resolve(amount);
          },
          (tx, error) => {
            reject(error.message);
          }
        );
      });
    });
  }
}
