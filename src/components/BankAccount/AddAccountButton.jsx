import React from 'react'
import { addBankAccount } from "../../services/api/bankAccountService";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
function AddAccountButton({count}) {

    const disabled = count >= 5;


  return (
    <button className="flex absolute right-15 top-10 flex-row items-center justify-center cursor-pointer gap-2 border px-4 py-2 z-2 text-sm rounded-lg 
      transition duration-200 hover:bg-green-600 hover:text-white hover:border-green-700"
      style={{
      backgroundColor: "var(--color-bg-button-green)",
      color: "var(--text-color)",
      borderColor: "var(--color-border-green)"
      }}
    onClick={async () => {
        try {
            if (disabled) {
            alert("Vous avez atteint le maximum de comptes bancaires.");
            return;
          }
            alert("Création d'un nouveau compte bancaire !");
            const data = await addBankAccount(1);   // remplacez 1 par l'ID utilisateur connecter
            console.log("Creation du compte banquaire", data);
          } catch (e) {
            console.error("Erreur :", e);
          }
    }}>
       <Plus size={20}/>
      Ajouter un compte
     
    </button>
  )
}

export default AddAccountButton
