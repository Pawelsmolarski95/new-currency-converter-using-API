import styles from './TextInput.module.scss'
import PropTypes from "prop-types"

const TextInput = (props) => {
    return (
        <input className={styles.input}  type="text" value={props.amount} onChange={ e => props.onAmountChange(e.target.value)}/>
      );
}
 
TextInput.propTypes = {
    amount: PropTypes.number,
    onAmountChange: PropTypes.func.isRequired
}

export default TextInput;