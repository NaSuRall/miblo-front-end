
import '../index.css';
import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { Home, CreditCard, BarChart2, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function DashboardLayout() {
  const navItems = [
    { name: "Accueil", path: "/", icon: Home },
    { name: "Comptes", path: "/bank/account", icon: CreditCard },
    { name: "Transactions", path: "/bank/transaction", icon: BarChart2 },
    { name: "Dépôts", path: "/depositmoney", icon: CreditCard },
    { name: "Recipient", path: "/recipients", icon: CreditCard },
  ];

    const handleLogout = () => {
    
    localStorage.removeItem("token"); // supprime le JWT
    window.location.reload();
  };

  return (
    <div className="flex h-screen p-3 gap-5" style={{backgroundColor: "var(--background-color)"}}>
      <aside className="w-64 text-gray-200 flex rounded-xl flex-col p-6 gap-6 shadow-xl" style={{backgroundColor: "var(--background-card-navbar)"}}>
        <div className="flex items-center justify-center w-full" style={{color: "var(--text-color)"}}>
          <img src="../src/assets/img/logo.png" className='flex w-[50%] h-full  ' />
        </div>
        <nav className="flex flex-col h-full justify-between gap-4 text-sm font-medium ">
          <div className='flex flex-col gap-2'>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                      isActive ? "bg-purple-400/50 text-white" : "hover:bg-purple-400/30 text-gray-300"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>



          <button onClick={handleLogout} className='flex flex-row px-4 py-2 gap-3 items-center justify-center border rounded-lg hover:bg-red-500 transition-colors duration-300'>Se déconnecter <LogOut size={20} /></button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        {/* Outlet affichera le composant correspondant à la route dans main.jsx*/}
        <Outlet />
      </main>
    </div>
  );
}
