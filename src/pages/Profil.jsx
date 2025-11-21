import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/bank/account/${user_id}", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to fetch profile");
            const data = await response.json();
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Erreur: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Mon Profil</h1>
                {profile && (
                    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">Nom</p>
                            <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                        </div>
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{profile.email}</p>
                        </div>
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">Solde</p>
                            <p className="text-2xl font-bold text-green-600">{profile.balance} €</p>
                        </div>
                        <div className="border-b pb-4">
                            <p className="text-sm text-gray-500">IBAN</p>
                            <p className="text-lg font-mono text-gray-900">{profile.iban}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Numéro de compte</p>
                            <p className="text-lg font-mono text-gray-900">{profile.accountNumber}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}