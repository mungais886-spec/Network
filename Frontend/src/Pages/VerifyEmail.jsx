
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiRequest } from "../Services/Api.js";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let active = true;

    async function handleVerification() {
      if (!token || !email) {
        setStatus("error");
        setMessage("This verification link is incomplete or invalid.");
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest("/auth/verify-email", {
          method: "POST",
          body: JSON.stringify({ token, email }),
        });

        if (!active) return;

        setStatus("success");
        setMessage(data.message);
      } catch (error) {
        if (!active) return;

        setStatus("error");
        setMessage(error.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    handleVerification();

    return () => {
      active = false;
    };
  }, [token, email]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#3154A5]">
            Verify Your Email
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Confirm your email address to activate your church community account.
          </p>
        </div>

        {email && (
          <p className="mb-5 break-words text-center text-sm text-gray-700">
            Email address: <strong>{email}</strong>
          </p>
        )}

        {loading && (
          <p className="text-center text-sm text-gray-600">
            Verifying your email address...
          </p>
        )}

        {!loading && message && (
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

        {!loading && status === "success" && (
          <Link
            to="/signin"
            className="block w-full rounded-lg bg-[#3154A5] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#233D7C]"
          >
            Continue to Sign In
          </Link>
        )}

        {!loading && status === "error" && (
          <Link
            to="/signin"
            className="block w-full rounded-lg bg-[#3154A5] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#233D7C]"
          >
            Return to Sign In
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
