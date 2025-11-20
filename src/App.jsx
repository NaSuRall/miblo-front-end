import { Routes, Route } from "react-router-dom";
import Connexion from "./Connexion";
import Inscription from "./Inscription.jsx";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Connexion />} />
            <Route path="/register" element={<Inscription onSwitchToLogin={() => window.location.href='/login'} />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;



/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DepositMoney from './components/FormDepoMoney.jsx'



function App() {

  return (
    <div className='flex flex-col w-full h -full bg-red-500'>
      <div><h1 className='text-4xl'>Test</h1></div>
        <DepositMoney/>
    </div>
  )

}

export default App
*/