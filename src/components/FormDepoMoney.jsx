import { useState, useEffect } from "react";
import '../index.css'
import {ArrowBigDownDash} from "lucide-react"
import {getBankAccounts} from "../services/api/bankAccountService.js";
import {depositMoneyService} from "../services/api/depositMoneyService.js";

function FormDepoMoney() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const loadBankAccounts = async () => {
            const data = await getBankAccounts(1);
            setBankAccounts(data);
        };
        loadBankAccounts();
    }, []);

    const [formData, setFormData] = useState({
        compteId: "",
        amout: "",

    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            amout: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const amountNumber = Number(formData.amout);

        if (formData.amout.trim() === "" || isNaN(amountNumber)) {
            setErrorMsg("Veuillez entrer un nombre valide.");
            return;
        }

        if (amountNumber <= 0) {
            setErrorMsg("Le montant doit être supérieur à 0.");
            return;
        }

        if (!formData.compteId) {
            setErrorMsg("Veuillez sélectionner un compte.");
            return;
        }
        try {
            const data = await depositMoneyService(formData);
            console.log("Réponse API :", data);

        } catch (error) {
            console.error("Erreur :", error);
            setErrorMsg(error.message);
        }
    };


    return (
        <form className="h-10/12 w-10/12 flex flex-col items-center justify-center rounded-xl gap-10" style={{backgroundColor: "var(--background-color)"}} onSubmit={handleSubmit} >
            <h1 className="text-6xl">Dépo</h1>
            <select className="border-3 border-gray-400/50 p-2 rounded-xl text-3xl"
                id="accountChoice"
                name="compteId"
                value={formData.compteId}
                onChange={(e) =>
                    setFormData({ ...formData, compteId: Number(e.target.value) })
                }
            >
                {bankAccounts.map((account, index)  => (
                    <option key={account.id} value={account.id}>
                        Compte n°{index+1}
                    </option>
                ))}
            </select>
                <ArrowBigDownDash size={50}/>



            <div className="depoDiv flex flex-col items-center justify-center gap-10 m-3 text-6xl">
                <div className="flex flex-row w-full items-center justify-center h-1/2">
                    <input className="relative w-1/2 border-b-1 text-center outline-none"
                           id="depoMoney"
                           placeholder="€"
                           type="text"
                           value={formData.amout}
                           onChange={handleChange}
                           name="amout"
                    />
                </div>
                <ArrowBigDownDash size={50}/>

                {errorMsg && (
                    <p className="text-red-600 text-sm absolute z-10 bg-white p-3">
                        {errorMsg}
                    </p>
                )}

            <button className="border-3 border-gray-400/50 p-2 rounded-xl text-3xl" type="submit">Déposer</button>
            </div>
        </form>
    );
}

export default FormDepoMoney;
