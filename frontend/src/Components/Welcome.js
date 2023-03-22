import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AiFillPlayCircle } from "react-icons/ai";


const Welcome = ()=>{
    const {connectWallet, currentAccount} = useContext(TransactionContext);

    return(
        <div className="flex flex-row justify-center content-center	">
        
            <h1>Welcome!</h1>
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
      </div>
    )
}

export default Welcome;
