import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/DashboardComponent.jsx";
import BankAccount from "./pages/CompteBancaires.jsx"
import DepositMoney from "./pages/DepositMoney.jsx";
import DashboardLayout from "./pages/dashboardLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/bank/account" element={<BankAccount />} />
          <Route path="/depositmoney" element={<DepositMoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
);