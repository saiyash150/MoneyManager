// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, deleteitem} = props
  const {title, id, amount, type} = details
  const ondelete = () => {
    deleteitem(id, amount, type)
  }

  return (
    <li className="line">
      <p className="pl">{title}</p>
      <p className="p2">Rs {amount}</p>
      <p className="p3">{type === 'INCOME' ? 'Income' : 'Expenses'}</p>
      <button
        type="button"
        className="deletelog"
        onClick={ondelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="log"
        />
      </button>
    </li>
  )
}
export default TransactionItem
