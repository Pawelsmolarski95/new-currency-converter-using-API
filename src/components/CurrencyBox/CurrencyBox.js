/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import Title from "../Title/Title";
import axios from "axios";
import { FcCurrencyExchange } from 'react-icons/fc';
import styles from "./CurrencyBox.module.scss"

const CurrencyBox = () => {
    
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState( 'USD');
    const [currency2, setCurrency2] = useState( 'PLN');
    const [conversion_rates, setConversion_rates] = useState([]);
   
    
    
    useEffect(() => {
      
      axios.get("https://v6.exchangerate-api.com/v6/5f3fee8abd2ef54e63a6a8eb/latest/USD")
      .then(response => {
        setConversion_rates(response.data.conversion_rates)
        
      })
    }, []);
    
    useEffect(()=> {
      if(!!conversion_rates) {
        function init() {
          handleAmount1Change(1);
        }
        init();
      }
    }, [conversion_rates])
    
    
    const format = (number) => {
        return (
          number.toFixed(4)
        )}
        
        function handleAmount1Change(amount1) {
          
          setAmount2(format(amount1 * conversion_rates[currency2] / conversion_rates[currency1]));
          setAmount1(amount1)
          
        }
        function handleCurrency1Change(currency1) {
          
          setAmount2(format(amount1 * conversion_rates[currency2] / conversion_rates[currency1]));
          setCurrency1(currency1)
        }
        
        function handleAmount2Change(amount2) {
          setAmount1(format(amount2 * conversion_rates[currency1] / conversion_rates[currency2]));
          setAmount2(amount2)
        }
        
        function handleCurrency2Change(currency2) {
          setAmount2(format(amount2 * conversion_rates[currency1] / conversion_rates[currency2]));
          setCurrency2(currency2)
        }
    
    return (
        <Container>
            <FcCurrencyExchange  className={styles.icon} size="190px" />
            <Title/>
            <CurrencyInput 
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(conversion_rates)} 
                amount={amount1} 
                currency={currency1}         
            />
            <CurrencyInput 
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(conversion_rates)} 
                amount={amount2} 
                currency={currency2} 
            />
        </Container>
      );
}
 
export default CurrencyBox;