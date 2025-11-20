export async function getBankAccounts(userId) {
  const res = await fetch(`http://127.0.0.1:8000/bank/account/${userId}`);
  if (!res.ok) throw new Error("Erreur API");
  return await res.json();
}

export async function addBankAccount(user_id) {
  
    const res = await fetch(`http://127.0.0.1:8000/create/bank/account/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ user_id }),
    });
    if (!res.ok) throw new Error("Erreur API");
    toast.success(res.message)
    return await res.json();
  
} 

export async function closeBankAccount(banckAccount_id) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/bank/account/close/${banckAccount_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ banckAccount_id }),
    });
    if (!res.ok) throw new Error("Erreur API");
    return await res.json();
  } catch (error) {
    console.error("Erreur lors de la clôture du compte bancaire :", error);
  }
}