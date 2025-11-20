export async function transactionService(formData) {
    const res = await fetch(`http://127.0.0.1:8000/createTransaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            amout: Number(formData.amout),
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        const message = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
        throw new Error(message);
    }

    return data;
}
export async function getAccountByRib(rib) {
    const res = await fetch(`http://127.0.0.1:8000/bank/account-by-rib/${rib}`);
    if (!res.ok) throw new Error("Erreur API");
    return await res.json();
}

export async function getTransactionList(accountId, userId) {
    const response = await fetch(`http://localhost:8000/Transactions/${accountId}/${userId}`);
    const text = await response.text();
    return JSON.parse(text);
}