import TransactionMakeForm from "../components/TransactionMakeForm.jsx";
import TransactionHistory from "../components/TransactionHistory.jsx";
import React, { useState } from "react";
import '../index.css'

function Transaction() {
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [origineAccountRib, setOrigineAccountRib] = useState(null);


    return (
        <main className="flex flex-row w-full h-screen p-3 gap-5 " style={{backgroundColor: "var(--background-color)"}}>
            <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 overflow-scroll' style={{backgroundColor: "var(--bacground-card)"}}>
                <TransactionMakeForm onAccountChange={setSelectedAccountId} origineAccountRib={setOrigineAccountRib} />
            </div>
            <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 overflow-scroll' style={{backgroundColor: "var(--bacground-card)"}}>
                <TransactionHistory accountId={selectedAccountId} origineAccountRib={origineAccountRib} />
            </div>
        </main>
    )
}

export default Transaction;