import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers'
import { useState, useEffect, useContext } from 'react';
import { constractAdress, contractABI } from './utils/cons';
import { TransactioContext } from './context/TransactionContext';


function App() {
const {connectedWallet} = useContext(TransactioContext);
console.log(connectedWallet)
  
  
  
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}



export default App;
