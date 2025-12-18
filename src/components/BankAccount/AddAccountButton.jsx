import React from 'react'
import { addBankAccount } from "../../services/api/bankAccountService";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import  getIdFromToken  from '../../services/getIdFromToken';


function AddAccountButton({accounts}) {

    const activeCount = accounts.filter(a => !a.is_closed).length;
    const disabled = activeCount >= 5;
    const token = localStorage.getItem("token");
    const userId = getIdFromToken(token);


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
            globalThis.confirm("Es-tu sûr de vouloir créer un nouveau compte ?");
            await addBankAccount(userId);   // remplacez 1 par l'ID utilisateur connecter
            globalThis.location.reload();

        } catch (e) {
            console.error("Erreur :", e);
          }
    }}>
       <Plus size={20}/>
      Ajouter un compte

    </button>
  )
}

AddAccountButton.propTypes = {
    accounts: PropTypes.arrayOf(
        PropTypes.shape({
            is_closed: PropTypes.bool.isRequired,
        })
    ).isRequired,
};


export default AddAccountButton
