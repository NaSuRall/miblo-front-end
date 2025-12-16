import TransactionMakeForm from "../components/Transactions/TransactionMakeForm.jsx";
import TransactionHistory from "../components/Transactions/TransactionHistory.jsx";
import React, { useState } from "react";
import '../index.css'

function Transaction() {
    const [setSelectedAccountId] = useState(null);
    const [setOrigineAccountRib] = useState(null);


    return (
        <main className="flex flex-col w-full h-full  gap-5 " style={{backgroundColor: "var(--background-color)"}}>
            <div className='flex flex-col w-full rounded-xl p-3 ' style={{backgroundColor: "var(--bacground-card)"}}>
                <TransactionMakeForm onAccountChange={setSelectedAccountId} origineAccountRib={setOrigineAccountRib} />
            </div>
            <div className='flex flex-col items-center justify-center w-full h-full overflow-scroll rounded-xl p-3 ' style={{backgroundColor: "var(--bacground-card)"}}>
                <TransactionHistory  />
            </div> 
        </main>
    )
}

export default Transaction;