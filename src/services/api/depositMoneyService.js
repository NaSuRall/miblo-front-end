export async function depositMoneyService(formData) {
    const res = await fetch(`http://127.0.0.1:8000/depositMoney`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.detail || "Erreur inconnue");
    }
    return data;
}