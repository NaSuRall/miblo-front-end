import TransactionMakeForm from "../components/TransactionMakeForm.jsx";
import React from "react";
import '../index.css'

function Transaction() {
    return (
        <main className="flex flex-row w-full h-screen p-3 gap-5 " style={{backgroundColor: "var(--background-color)"}}>
            <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 overflow-scroll' style={{backgroundColor: "var(--bacground-card)"}}>
                <TransactionMakeForm />
            </div>
        </main>
    )
}

export default Transaction;