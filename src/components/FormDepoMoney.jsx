import { useState } from "react";

function FormDepoMoney({ onSubmit }) {
    const [amount, setAmount] = useState("");

    const handleSubmit = (formData) => {

        const data = formData;
        console.log("handleSubmit", data);
        if (onSubmit) {
            onSubmit(Number(amount));
        }
    };

    return (
        <form action={handleSubmit}>
            <label htmlFor="depoMoney">Montant du dépôt :</label>

            <input
                id="depoMoney"
                type="number"
                name="depoMoney"
                value={amount}
                min="0"
                onChange={(e) => setAmount(e.target.value)}
            />

            <button type="submit">Déposer</button>
        </form>
    );
}

export default FormDepoMoney;
