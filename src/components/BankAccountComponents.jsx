import React from 'react'
import '../index.css'
import { useEffect, useState } from 'react'

function BankAccountComponents() 
{const [BankAccountData, setBankAccountData] = useState([]);
  
  useEffect(() => {
    const loadBankAccount = async () => {
      try {
        const res = await fetch("http://0.0.0.0:8000/bank/account/1");
        const data = await res.json();
        setBankAccountData(data);
      } catch (e) {
        console.log('non no no')
      } 
    };
    loadBankAccount();
  }, [])

  return (
          <>
          {BankAccountData.map((b) => (
              <div key={b.id} className='m-5 p-5 border rounded-lg' style={{backgroundColor: "var(--background-color)"}}>
                <h3 className='text-black'>Account Number: {b.is_primary ? '1' : '0'}</h3>
                <p className='text-black'>Solde: {b.solde}</p>
                <p className='text-black'>rib: {b.rib}</p>
              </div>
            ))}
          </>
  )
}
export default BankAccountComponents
