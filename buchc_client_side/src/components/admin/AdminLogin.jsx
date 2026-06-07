import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/adminApi";
import {
  Crown,
  ChevronRight,
  Shield,
  Key,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await adminLogin(email.trim(), password);

      // Save token if backend returns one
      if (response?.token) {
        localStorage.setItem("adminToken", response.token);
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-chess-dark flex items-center justify-center p-4">
      {/* Chess Board Background */}
      <div
        className="fixed inset-0 z-0 chess-board-bg opacity-20"
        aria-hidden="true"
      />

      {/* Floating Chess Pieces */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-white/5 text-8xl animate-float hidden lg:block">
          ♔
        </div>

        <div className="absolute bottom-32 right-10 text-white/5 text-7xl animate-float delay-1000 hidden lg:block">
          ♕
        </div>

        <div className="absolute top-1/2 left-5 text-white/5 text-6xl animate-float delay-500 hidden xl:block">
          ♘
        </div>

        <div className="absolute bottom-1/3 right-20 text-white/5 text-6xl animate-float delay-700 hidden xl:block">
          ♗
        </div>
      </div>

      {/* Glow Effects */}
      <div className="fixed top-0 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />

      <div className="fixed bottom-0 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] animate-fadeIn border border-white/40 rounded-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center shadow-xl">
                <Crown size={40} className="text-white" />
              </div>

              <div className="absolute -inset-1 gold-gradient rounded-2xl opacity-0 group-hover:opacity-50 blur-md transition-all duration-300" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>

            <div className="w-16 h-1 gold-gradient rounded-full mx-auto mb-3" />

            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Shield size={14} className="text-gold" />
              Secure Access Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    size={18}
                    className="text-gray-500 group-focus-within:text-gold transition-colors"
                  />
                </div>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@buchc.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={18}
                    className="text-gray-500 group-focus-within:text-gold transition-colors"
                  />
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

                <p className="text-red-400 text-sm flex-1">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 min-h-[24px]">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Key size={18} />
                    Login to Dashboard
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
              <Shield size={12} />
              BRAC University Chess Club Admin Panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
