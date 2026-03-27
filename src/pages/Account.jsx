import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};


const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const { name, email, password } = formData;

  // Basic validation
  if (!email.includes("@")) {
    return setError("Enter valid email");
  }
  if (password.length < 6) {
    return setError("Password must be at least 6 characters");
  }
  if (!isLogin && !name) {
    return setError("Full name required");
  }

  try {
    setIsLoading(true);

    // simulate API
    await new Promise((res) => setTimeout(res, 1500));

    console.log(isLogin ? "Login" : "Signup", formData);

    // store user (temporary)
    localStorage.setItem("user", JSON.stringify(formData));

    // redirect
    navigate("/admin/posts");

  } catch (err) {
    setError("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0b1220] via-[#0a1f2e] to-[#0b2a3a] text-white p-12 flex-col justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-black p-2 rounded-md text-sm font-bold">
            
          </div>
          <h1 className="text-lg font-semibold tracking-wide">
            MarketAcademy
          </h1>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Precision Meets <br />
            <span className="text-green-400">Insight.</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
            Access high-density data visualization and expert editorial
            analysis in one unified professional suite.
          </p>
        </div>

        {/* Graph */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-end gap-4 h-32">
            {[40, 70, 55, 95, 60, 75, 50, 100,40, 70, 55, 95, 100,,95, 60,].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-6 rounded transition-all duration-300 hover:scale-110 ${
                  i === 3
                    ? "bg-green-500"
                    : i === 10
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-4">
            <span>Q1 TARGET</span>
            <span>LIVE MARKET PULSE</span>
            <span>VOLATILITY INDEX</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 tracking-wider">
          INSTITUTIONAL GRADE SECURITY • 256-BIT ENCRYPTION
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-gray-100">

        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-2xl">

          <h2 className="text-2xl font-semibold mb-1">Secure Access</h2>
          <p className="text-gray-500 mb-6">
            Manage your portfolio with elite precision.
          </p>

          {/* Toggle */}
          <div className="flex bg-gray-200 rounded-lg mb-6 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-md text-sm transition-all duration-300 ${
                isLogin
                  ? "bg-white shadow font-medium scale-105"
                  : "text-gray-500 hover:bg-white/50 hover:text-black"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-md text-sm transition-all duration-300 ${
                !isLogin
                  ? "bg-white shadow font-medium scale-105"
                  : "text-gray-500 hover:bg-white/50 hover:text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  FULL NAME
                </label>
                <input
                    id="name"
  value={formData.name}
  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 rounded-lg border 
                  bg-gray-100 focus:bg-white placeholder-gray-400
                  transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-green-500 
                  hover:border-green-400 hover:shadow-sm"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                WORK EMAIL
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                className="w-full p-3 rounded-lg border 
                bg-gray-100 focus:bg-white placeholder-gray-400
                transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-green-500 
                hover:border-green-400 hover:shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PASSWORD
                </label>
                <span className="text-xs text-green-600 cursor-pointer hover:underline">
                  Forgot access?
                </span>
              </div>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg border pr-10
                bg-gray-100 focus:bg-white placeholder-gray-400
                transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-green-500 
                hover:border-green-400 hover:shadow-sm"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-black transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Remember Me */}
            {/* {isLogin && (
              <div className="flex items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  Remember this device
                </label>
              </div>
            )} */}

            {/* Button */}
          <Link to="/admin/posts">
            <button
              className="w-full bg-black text-white py-3 rounded-lg 
              transition-all duration-300 
              hover:scale-[1.02] hover:shadow-lg 
              hover:bg-gradient-to-r hover:from-gray-900 hover:to-black 
              active:scale-[0.98]"
            >
              {isLogin
                ? "Unlock Curator Terminal"
                : "Create Account"}
            </button>
          </Link>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">
              DIRECT INSTITUTION LOGIN
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Buttons */}
          {/* <div className="flex gap-3">
            <button className="flex-1 border p-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50 hover:shadow hover:-translate-y-0.5">
              🔵 Google
            </button>

            <button className="flex-1 border p-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50 hover:shadow hover:-translate-y-0.5">
              🍎 Apple ID
            </button>
          </div> */}

          {/* Footer */}
          <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
            By entering this terminal, you agree to our{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">
              Market Disclosure
            </span>{" "}
            and{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">
              Data Protection Agreement
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
