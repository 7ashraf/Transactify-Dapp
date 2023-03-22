import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers'
import { useState, useEffect, useContext } from 'react';
import { constractAdress, contractABI } from './utils/cons';
import { TransactionContext } from './context/TransactionContext';
import Welcome from './Components/Welcome'


function App() {

  
  return (
    <div className="App">
      <Welcome />
    </div>
  );
}



export default App;
