import PropTypes from 'prop-types'
import styles from './Select.module.scss'

const Select = (props) => {
    return (
        <select className={styles.select} value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
            {props.currencies.map((currency => (
                <option key={currency} value={currency}>{currency}</option>
            )))}
                
        </select>
      );
}
 
Select.propTypes = {
    onCurrencyChange: PropTypes.func.isRequired,
    currencies: PropTypes.array,
    currency: PropTypes.string.isRequired,
}

export default Select;