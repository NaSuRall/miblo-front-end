export default async function getTransactionsAccount(account_id, user_id) {
    const res = await fetch(`http://127.0.0.1:8000/transactions/${account_id}/${user_id}`);
    console.log(res);
    if (!res.ok) throw new Error("Erreur API");
    console.log(res);
    return await res.json();

}