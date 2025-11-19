export async function getBankAccounts(userId) {
  const res = await fetch(`http://127.0.0.1:8000/bank/account/${userId}`);
  if (!res.ok) throw new Error("Erreur API");
  return await res.json();
}