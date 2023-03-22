import React, {useEffect, useState} from "react";
import { ethers } from "ethers";

import { contractABI, constractAdress } from "../utils/cons";

export const TransactionContext = React.createContext();

const {ethereum} = window

const getEtheriumContract = () => {
  
    const provider = new ethers.providers.Web3Provider(window.etherium)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(constractAdress, contractABI, signer)
    console.log({
      provider,
      signer
    })
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const checkIfWalletConnected = async ()=>{
        if(window.ethereum && window.ethereum.isMetaMask)
        console.log('yea ')
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
    useEffect(() => {
      checkIfWalletConnected();
    
    }, [])
    
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TransactionContext.Provider>
    )
}