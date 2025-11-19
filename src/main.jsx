import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/dashboardLayout.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
);