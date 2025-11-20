
import '../index.css';
import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { Home, CreditCard, BarChart2, Settings } from "lucide-react";

export default function DashboardLayout() {
  const navItems = [
    { name: "Accueil", path: "/", icon: Home },
    { name: "Comptes", path: "/bank/account", icon: CreditCard },
    { name: "Transactions", path: "/bank/transactions", icon: BarChart2 },
    { name: "Dépôts", path: "/depositmoney", icon: CreditCard },
    { name: "Mon Profil", path: "/me", icon: Settings },
  ];

  return (
    <div className="flex h-screen p-3 gap-5" style={{backgroundColor: "var(--background-color)"}}>
      <aside className="w-64 text-gray-200 flex rounded-xl flex-col p-6 gap-6 shadow-xl" style={{backgroundColor: "var(--background-card-navbar)"}}>
        <div className="text-2xl font-bold tracking-wide text-center mb-4 " style={{color: "var(--text-color)"}}>
          MIBLO
        </div>
        <nav className="flex flex-col gap-4 text-sm font-medium">
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
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        {/* Outlet affichera le composant correspondant à la route dans main.jsx*/}
        <Outlet />
      </main>
    </div>
  );
}
