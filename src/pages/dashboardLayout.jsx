import DashboardComponent from '../components/DashboardComponent';
import '../index.css';
import React from 'react';

const DashboardLayout = () => {
  return (
    // 1. Conteneur Parent (div dashboard) - w-full
    <div className="flex h-screen w-full bg-gray-500 rounded-xl shadow-lg gap-7 p-4">
      
      {/* 2. Barre de Navigation (div Navbar) - w-[15%] */}
      <div className="w-[15%] p-4 mr-10  bg-white/65 rounded-lg shadow-md shrink-0">
        <h2 className="text-3xl font-bold text-black/65 mb-4 text-center">Miblo</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold ">Accueil</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Mon compte</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Mes bénéficiaires</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Mes transactions</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Virementx</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Paramètres</a>
          <a href="#" className="text-lg text-black/65 hover:text-black font-bold">Déconnexion</a>
        </nav>
      </div>

      
      <div className="flex flex-col w-full h-full bg-white/65 p-4 mr-4 rounded-md shadow-md">
        <DashboardComponent />
      </div>
    </div>
  );
};

export default DashboardLayout;