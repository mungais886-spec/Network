
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiRequest } from "../Services/Api.js";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  // Read the token and email from the verification link.
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleVerification() {
    if (!token || !email) {
      setStatus("error");
      setMessage(
        "This verification link is incomplete. Please check your email for the correct link."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ token, email }),
      });

      setStatus("success");
      setMessage(data.message);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#3154A5]">
            Verify Your Email
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Confirm your email address to activate your church community
            account.
          </p>
        </div>

        {email && (
          <p className="mb-5 break-words text-center text-sm text-gray-700">
            Email address: <strong>{email}</strong>
          </p>
        )}

        {message && (
          <div
            role="status"
            className={`mb-5 rounded-lg p-3 text-sm ${
              status === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {status !== "success" && (
          <button
            type="button"
            onClick={handleVerification}
            disabled={loading}
            className="w-full rounded-lg bg-[#3154A5] px-4 py-3 font-semibold text-white transition hover:bg-[#233D7C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify My Email"}
          </button>
        )}

        {status === "success" && (
          <Link
            to="/signin"
            className="block w-full rounded-lg bg-[#3154A5] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#233D7C]"
          >
            Continue to Sign In
          </Link>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already verified?{" "}
          <Link
            to="/signin"
            className="font-semibold text-[#3154A5] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
