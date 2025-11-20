export default function TransactionItem({ transaction, origineAccountRib, destinataireAccountRib }) {
    console.log("destinataireAccountRib", destinataireAccountRib);
    const ribDestinataire = destinataireAccountRib?.find(d => d.id === transaction.id_compteB)?.rib;
    console.log("j'en ai marre aled", ribDestinataire);

    return (
        <div>
            <p>Date de la transaction : {transaction.created_at}</p>
            <p>Montant de la transaction : {transaction.amout}</p>
            <p>Compte d'origine : {origineAccountRib}</p>
            <p>Compte destinataire : {ribDestinataire}</p>
        </div>
    )
}
