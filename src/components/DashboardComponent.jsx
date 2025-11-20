import { useEffect, useState } from "react";
import getTransactionsAccount from "../services/api/dashboardService";

export default function DashboardComponent() {
  const [transactions, setTransactions] = useState([]);
  const [solde, setSolde] = useState(0);
  const [revenus, setRevenus] = useState(0);
  const [depenses, setDepenses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const compteId = 1;

  useEffect(() => {
    async function load() {
      try {
        const data = await getTransactionsAccount(compteId, 1);
        setTransactions(data);

        // Calcul revenus et dépenses
        let rev = 0, dep = 0;
        data.forEach(t => {
          if (t.id_compteA === compteId) dep += t.amout; // sortie
          if (t.id_compteB === compteId) rev += t.amout; // entrée
        });

        setRevenus(rev);
        setDepenses(dep);
        setSolde(rev - dep);
      } catch (e) {
        console.error("Erreur :", e);
        setError("Impossible de charger les transactions");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Fonction utilitaire pour formater les montants
  const formatAmount = (amount) => amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex flex-col h-full text-black/75 space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow h-48 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-gray-700">Solde</h3>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{formatAmount(solde)} €</p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow h-48 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-gray-700">Revenus</h3>
          <p className="text-3xl font-extrabold text-green-600 mt-2">{formatAmount(revenus)} €</p>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow h-48 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-gray-700">Dépenses</h3>
          <p className="text-3xl font-extrabold text-red-600 mt-2">{formatAmount(depenses)} €</p>
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="bg-gray-50 p-6 rounded-lg shadow w-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Transactions récentes</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-500">Aucune transaction trouvée.</p>
          ) : (
            transactions.map((t, i) => {
              const isCredit = t.id_compteB === compteId;
              return (
                <div
                  key={i}
                  className={`p-4 bg-white shadow rounded flex flex-col md:flex-row md:justify-between md:items-center ${isCredit ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
                    }`}
                >
                  <p><strong>Date :</strong> {new Date(t.created_at).toLocaleString()}</p>
                  <p><strong>Montant :</strong> {formatAmount(t.amout)} €</p>
                  <p><strong>Destinataire :</strong> {t.id_compteB}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}