import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const savedUser = localStorage.getItem("demoUser");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (
        user.email.toLowerCase() !== formData.email.trim().toLowerCase() ||
        user.password !== formData.password
      ) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      onLogin();
      navigate("/");
    } catch {
      setError("Unable to sign in. Please create your account again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3154A5] via-[#233D7C] to-[#762A7D] px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-[#3154A5] px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl text-white">
            ✝
          </div>

          <h1 className="text-3xl font-extrabold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/80">
            Sign in to reconnect with the Network Evangelistic Team community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 sm:px-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3154A5]"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#762A7D] py-3.5 font-bold text-white shadow-lg transition duration-300 hover:bg-[#3154A5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-[#762A7D] hover:text-[#3154A5]"
            >
              Create one
            </Link>
          </p>

          <div className="border-t border-gray-100 pt-5 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition hover:text-[#3154A5]"
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;