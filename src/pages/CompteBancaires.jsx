import React, { useEffect, useState } from 'react'
import '../index.css'
import BankAccountList from '../components/BankAccount/BankAccountListe'
import AddAccountButton from '../components/BankAccount/AddAccountButton'
import { getBankAccounts } from "../services/api/bankAccountService";
import  getIdFromToken  from '../services/getIdFromToken';


function BankAccount() {

    const [accounts, setAccounts] = useState([]);
    const token = localStorage.getItem("token");
    const userId = getIdFromToken(token);
    console.log("User ID extrait du token :", userId);
  
    useEffect(() => {
      async function load() {
        try {
          const data = await getBankAccounts(userId); 
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

export default BankAccount
