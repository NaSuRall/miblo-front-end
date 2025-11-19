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
        <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3 ' style={{backgroundColor: "var(--bacground-card)"}}>
            <div className='flex flex-col w-full p-6 '>
              <AddAccountButton accounts={accounts} />
            </div>
            <BankAccountList accounts={accounts} />
        </div>
  )
}

export default bankAccount
