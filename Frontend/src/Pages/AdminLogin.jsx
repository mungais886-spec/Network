import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock } from "lucide-react";
import { auth } from "../firebase";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#3855A5] px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3855A5] text-white">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold text-[#3855A5]">Admin sign in</h1>

        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#3855A5] focus:ring-2 focus:ring-[#6BCDF2]/50"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#3855A5] focus:ring-2 focus:ring-[#6BCDF2]/50"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-[#3855A5] py-3 font-semibold text-white transition hover:bg-[#762A7D] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;