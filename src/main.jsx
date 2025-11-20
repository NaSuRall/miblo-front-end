import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/DashboardComponent.jsx";
import BankAccount from "./pages/CompteBancaires.jsx"
import DepositMoney from "./pages/DepositMoney.jsx";
import DashboardLayout from "./pages/dashboardLayout.jsx";
import Transaction from "./pages/Transaction.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import TransactionDetail from "./pages/TransactionDetail.jsx";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="bank/account" element={<BankAccount />} />
                <Route path="depositmoney" element={<DepositMoney />} />
                <Route path="bank/transaction" element={<Transaction />} />
            </Route>

            <Route path="/login" element={<Connexion />} />
            <Route path="/register" element={<Inscription />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
    </BrowserRouter>
);
