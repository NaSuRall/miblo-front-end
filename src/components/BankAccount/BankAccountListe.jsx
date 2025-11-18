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
      } catch (e) {
        console.error("Erreur :", e);
      }
    }
    load();
  }, []);

  return (
    <>
      {accounts.map((item) => (
        <BankAccountItem key={item.id} account={item} />
      ))}
    </>
  );
}
