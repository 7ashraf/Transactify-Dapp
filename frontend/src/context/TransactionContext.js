import React, {useEffect, useState} from "react";
import { ethers } from "ethers";

import { contractABI, constractAdress } from "../utils/cons";

export const TransactionContext = React.createContext();

const {ethereum} = window

const getEtheriumContract = () => {
  
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()
        const transactionContract = new ethers.Contract(constractAdress, contractABI, signer)
        console.log({
          provider,
          signer,
          transactionContract
        })
        return transactionContract;
    }




export const TransactionProvider = ({ children }) => {

    const [isLoadin, setisLoadin] = useState(false)
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };
    
    
    const [currentAccount, setCurrentAccount] = useState('')
    const checkIfWalletConnected = async ()=>{
        if(!ethereum){
            console.log(ethereum)

            return alert('please install metamask')
            
        }
        const accounts = await ethereum.request({method:'eth_accounts'})
        console.log(accounts)

    }

    const connectWallet = async ()=>{
        try{

            if(!ethereum) return alert('no metamask')
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
            console.log(accounts)
            console.log('connect wallet method reached')
        }catch(error){
            console.log(error)
            throw new Error('no etherium object ')

        }
    }

    const sendTransaction =async  ()=>{
        try{

            if(!ethereum) return alert('Please install meta mask')
            const {addressTo, amount, message, keyword} = formData;
            console.log(formData)
            const transactionContract = getEtheriumContract()
            const parsedEther = ethers.utils.parseEther(amount)
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedEther._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedEther, message, keyword)
            setisLoadin(true)
            console.log(`loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setisLoadin(false)
            console.log(`Success - ${transactionHash.hash}`)
            const transactionCount = await transactionContract.getTransactionCount();
            settransactionCount(transactionCount.toNumber())
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
      checkIfWalletConnected();
    
    }, [])
    
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, handleChange, formData, setformData, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}