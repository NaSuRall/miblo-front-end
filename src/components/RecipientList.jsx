import RecipientItem from "./RecipientItem.jsx";

export default function RecipientList({ recipientList }) {
    if (!Array.isArray(recipientList)) return <p>Aucun bénéficiaire</p>;
    return (
        <div>
            {recipientList.map((recipient, index) => (
                <RecipientItem key={index} recipient={recipient} />
            ))}
        </div>
    );
}
