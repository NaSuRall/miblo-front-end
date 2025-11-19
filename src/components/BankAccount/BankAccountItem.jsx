export default function BankAccountItem({ account }) {
  return (
    <div className="m-5 p-5 border rounded-lg" style={{ backgroundColor: "var(--background-color)" }}>
      <h3 className="text-black">Account Number: {account.is_primary ? "1" : "0"}</h3>
      <p className="text-black">Solde: {account.solde}</p>
      <p className="text-black">RIB: {account.rib}</p>
    </div>
  );
}
