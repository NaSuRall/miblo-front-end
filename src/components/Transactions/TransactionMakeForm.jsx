import { useState, useEffect } from "react";
import "../../index.css";
import { getBankAccounts } from "../../services/api/bankAccountService.js";
import {getAccountByRib, transactionService } from "../../services/api/transactionService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getIdFromToken from "../../services/getIdFromToken.js";
import {MoveRight, Send} from "lucide-react";
import PropTypes from "prop-types";

function TransactionMakeForm({onAccountChange , origineAccountRib}) {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [rib, setRib] = useState("");
    const token = localStorage.getItem("token");
    const userId = getIdFromToken(token);


    const [formData, setFormData] = useState({
        id_compteA: 0,
        id_compteB: 0,
        amout: "",
    });

    useEffect(() => {
        const loadBankAccounts = async () => {
            const data = await getBankAccounts(userId);
            setBankAccounts(data);
        };
        loadBankAccounts();
    }, []);

    useEffect(() => {
        if (bankAccounts.length > 0 && !formData.id_compteA) {
            const firstId = bankAccounts[0].id;

            setFormData(prev => ({
                ...prev,
                id_compteA: firstId
            }));

            onAccountChange(firstId);
            origineAccountRib(bankAccounts[0].rib);
        }
    }, [bankAccounts]);


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

        const amountNumber = Number(formData.amout);

        if (formData.amout.trim() === "" || Number.isNaN(amountNumber)) {
            toast.error("Veuillez entrer un montant valide.")
            return;
        }
        if (amountNumber <= 0) {
            toast.error("Le montant doit être supérieur à 0.");
            return;
        }

        if (!formData.id_compteA) {
            toast.error("Veuillez selectionner un compte source.");
            return;
        }

        if (!formData.id_compteB) {
            toast.error("RIB invalide.");
            return;
        }

        try {
            const data = await transactionService(formData);
        
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form className=" w-full flex flex-col gap-5 h-full"  onSubmit={handleSubmit} >
            <h2 className="flex flex-row justify-start items-center text-black">Crée une transaction</h2>
            <div className="flex flex-row justify-around gap-5">
                <div className="flex flex-row items-center justify-center">
                    <select className="px-4 py-2 rounded-lg text-xl"
                            id="accountChoice"
                            name="compteId"
                            value={formData.id_compteA}
                            style={{backgroundColor: "var(--background-color)"}}
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                setFormData({
                                    ...formData,
                                    id_compteA: id
                                });
                                onAccountChange(id);
                                const selectedAccount = bankAccounts.find(acc => acc.id === id);
                                if (selectedAccount) {
                                    origineAccountRib(selectedAccount.rib);
                                }
                            }}
                    >
                        {bankAccounts
                        .filter((item) => item.is_closed === false)
                        .map((account, index)  => (
                            <option key={account.id} value={account.id}>
                                Compte n°{index+1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-center">
                    <MoveRight />
                </div>
                <div className="flex flex-row items-center  gap-10 m-3 text-xl">
                    <input
                        className="outline-none text-center border-b-1 "
                        type="text"
                        placeholder="RIB du compte destinataire"
                        value={rib}
                        onChange={handleRibChange}
                    />
                    <div className="flex items-center justify-center">
                        <MoveRight />
                    </div>
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
                    <div className="flex items-center justify-center">
                        <MoveRight />
                    </div>
                    <button className="flex flex-row gap-2 p-2 items-center rounded-lg text-xl " style={{backgroundColor: "var(--background-color)"}} type="submit">Effectuer <Send size={20} /></button>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
        </form>
    );
}

TransactionMakeForm.propTypes = {
    onAccountChange: PropTypes.func.isRequired,
    origineAccountRib: PropTypes.func.isRequired,

}

export default TransactionMakeForm;