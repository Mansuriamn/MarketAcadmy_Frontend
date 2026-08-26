import { useState } from "react";
import { apiCall } from "../api/config";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email.includes("@")) return setError("Enter a valid email");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setIsLoading(true);

      const data = await apiCall("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // apiCall handles !response.ok by throwing an error with the message
      localStorage.setItem("admin", JSON.stringify({
        name: data.user.name,
        email: data.user.email,
      }));
      setUser(data.user);

      navigate("/admin/posts");

    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0b1220] via-[#0a1f2e] to-[#0b2a3a] text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white text-black p-2 rounded-md text-sm font-bold">MA</div>
          <h1 className="text-lg font-semibold tracking-wide">MarketAcademy</h1>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Precision Meets <br />
            <span className="text-green-400">Insight.</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
            Access high-density data visualization and expert editorial analysis in one unified professional suite.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-end gap-4 h-32">
            {[40, 70, 55, 95, 60, 75, 50, 100, 40, 70, 55, 95, 100, 95, 60].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-6 rounded ${
                  i === 3 ? "bg-green-500" : i === 7 ? "bg-red-500" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-4">
            <span>Q1 TARGET</span>
            <span>LIVE MARKET PULSE</span>
            <span>VOLATILITY INDEX</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 tracking-wider">
          INSTITUTIONAL GRADE SECURITY • 256-BIT ENCRYPTION
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300  ">

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Admin Terminal</span>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Secure Access</h2>
          <p className="text-gray-500 mb-6">Administrator credentials required.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                id="email"
                name="email"                   
                type="email"
                autoComplete="email"           
                placeholder="admin@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-gray-100 focus:bg-white placeholder-gray-400
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500
                hover:border-green-400 hover:shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-green-600 cursor-pointer hover:underline">
                  Forgot access?
                </span>
              </div>
              <input
                id="password"
                name="password"                     
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"       
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-gray-100 focus:bg-white placeholder-gray-400
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500
                hover:border-green-400 hover:shadow-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-black transition"
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}  
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg" role="alert"> 
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-lg transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-900 hover:to-black
              active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Unlock Curator Terminal"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
            By entering this terminal, you agree to our{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">Market Disclosure</span>{" "}
            and{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">Data Protection Agreement</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;