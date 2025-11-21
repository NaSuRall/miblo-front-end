import { useState, useEffect } from "react";
import RecipientForm from "../components/RecipientForm.jsx";
import RecipientList from "../components/RecipientList.jsx";
import showRecipients from "../services/api/RecipientService.js";
import "../index.css";
import getIdFromToken from "../services/getIdFromToken.js";

export default function Recipient() {
    const [recipientList, setRecipientList] = useState([]);

    async function loadRecipients() {
        try {
            const token = localStorage.getItem("token");
            const userId = getIdFromToken(token);
            const data = await showRecipients(userId);
            setRecipientList(data);
        } catch (err) {
            console.error("Erreur lors du chargement :", err);
        }
    }

    useEffect(() => {
        loadRecipients();
    }, []);

    return (
        <div className="flex flex-col items-center p-4 gap-6 rounded-lg" style={{backgroundColor: "var(--background-color)"}}>
            <h1 className="text-3xl font-bold">Mes bénéficiaires</h1>
            <RecipientForm userId={1} onRecipientAdded={loadRecipients}/>
            <RecipientList recipientList={recipientList} />
        </div>
    );
}
