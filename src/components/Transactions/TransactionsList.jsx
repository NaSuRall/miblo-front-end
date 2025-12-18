import TransactionItem from "./TransactionItem";
import PropTypes from "prop-types";

export default function TransactionsList({transactions, origineAccountRib, destinataireAccountRib}) {
    return (
        <div>
            <div>
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} origineAccountRib={origineAccountRib} destinataireAccountRib={destinataireAccountRib} />
                ))}
            </div>
        </div>
    )
}

TransactionsList.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            transaction: PropTypes.shape({
                id: PropTypes.number,
            })
        })
    ),
    originAccountRib: PropTypes.string,
    destinataireAccountRib: PropTypes.string,
}