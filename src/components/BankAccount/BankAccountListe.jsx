import BankAccountItem from "./BankAccountItem";
import PropTypes from "prop-types";

export default function BankAccountList({accounts}) {

  return (
    <div className="flex flex-col w-[70%] h-full p-4">
      <div className="flex  mb-5">
        <span className="text-xl" style={{color: "var(--text-color)"}}>Compte Courant</span>
      </div>
      {accounts
      .filter((item) => item.is_primary === true)
      .map((item, index) => (
        <BankAccountItem key={item.id} account={item} index={index} />
      ))}
      <div className="flex  mb-5 mt-10">
        <span className="text-xl" style={{color: "var(--text-color)"}}>Autres Comptes</span>
      </div>
      {accounts
      .filter((item) => item.is_primary === false)
      .filter((item) => item.is_closed === false)
      .slice(0, 5)
      .map((item, index) => (
        <BankAccountItem key={item.id} account={item} index={index} />
      ))}
    </div>
  );
}

BankAccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,

}