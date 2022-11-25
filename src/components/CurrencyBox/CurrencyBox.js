/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import Title from "../Title/Title";
import { FcCurrencyExchange } from 'react-icons/fc';
import styles from "./CurrencyBox.module.scss"
import axios from "axios";
import { format } from "../../utils/format"



const CurrencyBox = () => {
    
    const [amountOne, setAmountOne] = useState(1);
    const [amountTwo, setAmountTwo] = useState(1);
    const [currencyOne, setCurrencyOne] = useState( 'USD');
    const [currencyTwo, setCurrencyTwo] = useState( 'PLN');
    const [conversion_rates, setConversion_rates] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false)
   
    
    
    useEffect(() => {
      
      const fetchData = async () => {
      
          setLoading(true)
          
          try {
            const response = await axios("https://v6.exchangerate-api.com/v6/5f3fee8abd2ef54e63a6a8eb/latest/USD")
            setConversion_rates(response.data.conversion_rates)     
          }
          catch(error) {
            setError(true)
          }
          setLoading(false)
        }
          fetchData()
          
    }, []);
    
    useEffect(()=> {
      if(!!conversion_rates) {
        function init() {
          handleAmountOneChange(1);
        }
        init();
      }
    }, [conversion_rates])
    
        
    const  handleAmountOneChange = (amountOne) => {
        setAmountTwo(format(amountOne * conversion_rates[currencyTwo] / conversion_rates[currencyOne]));
        setAmountOne(amountOne)
    }
        
    const  handleCurrencyOneChange = (currencyOne) => {
        setAmountTwo(format(amountOne * conversion_rates[currencyTwo] / conversion_rates[currencyOne]));
        setCurrencyOne(currencyOne)
    }
        
    const  handleAmountTwoChange = (amountTwo) => {
        setAmountOne(format(amountTwo * conversion_rates[currencyOne] / conversion_rates[currencyTwo]));
        setAmountTwo(amountTwo)
    }
        
    const  handleCurrencyTwoChange = (currencyTwo) => {
        setAmountTwo(format(amountTwo * conversion_rates[currencyOne] / conversion_rates[currencyTwo]));
        setCurrencyTwo(currencyTwo)
    }
    
    return (
        <Container>
            {isLoading && <h3 className={styles.alert}>Loading...</h3>}
            {isError  && <h3 className={styles.alert}>Something went wrong</h3>}
            <FcCurrencyExchange  className={styles.icon} size="190px" />
            <Title/>
            <CurrencyInput 
                onAmountChange={handleAmountOneChange}
                onCurrencyChange={handleCurrencyOneChange}
                currencies={Object.keys(conversion_rates)} 
                amount={amountOne} 
                currency={currencyOne}         
            />
            <CurrencyInput 
                onAmountChange={handleAmountTwoChange}
                onCurrencyChange={handleCurrencyTwoChange}
                currencies={Object.keys(conversion_rates)} 
                amount={amountTwo} 
                currency={currencyTwo} 
            />
        </Container>
      );
}
 
export default CurrencyBox;