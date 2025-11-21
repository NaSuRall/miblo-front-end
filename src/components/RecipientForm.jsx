import { useState } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecipientForm({ userId, onRecipientAdded }) {
    const [rib, setRib] = useState("");
    const [name, setName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!rib || !name) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/createRecipient/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        rib: rib,
                        recipient_name: name
                    })
                }
            );
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
                return;
            }

            toast.success("Bénéficiaire ajouté avec succès !");
            setRib("");
            setName("");

            //raffraichit la liste des destinataire
            if (onRecipientAdded) onRecipientAdded();
        }
        catch (e) {
            console.error(e);
            toast.error("Erreur lors de l'ajout du bénéficiaire.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-4 shadow-lg rounded-xl flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold mb-2">Ajouter un bénéficiaire</h2>

            <div className="flex flex-col gap-1">
                <label>RIB du bénéficiaire</label>
                <input
                    type="text"
                    value={rib}
                    onChange={(e) => setRib(e.target.value)}
                    className="p-2 border rounded-lg outline-none focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label>Nom du bénéficiaire</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du bénéficiaire"
                    className="p-2 border rounded-lg outline-none focus:outline-none"
                />
            </div>

            <button type="submit" className="p-2 rounded-lg" style={{backgroundColor: "var(--color-bg-button-green)", color: "var(--color-text-green)", borderColor: "var(--color-border-green)"}}>Ajouter</button>

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
