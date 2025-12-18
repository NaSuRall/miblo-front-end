import PropTypes from "prop-types";

export default function RecipientItem({ recipient }) {
    const formattedDate = recipient.date
        ? new Date(recipient.date).toLocaleDateString("fr-FR")
        : "Date inconnue";

    return (
        <div className="border p-3 rounded-lg">
            <p><b>Nom du bénéficiaire :</b> {recipient.name}</p>
            <p><b>RIB du bénéficiaire :</b> {recipient.rib}</p>
            <p><b>Date d'ajout :</b> {formattedDate}</p>
        </div>
    );
}

RecipientItem.propTypes = {
    recipient: PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        rib: PropTypes.string,

    })
}