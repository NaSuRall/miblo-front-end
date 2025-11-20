export default function TransactionItem({ transaction, origineAccountRib, destinataireAccountRib }) {
    console.log("destinataireAccountRib", destinataireAccountRib);
    const ribDestinataire = destinataireAccountRib?.find(d => d.id === transaction.id_compteB)?.rib;
    console.log("j'en ai marre aled", ribDestinataire);

    return (
        <div className="border p-3 rounded-xl mb-2">
            <p>Date de la transaction : {transaction.created_at}</p>
            <p>Montant de la transaction : {transaction.amout}</p>
            <p>Compte d'origine : {origineAccountRib}</p>
            <p>Compte destinataire : {ribDestinataire}</p>

            <Link
                to={`/transaction/${transaction.id}`}
                className="mt-2 inline-block border p-2 rounded-xl bg-gray-200"
            >
                Voir détails
            </Link>
        </div>
    );
}
