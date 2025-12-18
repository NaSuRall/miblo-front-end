// Systéme Navigation
import { useState } from "react";
import {useNavigate} from "react-router-dom";
// Afficher/Masquer password
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
    // Navigation
    const navigate = useNavigate();

    // Info du formulaire
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Afficher/Masquer password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Afficher les erreurs
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Execute lors du fonctionnement du formualaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);

        try {
            // Envoi des données à l’API
            const res = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    formData
                ),
            });

            // Reponse Json
            const data = await res.json();

            // Si erreur
            if (!res.ok) {
                setError(data.detail || "Erreur lors de l'inscription");
            } else {
                alert("Compte créé avec succès !");
               navigate("/");
            }
        } catch (error) {
            // Erreur Réseau
            setError("Impossible de contacter le serveur", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center w-full justify-center bg-gradient-to-b from-[#DDECF9] to-[#F8FBF1] p-4">
            <div className="w-full max-w-md bg-[#7B9DD2] p-8 rounded-xl shadow-xl text-white">
                <div className="flex flex-row w-full items-center justify-center">
                    <img src="../src/assets/img/logo.png" className='flex w-[30%] h-full  ' />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Nom d'utilisateur</label>
                        <input
                            type="text"
                            placeholder="Nom"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none bg-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none bg-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Mot de Passe</label>
                        <div className="flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mot de passe"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="flex-1 px-4 py-2 rounded-l-lg text-black bg-white focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="px-3 py-2 bg-[#992BB5] rounded-r-lg hover:opacity-90 transition font-semibold"
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Confirmer le Mot de Passe</label>
                        <div className="flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmez le mot de passe"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="flex-1 px-4 py-2 rounded-l-lg text-black bg-white focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                className="px-3 py-2 bg-[#992BB5] rounded-r-lg hover:opacity-90 transition font-semibold"
                            >
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-[#992BB5] font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Inscription..." : "S’inscrire"}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full mt-4 py-2 rounded-lg bg-[#992BB5] font-semibold hover:opacity-90 transition"
                >
                    Vous avez déjà un compte ? Connectez-vous.
                </button>
            </div>
        </div>
    );
}
