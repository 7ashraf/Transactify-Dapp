import React, {useEffect, useState} from "react";
import { ethers } from "ethers";

import { contractABI, constractAdress } from "../utils/cons";

export const TransactioContext = React.createContext();

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
    const [connectedAccount, setconnectedAccount] = useState('')
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
            setconnectedAccount(accounts[0])
        }catch(error){
            console.log(error)
            throw new Error('no etherium object ')

        }
    }
    useEffect(() => {
      checkIfWalletConnected();
    
    }, [])
    
    return(
        <TransactioContext.Provider value={{connectWallet}}>
            {children}
        </TransactioContext.Provider>
    )
}