import React from 'react'
import { addBankAccount } from "../../services/api/bankAccountService";
import { useEffect, useState } from "react";

function AddAccountButton() {

  return (
    <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={async () => {
        try {
            const data = await addBankAccount(1);   // remplacez 1 par l'ID utilisateur connecter
            console.log("Creation du compte banquaire", data);
          } catch (e) {
            console.error("Erreur :", e);
          }
    }}>
      Ajouter un compte bancaire
    </button>
  )
}

export default AddAccountButton
