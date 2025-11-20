import React, { useState, useEffect } from 'react';
export default function DashboardComponent() {

  // ici le useEffect pour fetch les données
  const getData = async () => {
    const res = await fetch("http://127.0.0.1:8000/docs");
    const data = await res.json();
    console.log(data);
  };

  const DataFetcherComponent = () => {
      // 1. Définition des états
      const [data, setData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      
      // URL de l'API à appeler 
      const API_URL = "http://127.0.0.1:8000/docs"; 

      // 2. Logique de récupération des données (Effect Hook)
      useEffect(() => {
          const fetchData = async () => {
              try {
                  // Réinitialiser l'état d'erreur avant chaque tentative
                  setError(null);
                  setIsLoading(true);

                  const response = await fetch(API_URL);

                  // Vérification du statut HTTP (important pour les erreurs 404, 500, etc.)
                  if (!response.ok) {
                      throw new Error(`Erreur HTTP: ${response.status} - Échec de la récupération des données.`);
                  }
                  
                  const result = await response.json();
                  
                  // Si l'API renvoie les résultats sous une clé 'results' ou similaire, adap5tez ici
                  setData(result.results || result); 

              } catch (err) {
                  // Gestion des erreurs réseau ou des erreurs lancées ci-dessus
                  console.error("Erreur de chargement des données:", err.message);
                  setError("Impossible de charger les données : " + err.message);

              } finally {
                  // Toujours désactiver le chargement après le succès ou l'échec
                  setIsLoading(false);
              }
          };

          fetchData(); 
          // Le tableau de dépendances vide [] garantit que cet effet s'exécute uniquement après le premier rendu.
      }, []);

      // 3. Logique de rendu
      if (isLoading) {
          return <p>Chargement des données...</p>;
      }

      if (error) {
          // Affichage de l'erreur
          return <div style={{ color: 'red' }}>Erreur : {error}</div>;
      }
  }

  return (
    <div className="flex  h-full text-black/65">
      <div className="flex flex-col w-full h-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-6 h-[300px] rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Solde</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">1,234.56 €</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow ">
            <h3 className="text-lg font-bold text-gray-700">Revenus</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">5,000.00 €</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Dépenses</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">2,345.67 €</p>
          </div>
        </div>

        <div className="flex h-full bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Transactions récentes</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Paiement restaurant</span>
              <span className="text-red-600">-45.50 €</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Virement reçu</span>
              <span className="text-green-600">+1,200.00 €</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Retrait distributeur</span>
              <span className="text-red-600">-200.00 €</span>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}


