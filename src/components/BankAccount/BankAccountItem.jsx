import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function BankAccountItem({ account, index }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row  w-full justify-between p-2  rounded-lg">
      <div className="flex flex-row  w-full p-5 rounded-xl gap-2 justify-between" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="flex flex-col">
          <h3 className="text-sm"style={{color: "var(--color-gray)"}} >Compte n° {account.is_primary ? "1" : index + 2}</h3>
          <p className="text-sm" style={{color: "var(--color-gray)"}}>RIB: {account.rib}</p>
          <p className="text-sm" style={{color: "var(--color-gray)"}}>Romain Poulain</p>
        </div>
        <div className="flex flex-row items-center gap-5">
          <p className="text-sm py-2 px-5 rounded-xl border" style={{backgroundColor: "var(--color-bg-green)", borderColor: "var(--color-border-green)", color: "var(--color-text-green)"}}>+{account.solde}</p>
          
          <button onClick={() => setIsOpen(true)} className="flex items-center justify-center p-2 rounded-full cursor-pointer">
            <EllipsisVertical />
          </button>
            {isOpen ? (
              <div className="relative self-start">
                <div className="absolute top-0 -right-60 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="flex flex-col p-4 relative">
                    <button className="flex justify-end absolute right-4 text-red-500" onClick={() => setIsOpen(false)}>X</button>
                    <li className="p-2 cursor-pointer" onClick={() => setIsOpen(false)}>Voir les détails</li>
                    <li className="p-2 cursor-pointer" onClick={() => setIsOpen(false)}>Faire un virement</li>
                    <li className="p-2 cursor-pointer" onClick={() => setIsOpen(false)}>Paramètres du compte</li>
                  </ul>
                </div>
              </div>
            ) : null}

        </div>
      </div>

    </div>

  );
}
