import React, { useEffect, useState } from 'react'
import '../index.css'
import BankAccountList from '../components/BankAccount/BankAccountListe'
import AddAccountButton from '../components/BankAccount/AddAccountButton'
import { getBankAccounts } from "../services/api/bankAccountService";

function bankAccount() {

    const [accounts, setAccounts] = useState([]);
  
    useEffect(() => {
      async function load() {
        try {
          const data = await getBankAccounts(1); // j'ai mis 1 pour l'id mais remplace pas l'auth id 
          setAccounts(data);
          console.log("Données des comptes bancaires :", data);
        } catch (e) {
          console.error("Erreur :", e);
        }
      }
      load();
    }, []); 

  return (
    <main className="flex flex-row w-full h-screen  gap-5 p-3 " style={{backgroundColor: "var(--background-color)"}}>
        <div className='flex flex-col w-[15%] h-full  items-center justify-center rounded-xl' style={{backgroundColor: "var(--bacground-card)"}}>
            <h2 className='' style={{color: "var(--text-color)"}}>Navbar</h2>
        </div>

        <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 overflow-scroll' style={{backgroundColor: "var(--bacground-card)"}}>
            
            <div className='flex flex-col w-full p-6 '>
              <AddAccountButton  
                accounts={accounts}
                
              />
            </div>

            <BankAccountList accounts={accounts} />
        </div>
    </main>
  )
}

export default bankAccount
