import { useState, useEffect } from "react";
import "../../index.css";
import { getTransactionList } from "../../services/api/transactionService.js";
import { getBankAccounts } from "../../services/api/bankAccountService.js";
import getIdFromToken from "../../services/getIdFromToken.js";

export default function TransactionHistory() {
  const token = localStorage.getItem("token");
  const userId = getIdFromToken(token);

  const [transactions, setTransactions] = useState([]);
  const [accountMap, setAccountMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const accounts = await getBankAccounts(userId);

        // dictionnaire id_compte → rib
        const map = {};
        accounts.forEach(acc => {
          map[acc.id] = acc.rib;
        });
        setAccountMap(map);

        // charger transactions pour chaque compte
        const allTransactions = [];
        for (const acc of accounts) {
          const t = await getTransactionList(acc.id, userId);
          allTransactions.push(...t);
        }

        // trier du plus récent au plus ancien
        allTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const uniqueTransactions = Array.from(new Map(allTransactions.map(t => [t.id, t])).values());

        setTransactions(uniqueTransactions);

      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col items-center w-full h-full p-6">
      <h1 className="text-lg font-bold mb-6 text-gray-700">Historique des Transactions</h1>

      {transactions.length === 0 ? (
        <p className="flex flex-row items-center justify-center text-red-500">Aucune transaction trouvée.</p>
      ) : (
        <div className="w-[70%] flex h-full flex-col gap-4">
          {transactions.map((t) => {
            const isDebit = accountMap[t.id_compteA] !== undefined;

            return (
              <div
                key={t.id}
                className="bg-white rounded-xl px-4 py-5 flex flex-row items-center justify-between gap-2"
              >

                <div className="text-sm flex flex-row gap-4 text-gray-700">
                  <div>
                    <strong className="text-sm">De :</strong> {accountMap[t.id_compteA] || "—"}
                  </div>
                  <div>
                    <strong className="text-sm">Vers :</strong> {accountMap[t.id_compteB] || "—"}
                  </div>
                </div>
                
                <div className="text-gray-500 text-sm">
                  {new Date(t.created_at).toLocaleString()}
                </div>

                <div className="flex flex-row">
                  <span
                    className={`px-3 py-1 rounded-lg  font-semibold ${
                      isDebit
                        ? "bg-red-100 text-red-600 border border-red-300"
                        : "bg-green-100 text-green-600 border border-green-300"
                    }`}
                  >
                    {isDebit ? "-" : "+"}{t.amout} €
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
