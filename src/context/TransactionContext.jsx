import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({
    addressTo: '', amount: '', keyword: '',message: '',
  })
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevState) => ({...prevState, [name]: value}));
  }

  const getAllTransactions = async() => {
    try {
      if(!ethereum) return alert("Please install metamask");
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();
      const structuredTransaction = availableTransactions.map((transaction) =>({
        addressTo: transaction.reciever,
        addressFrom: transaction.sender,
        timstamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex)/(10 ** 18)

      }))
      setTransactions(structuredTransaction)
    } catch(error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async() => {
    if(!ethereum) return alert("Please install metamask");

    const accounts = await ethereum.request({ method:'eth_accounts' })
    if(accounts.length) {
      setCurrentAccount(accounts[0])
      getAllTransactions()
    } else {
      console.log("No account found")
    }
  }

  const checkIfTransactionsExist = async() => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  const connectWallet = async () => {
    try{
      if(!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
      console.log('accounts', accounts)
    } catch(error) {
      console.log(error)
    }
  }

  const sendTransaction = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount)
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount._hex
        }]
      });
      const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      console.log(transactionCount)
      setTransactionCount(transactionCount.toNumber())
      history.go(0);
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  )
}