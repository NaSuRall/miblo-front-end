import PropTypes from "prop-types";

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

TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        amout: PropTypes.string.isRequired,
        id_compteB: PropTypes.string.isRequired,

    }),
    origineAccountRib: PropTypes.string,
    destinataireAccountRib: PropTypes.shape({
        id: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        amout: PropTypes.string.isRequired,
        rib: PropTypes.string,
        find: PropTypes.func.isRequired
    }),

}
