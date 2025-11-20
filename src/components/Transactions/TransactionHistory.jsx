import { useState, useEffect } from "react";
import "../../index.css";
import {getTransactionList} from "../../services/api/transactionService.js";
import TransactionsList from "./TransactionsList.jsx";
import {getBankAccounts} from "../../services/api/bankAccountService.js";
import getIdFromToken from "../../services/getIdFromToken.js";

export default function TransactionHistory() {

    const token = localStorage.getItem("token");
    const userId = getIdFromToken(token);
    



    return (
        <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3'>
            <h1>Historique des transactions</h1>
            <div>
                
            </div>
        </div>
    )
}