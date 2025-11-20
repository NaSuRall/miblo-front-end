import { useEffect, useState } from "react";
import { getBankAccounts } from "../../services/api/bankAccountService"; // ici l'appelle de l'api la methode que l'on souhaite
import BankAccountItem from "./BankAccountItem"; 
import { Facebook } from "lucide-react";

export default function BankAccountList({accounts}) {

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
      .filter((item, index) => item.is_primary === false)
      .filter((item) => item.is_closed === false)
      .slice(0, 5)
      .map((item, index) => (
        <BankAccountItem key={item.id} account={item} index={index} />
      ))}
    </div>
  );
}
