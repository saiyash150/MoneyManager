import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    history: [],
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: 'INCOME',
  }

  addtitle = event => {
    this.setState({title: event.target.value})
  }

  changetype = event => {
    this.setState({type: event.target.value})
  }

  changeamount = event => {
    this.setState({amount: event.target.value})
  }

  deleteitem = (id, amount, type) => {
    const {history} = this.state
    const updateditem = history.filter(each => each.id !== id)
    this.setState({history: updateditem})

    if (type === 'INCOME') {
      this.setState(each => ({income: each.income - amount}))
    } else if (type === 'EXPENSES') {
      this.setState(each => ({expenses: each.expenses - amount}))
    }
  }

  makepayment = event => {
    event.preventDefault()

    const {type, title, amount} = this.state

    const item = {id: uuidv4(), title, amount, type}
    if (type === 'INCOME') {
      this.setState(each => ({
        income: each.income + parseInt(each.amount),
        history: [...each.history, item],
        title: '',
        amount: '',
      }))
    } else if (type === 'EXPENSES') {
      this.setState(each => ({
        expenses: each.expenses + parseInt(each.amount),
        history: [...each.history, item],
        title: '',
        amount: '',
      }))
    }
  }

  render() {
    const {history, income, expenses, title, amount, type} = this.state

    const balance = income - expenses

    return (
      <div className="bg-container">
        <div className="title-card">
          <h1 className="head">Hi, Richard</h1>
          <p>
            Welcome back to your
            <span className="moneymanager"> Money Manager</span>
          </p>
        </div>
        <div className="money-details-container">
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            value={balance}
            test="balanceAmount"
            bg="list-b"
            display="Balance"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            value={income}
            test="incomeAmount"
            bg="list-i"
            display="Income"
          />
          <MoneyDetails
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            value={expenses}
            test="expensesAmount"
            bg="list-e"
            display="Expenses"
          />
        </div>

        <div className="user-data-container">
          <div className="user-card">
            <form className="textinputcard">
              <h1>Add Transaction</h1>
              <label className="title" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                value={title}
                className="titlebox"
                placeholder="TITLE"
                onChange={this.addtitle}
              />
              <label className="amount" htmlFor="amount">
                AMOUNT
              </label>
              <input
                id="amount"
                type="text"
                value={amount}
                className="amountbox"
                placeholder="AMOUNT"
                onChange={this.changeamount}
              />
              <label className="amountype" htmlFor="selectmoney">
                TYPE
              </label>
              <select
                className="selectmoney"
                id="selectmoney"
                onChange={this.changetype}
                value={type}
              >
                <option
                  key={transactionTypeOptions[0].optionId}
                  value={transactionTypeOptions[0].optionId}
                >
                  {transactionTypeOptions[0].displayText}
                </option>
                <option
                  key={transactionTypeOptions[1].optionId}
                  value={transactionTypeOptions[1].optionId}
                >
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <button className="but" type="button" onClick={this.makepayment}>
                Add
              </button>
            </form>
          </div>

          <div className="history-container">
            <h1 className="history-name">History</h1>
            <ul className="history-list">
              <li className="header">
                <p className="p1">Title</p>
                <p className="pg">Amount</p>
                <p className="pt">Type</p>
              </li>

              {history.map(each => (
                <TransactionItem
                  details={each}
                  key={each.id}
                  deleteitem={this.deleteitem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
