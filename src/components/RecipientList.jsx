import RecipientItem from "./RecipientItem.jsx";
import PropTypes from "prop-types";

export default function RecipientList({ recipientList }) {
    if (!Array.isArray(recipientList) || recipientList.length === 0) {
        return <p>Aucun bénéficiaire trouvé.</p>;
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            {recipientList.map((recipient) => (
                <RecipientItem key={recipient.id} recipient={recipient} />
            ))}
        </div>
    );
}
RecipientList.propTypes = {
    recipientList: PropTypes.array,

}