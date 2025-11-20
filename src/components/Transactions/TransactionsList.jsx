import TransactionItem from "./TransactionItem";

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