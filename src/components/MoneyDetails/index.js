import './index.css'

const MoneyDetails = props => {
  const {imgUrl, test, display, alt, value, bg} = props

  return (
    <div className={bg}>
      <img src={imgUrl} className="logo" alt={alt} />
      <div className="text-content">
        <p className="desp">Your {display}</p>
        <p className="money" data-testid={test}>
          Rs {value}
        </p>
      </div>
    </div>
  )
}
export default MoneyDetails
