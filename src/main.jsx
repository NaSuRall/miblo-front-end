import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/dashboard.jsx"
import BankAccount from "./pages/CompteBancaires.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/my-bank-account" element={<BankAccount/>} />
    </Routes>
  </BrowserRouter>
);