import { useEffect, useState } from "react";
import { getBankAccounts } from "../../services/api/bankAccountService"; // ici l'appelle de l'api la methode que l'on souhaite
import BankAccountItem from "./BankAccountItem"; 

export default function BankAccountList() {
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
    <div className="flex flex-col w-[70%] h-full p-4">
      <div className="flex  mb-5">
        <span className="text-xl" style={{color: "var(--text-color)"}}>Compte Courant</span>
      </div>
      {accounts
      .filter((item) => item.is_primary === true)
      .map((item) => (
        <BankAccountItem key={item.id} account={item} />
      ))}
      <div className="flex  mb-5 mt-10">
        <span className="text-xl" style={{color: "var(--text-color)"}}>Autres Comptes</span>
      </div>
      {accounts
      .filter((item) => item.is_primary === false)
      .map((item, index) => (
        <BankAccountItem key={item.id} account={item} index={index} />
      ))}
    </div>
  );
}
