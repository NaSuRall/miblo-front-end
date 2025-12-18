import { useState, useEffect } from "react";
import "../index.css";
import showRecipients from "../services/api/RecipientService.js";
import RecipientList from "../components/RecipientList.jsx";
import getIdFromToken from "../services/getIdFromToken.js";

export function RecipientShow(){
    const[recipientList, setRecipientList] = useState([]);

    useEffect(() => {
        async function load(){
            try{
                const token = localStorage.getItem("token");
                const userId = getIdFromToken(token);
                const recipients = await showRecipients(userId);
                setRecipientList(recipients);
            }
            catch(e){
                console.error(e);
            }
        }
        load();
    }, []);


    return (
        <div className='flex flex-col items-center justify-center w-full h-full rounded-xl p-3'>
            <h1>Bénéficiaires</h1>
            <div>
                <RecipientList recipientList = {recipientList} />
            </div>
        </div>
    )
}