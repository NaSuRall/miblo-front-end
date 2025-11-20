import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TransactionDetail() {
    // Récupere id de la transaction
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                // Apele api
                const response = await fetch(`http://localhost:8000/showTransaction/${id}`);
                const data = await response.json();

                if (response.status !== 200 || data["Cette transaction n'existe pas"]) {
                    toast.error("Transaction introuvable ou accès interdit");
                    navigate(-1);
                    return;
                }

                setTransaction(data);
            } catch (e) {
                toast.error("Erreur lors du chargement de la transaction");
                navigate(-1);
            }
        }
        load();
    }, [id]);

    if (!transaction) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <main className="flex flex-col items-center justify-start w-full min-h-screen p-6 gap-6" style={{ backgroundColor: "var(--background-color)" }}>
            <div className="flex flex-col w-full max-w-4xl p-6 rounded-xl shadow-md" style={{ backgroundColor: "var(--bacground-card)" }}>
                <h1 className="text-4xl font-bold mb-4">Détail de la transaction</h1>

                <div className="flex flex-col gap-3 text-xl">
                    <p><span className="font-semibold">Montant :</span> {transaction["Montant de la transaction"]} €</p>
                    <p><span className="font-semibold">Compte source :</span> {transaction["RIB du compte envoyeur"]} ({transaction["Nom du compte envoyeur"]})</p>
                    <p><span className="font-semibold">Compte destinataire :</span> {transaction["RIB du compte qui recoit"]} ({transaction["Nom du compte qui recoit"]})</p>
                </div>

                <button
                    className="mt-6 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors text-lg font-medium"
                    onClick={() => navigate(-1)}
                >
                    Retour
                </button>
            </div>
        </main>
    );
}
