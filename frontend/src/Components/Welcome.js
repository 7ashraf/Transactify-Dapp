
import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import  Loader  from "./Loader";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


const Input = ({ placeholder, name, type, value, handleSubmit, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm white-glassmorphism"
    />
  );


const Welcome = ()=>{
    const {connectWallet, currentAccount, handleChange, formData, sendTransaction, setFormData} = useContext(TransactionContext);
    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
        
        e.preventDefault();
    
        if (!addressTo || !amount || !keyword || !message) return;
    
        sendTransaction();
      };
    

    return(
        <div className="flex w-full justify-center items-center">
            {currentAccount && <h1>Connected</h1>}
        <button
        type="button"
        onClick={connectWallet}
        className="content-center flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
      >
        <AiFillPlayCircle className="text-white mr-2" />
        <p className="text-white text-base font-semibold">
          Connect Wallet
        </p>
      </button>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input placeholder="Address To" name="addressTo" type="text"  handleChange={handleChange} />
        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {false
        ? <Loader />
        : (
            <button
            type="button"
            onClick={handleSubmit}
            className="text-black w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
            Send now
            </button>
        )}
        </div>
            </div>

    )
}

export default Welcome;
