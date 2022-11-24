import PropTypes from "prop-types";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import styles from "./CurrencyInput.module.scss"



const CurrencyInput = (props) => {
   
    return ( 
        <div className={styles.wrapper}>
            <TextInput onAmountChange={props.onAmountChange} amount={props.amount} />
            <Select onCurrencyChange={props.onCurrencyChange} currency={props.currency} currencies={props.currencies} />
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