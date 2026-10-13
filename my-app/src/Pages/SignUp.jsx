
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

const SignUp = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
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

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (formData.password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    const existingUser = localStorage.getItem("demoUser");

    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);

        if (user.email.toLowerCase() === email) {
          setError("An account with this email already exists. Please sign in.");
          return;
        }
      } catch {
        localStorage.removeItem("demoUser");
      }
    }

    const newUser = {
      name,
      email,
      password: formData.password,
    };

    localStorage.setItem("demoUser", JSON.stringify(newUser));

    onLogin();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3154A5] via-[#233D7C] to-[#762A7D] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-[#3154A5] px-8 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl text-white">
            ✝
          </div>

          <h1 className="text-3xl font-extrabold text-white">
            Join Our Community
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/80">
            Create your account and grow with the Network Evangelistic Team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-7 sm:px-8">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
              />
            </div>
          </div>

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
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
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
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-12 text-gray-800 outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3154A5]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
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
            className="w-full rounded-xl bg-[#762A7D] py-3.5 font-bold text-white shadow-lg transition duration-300 hover:bg-[#3154A5]"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-bold text-[#762A7D] hover:text-[#3154A5]"
            >
              Sign In
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

export default SignUp;
