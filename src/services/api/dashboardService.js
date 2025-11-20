export default async function getTransactionsAccount(compte_id, user_id) {
    const res = await fetch(`http://127.0.0.1:8000/Transactions/${compte_id}/${user_id}`);
    if (!res.ok) throw new Error("Erreur API");
    console.log(res);
    return await res.json();

}