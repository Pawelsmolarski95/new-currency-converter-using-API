import PropTypes from "prop-types";
import styles from "./CurrencyInput.module.scss"



const CurrencyInput = (props) => {
   
    return ( 
        <div className={styles.wrapper}>
            <input className={styles.input}  type="text" value={props.amount} onChange={ e => props.onAmountChange(e.target.value)}/>
            <select className={styles.select} value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
                
            </select>
         </div>
     );
}
CurrencyInput.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
} 

export default CurrencyInput;