import { useState, useEffect } from "react";
import RecipientForm from "../components/RecipientForm.jsx";
import RecipientList from "../components/RecipientList.jsx";
import showRecipients from "../services/api/RecipientService.js";
import "../index.css";

export default function Recipient() {
    const [recipientList, setRecipientList] = useState([]);

    async function loadRecipients() {
        try {
            const data = await showRecipients(1);
            setRecipientList(data);
        } catch (err) {
            console.error("Erreur lors du chargement :", err);
        }
    }

    useEffect(() => {
        loadRecipients();
    }, []);

    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-3xl font-bold">Mes bénéficiaires</h1>
            <RecipientForm userId={1} onRecipientAdded={loadRecipients}/>
            <RecipientList recipientList={recipientList} />
        </div>
    );
}
