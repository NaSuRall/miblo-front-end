export default function RecipientItem({recipient}){
    return (
        <div>
            <p>Nom du bénéficiaire : {recipients.name}</p>
            <p>RIB du bénéficiaire : {recipients.rib}</p>
            <p>Date d'ajout : {recipients.date}</p>
        </div>
    )
}