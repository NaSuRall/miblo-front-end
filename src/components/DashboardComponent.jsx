import { useEffect, useState } from "react";
import getTransactionsAccount from "../services/api/dashboardService";
import { getBankAccounts } from "../services/api/bankAccountService";
import { Users , Landmark} from "lucide-react";
import  getIdFromToken  from '../services/getIdFromToken';

export default function DashboardComponent() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userId = getIdFromToken(token);
  const [accounts, setAccounts] = useState([]);
  const [compteId, setCompteId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBankAccounts(userId);
        setAccounts(data);
        setCompteId(data[0].id)

      } catch (e) {
        console.error("Erreur :", e);
      }
    }

    load();
  }, [userId]);


    useEffect(() => {
      if (!compteId) return;

      async function load() {
        try {
          const data = await getTransactionsAccount(compteId, userId);
          setTransactions(data);
        } catch (e) {
          console.error("Erreur :", e);
          setError("Impossible de charger les transactions.");
        } finally {
          setIsLoading(false);
        }
      }
      load();
    }, [compteId, userId]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  
  return (
    <div className="flex flex-col h-full space-y-6 p-6 rounded-xl" style={{background: "var(--bacground-card)"}}>
      {/* Statistiques principales */}
      <div className="flex flex-row w-full h-auto gap-2 ">
          <div className="flex flex-col items-center justify-center ">
          {accounts
            .filter((item) => item.is_primary === true)
            .map((account) => (
              <div key={account.id} className="flex flex-col gap-2 p-6 rounded-lg w-[400px] h-full " style={{background: "var(--background-color)"}}>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-full h-full">
                    <h2 className="text-sm font-bold text-gray-700 mb-4">Compte {account.is_primary ? "principale" : "Secondaire"}</h2>
                    <p className="text-sm flex flex-row items-center gap-2 text-gray-500"><Landmark size={15} />RIB: {account.rib}</p>
                    <p className="text-sm flex flex-row items-center gap-2" style={{ color: "var(--color-gray)" }}><Users size={15} />Romain Poulain</p>
                  </div>
                  <div>
                    <p className="text-sm py-2 px-5 rounded-xl border" style={{ backgroundColor: "var(--color-bg-green)", borderColor: "var(--color-border-green)", color: "var(--color-text-green)" }}>+{account.solde}€</p>
                  </div>
                </div>

                <div className="flex flex-col w-full h-full">
                  <p className="text-sm text-gray-500">Dernière transaction</p>
                {transactions.length === 0 ? (
                    <p className="text-gray-300 text-sm">Aucune transaction trouvée.</p>
                  ) : (
                    transactions
                  .slice(0, 1)
                  .map((t) => (
                    <div key={t.id} className="flex flex-row border-2 border-gray-200 p-2 rounded-lg justify-between items-center mt-2">
                      <p className="text-sm ">Destinataire(id): {t.id_compteB}</p>
                      <p className="text-sm py-1 px-5 rounded-xl border" style={{ backgroundColor: "var(--color-bg-red-button)", borderColor: "var(--color-border-red-button)", color: "var(--color-text-red-button)" }}>- {t.amout}€</p>
                    </div>
                  )))
                }
                </div>
              </div>
            ))}
          </div>


          <div className="flex flex-row items-center justify-start w-full gap-5 py-6">
            {accounts
            .filter((item) => item.is_primary === false)
            .filter((item) => item.is_closed === false)
            .slice(0, 3)
            .map((account) => (
              <div key={account.id} className="flex flex-col gap-2 p-6 rounded-lg w-[300px] h-full " style={{background: "var(--background-color)"}}>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-full h-full">
                    <h2 className="text-sm font-bold text-gray-700 mb-4">Compte {account.is_primary ? "principale" : "Secondaire"}</h2>
                    <p>{account.id}</p>
                    <p className="text-sm flex flex-row items-center gap-2 text-gray-500"><Landmark size={15} />RIB: {account.rib}</p>
                    <p className="text-sm flex flex-row items-center gap-2" style={{ color: "var(--color-gray)" }}><Users size={15} />Romain Poulain</p>
                  </div>
                  <div>
                   <p className="text-sm py-2 px-5 rounded-xl border" style={{ backgroundColor: "var(--color-bg-green)", borderColor: "var(--color-border-green)", color: "var(--color-text-green)" }}>+{account.solde}€</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

      </div>

      {/* Transactions récentes */}
      <div className="bg-gray-50 p-6 rounded-lg shadow w-full h-full overflow-scroll">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Transactions </h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-500">Aucune transaction trouvée.</p>
          ) : (
            transactions.map((t) => {
                t.id_compteB === userId;
              return (
                <div
                  key={transactions.id}
                  className={`p-4 bg-white text-sm shadow rounded flex flex-col md:flex-row md:justify-between md:items-center `}
                >
                  <p><strong>Date :</strong> {new Date(t.created_at).toLocaleString()}</p>
                  <p><strong>Montant :</strong> {t.amout} €</p>
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