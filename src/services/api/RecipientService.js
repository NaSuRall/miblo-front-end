export default async function showRecipients(user_id) {
    const res = await fetch(`http://127.0.0.1:8000/show/recipients/${user_id}`);
    if (!res.ok) throw new Error("Erreur API");
    return await res.json();
}