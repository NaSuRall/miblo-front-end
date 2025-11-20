import { EllipsisVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { Users, Landmark, Eye, EyeOff, CircleSmall } from "lucide-react";
import Button from "../Form/Button";
import {closeBankAccount} from "../../services/api/bankAccountService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function BankAccountItem({ account, index }) {
  console.log("Account in BankAccountItem:", account);
  const [isOpen, setIsOpen] = useState(false);
  const [blind, setBlind] = useState(true);


  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  console.log("Decoded Token:", decodedToken);

  return (
    <div className="flex flex-row  w-full justify-between p-2  rounded-lg">
      <div className="flex flex-row  w-full p-5 rounded-xl gap-2 justify-between" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="flex flex-col">
          <h3 className="text-sm flex flex-row items-center gap-2"style={{color: "var(--color-gray)"}} ><Landmark size={15}/>Compte n° {account.is_primary ? "1" : index + 2}</h3>
          <p className="text-sm flex flex-row items-center gap-2" style={{color: "var(--color-gray)"}}><Users size={15}/>{decodedToken.name}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Button
            onClick={() => setBlind(!blind)}
            children={<>{blind ? "FR-76***********************" : account.rib}{blind ? <Eye /> : <EyeOff />}</>}
            className={"text-sm flex flex-row items-center justify-center text-center gap-2"}
          />
        </div>

        <div className="flex flex-row items-center gap-5">
          <p className="text-sm py-2 px-5 rounded-xl border" style={{ backgroundColor: "var(--color-bg-green)", borderColor: "var(--color-border-green)", color: "var(--color-text-green)" }}>+{account.solde}€</p>

          <button onClick={() => setIsOpen(true)} className="flex items-center justify-center p-2 rounded-full cursor-pointer">
            <EllipsisVertical />
          </button>
          {isOpen ? (
            <div className="fixed flex justify-end">
              <div className="absolute top-0 -right-85 bg-white border rounded-lg shadow-lg z-10">
                <ul className="flex flex-col p-4 relative">
                  <button className="flex justify-end absolute right-4 top-2 cursor-pointer text-red-500" onClick={() => setIsOpen(false)}>X</button>
                  <li style={{ color: "var(--color-gray)" }} className="p-2 cursor-pointer" onClick={() => setIsOpen(false)}>Voir les transactions</li>
                  <li style={{ color: "var(--color-gray)" }} className="p-2 cursor-pointer" onClick={() => setIsOpen(false)}>Faire une Transaction</li>
                  <li

                    className="p-2 cursor-pointer border-t-1 rounded-lg"
                    style={{ color: "var(--text-color)", backgroundColor: "var(--color-bg-red-bytton)", borderColor: "var(--color-border-red-button)" }}
                    onClick={() => {
                      if (window.confirm("Es-tu sûr de vouloir clôturer ce compte ?")) {
                        closeBankAccount(account.id);
                        window.location.reload();
                      }
                    }}>Cloturer le compte</li>
                </ul>
              </div>
            </div>
          ) : null}

        </div>
      </div>

    </div>

  );
}
