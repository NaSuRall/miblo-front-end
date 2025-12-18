import TransactionItem from "./TransactionItem";
import PropTypes from "prop-types";

export function TransactionsList({transactions, origineAccountRib, destinataireAccountRib}) {
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
    destinataireAccountRib: PropTypes.string,
    origineAccountRib: PropTypes.string,
}