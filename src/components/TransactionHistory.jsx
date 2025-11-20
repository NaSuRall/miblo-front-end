import { useState, useEffect } from "react";
import "../index.css";
import {getTransactionList} from "../services/api/transactionService.js";
import TransactionsList from "./TransactionsList.jsx";
import {getBankAccounts} from "../services/api/bankAccountService.js";

export default function TransactionHistory({accountId, origineAccountRib}) {
    const[transactionList, setTransactionList] = useState([]);
    const [destinataireRib, setDestinataireRib] = useState([]);

    useEffect(() => {
        async function load(){
            if (!accountId) return;
            try{
                const transactions = await getTransactionList(accountId, 1);
                setTransactionList(transactions);
                const destinatairesRibs = await Promise.all(
                    transactions.map(async (t) => {
                        const comptes = await getBankAccounts(t.id_compteB); // tableau
                        const ribCompte = comptes.find(c => c.id === t.id_compteB)?.rib;
                        return { id: t.id_compteB, rib: ribCompte };
                    })
                );
                setDestinataireRib(destinatairesRibs);

                console.log("transactions loaded", transactions);
            }
            catch(e){
                console.error(e);
            }
        }
        load();
    },[accountId]);

    return (
        <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3'>
            <h1>Historique des transactions</h1>
            <div>
                <TransactionsList transactions={transactionList} origineAccountRib={origineAccountRib} destinataireAccountRib={destinataireRib} />
            </div>
        </div>
    )
}