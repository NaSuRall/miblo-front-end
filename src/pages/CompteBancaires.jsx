import React, { useEffect } from 'react'
import '../index.css'
import BankAccountList from '../components/BankAccount/BankAccountListe'


function bankAccount() {


  return (
    <main className="flex flex-row w-full h-screen p-3 gap-5 " style={{backgroundColor: "var(--background-color)"}}>
        <div className='flex flex-col w-[15%] h-full  items-center justify-center rounded-xl' style={{backgroundColor: "var(--bacground-card)"}}>
            <h2 className='' style={{color: "var(--text-color)"}}>Navbar</h2>
        </div>

        <div className='flex flex-col w-full h-full rounded-xl p-3' style={{backgroundColor: "var(--bacground-card)"}}>
            <BankAccountList />
        </div>
    </main>
  )
}

export default bankAccount
