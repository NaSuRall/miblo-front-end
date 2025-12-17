import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Connexion() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    // test
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                }

            });

            const data = await response.json();
            const token = data.token;

            if (!token) {
                setError("Erreur : aucun token reçu");
                return;
            }

            localStorage.setItem("token", token);
            console.log(token);
            navigate("/");
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Identifiants incorrects");
            } else {
                setError("Erreur serveur");
            }
        }
    };

    return (
        <div className="h-screen flex items-center w-full justify-center bg-gradient-to-b from-[#DDECF9] to-[#F8FBF1] p-4">
            <div className="w-full max-w-md bg-[#7B9DD2] p-8 rounded-xl shadow-xl text-white">
                <div className="flex flex-row w-full items-center justify-center">
                    <img src="../src/assets/img/logo.png" className='flex w-[30%] h-full  ' />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="email"
                            className="px-4 py-2 rounded-lg text-black focus:outline-none bg-white"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-xl">Mot de Passe</label>
                        <div className="flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                autoComplete="current-password"
                                className="flex-1 px-4 py-2 rounded-l-lg text-black focus:outline-none bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="px-3 py-2 bg-[#992BB5] rounded-r-lg hover:opacity-90 transition font-semibold"
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-200 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#992BB5] font-semibold hover:opacity-90 transition"
                    >
                        Se connecter
                    </button>
                </form>

                <button
                    onClick={() => navigate("/register")}
                    className="w-full mt-4 py-2 rounded-lg bg-[#992BB5] font-semibold hover:opacity-90 transition"
                >
                    Vous n'avez pas de compte ? Créer un compte.
                </button>
            </div>
        </div>
    );
}
