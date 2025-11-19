import FormDepoMoney from "../components/FormDepoMoney.jsx";
import React from "react";
import '../index.css'

function DepositMoney() {
    return (
            <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 overflow-scroll' style={{backgroundColor: "var(--bacground-card)"}}>
                <FormDepoMoney/>
            </div>
    )
}

export default DepositMoney;