import { useState, useEffect } from "react";
import "../index.css";
import { getBankAccounts } from "../services/api/bankAccountService.js";
import {getAccountByRib, transactionService} from "../services/api/transactionService.js";

function TransactionMakeForm() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [rib, setRib] = useState(""); // <-- manquait !

    const [formData, setFormData] = useState({
        id_compteA: 0,
        id_compteB: 0,
        amout: "",
    });

    useEffect(() => {
        const loadBankAccounts = async () => {
            const data = await getBankAccounts(1);
            setBankAccounts(data);
        };
        loadBankAccounts();
    }, []);

    useEffect(() => {
        async function fetchAccountB() {
            if (rib.trim() === "") return;

            try {
                const account = await getAccountByRib(rib);
                setFormData((prev) => ({
                    ...prev,
                    id_compteB: account.id,
                }));
            } catch {
                setErrorMsg("RIB invalide ou compte introuvable.");
                setFormData((prev) => ({ ...prev, id_compteB: 0 }));
            }
        }

        fetchAccountB();
    }, [rib]);


    const handleAmountChange = (e) => {
        setFormData({
            ...formData,
            amout: e.target.value,
        });
    };

    const handleRibChange = (e) => {
        setRib(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const amountNumber = Number(formData.amout);

        if (formData.amout.trim() === "" || isNaN(amountNumber)) {
            setErrorMsg("Veuillez entrer un montant valide.");
            return;
        }
        if (amountNumber <= 0) {
            setErrorMsg("Le montant doit être supérieur à 0.");
            return;
        }

        if (!formData.id_compteA) {
            setErrorMsg("Veuillez selectionner un compte source.");
            return;
        }

        if (!formData.id_compteB) {
            setErrorMsg("RIB invalide.");
            return;
        }

        try {
            const data = await transactionService(formData);
            console.log("Réponse API :", data);
            setErrorMsg(data.message);
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <form className="h-10/12 w-10/12 flex flex-col items-center justify-center rounded-xl gap-10" style={{backgroundColor: "var(--background-color)"} } onSubmit={handleSubmit} >
            <h1 className="text-6xl">Transaction</h1>
            <select className="border-3 border-gray-400/50 p-2 rounded-xl text-3xl"
                    id="accountChoice"
                    name="compteId"
                    value={formData.compteId}
                    onChange={(e) =>
                        setFormData({ ...formData, id_compteA: Number(e.target.value) })
                    }
            >
                {bankAccounts.map((account, index)  => (
                    <option key={account.id} value={account.id}>
                        Compte n°{index+1}
                    </option>
                ))}
            </select>

            <div className="flex flex-col items-center justify-center gap-10 m-3 text-6xl">
                <input
                    type="text"
                    placeholder="RIB du compte destinataire"
                    value={rib}
                    onChange={handleRibChange}
                />

                <div className="flex flex-row w-full items-center justify-center h-1/2">
                    <input className="relative w-1/2 border-b-1 text-center outline-none"
                           id="depoMoney"
                           placeholder="€"
                           type="text"
                           value={formData.amout}
                           onChange={handleAmountChange}
                           name="amout"
                    />
                </div>

                {errorMsg && (
                    <p className="text-red-600 text-sm absolute z-10 bg-white p-3">
                        {errorMsg}
                    </p>
                )}

                <button className="border-3 border-gray-400/50 p-2 rounded-xl text-3xl" type="submit">Effectuer</button>
            </div>
        </form>
    );
}

export default TransactionMakeForm;