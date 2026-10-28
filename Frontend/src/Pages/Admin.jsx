import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ImagePlus, LogOut, Trash2 } from "lucide-react";
import { auth, db } from "../firebase";
import { uploadImage } from "../lib/UploadImage.js";
import useEvents from "../hooks/useEvents";

const emptyForm = { title: "", date: "", time: "", venue: "", description: "" };
const MAX_MB = 5;

const Admin = () => {
  const navigate = useNavigate();
  const { events, loading } = useEvents({ includePast: true });
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const picked = e.target.files[0];
    if (!picked) return;
    if (!picked.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Choose an image file." });
      return;
    }
    if (picked.size > MAX_MB * 1024 * 1024) {
      setMessage({ type: "error", text: `Poster must be under ${MAX_MB} MB.` });
      return;
    }
    setMessage({ type: "", text: "" });
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Add a poster first." });
      return;
    }
    setBusy(true);
    setMessage({ type: "", text: "" });
    try {
      const posterUrl = await uploadImage(file);
      await addDoc(collection(db, "events"), {
        ...form,
        posterUrl,
        createdAt: serverTimestamp(),
      });
      setForm(emptyForm);
      setFile(null);
      setPreview("");
      setMessage({ type: "success", text: "Event published. It's live for everyone now." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong. Try again." });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    await deleteDoc(doc(db, "events", id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#3855A5] focus:ring-2 focus:ring-[#6BCDF2]/50";

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3855A5] sm:text-3xl">Manage events</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3855A5]">Add a new event</h2>

            <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="title">Event title</label>
            <input id="title" name="title" required value={form.title} onChange={handleChange} className={inputClass} />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="date">Date</label>
                <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="time">Time</label>
                <input id="time" name="time" placeholder="2:00 PM" value={form.time} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="venue">Venue</label>
            <input id="venue" name="venue" value={form.venue} onChange={handleChange} className={inputClass} />

            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="description">Short description</label>
            <textarea id="description" name="description" rows={3} value={form.description} onChange={handleChange} className={inputClass} />

            <label
              htmlFor="poster"
              className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#3855A5]/40 bg-[#3855A5]/5 p-5 text-center transition hover:border-[#3855A5]"
            >
              {preview ? (
                <img src={preview} alt="Poster preview" className="max-h-56 rounded-lg object-contain" />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-[#3855A5]" />
                  <span className="text-sm font-medium text-[#3855A5]">Click to upload poster</span>
                  <span className="text-xs text-slate-500">JPG or PNG, up to {MAX_MB} MB</span>
                </>
              )}
              <input id="poster" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
            </label>

            {message.text && (
              <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-700"}`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded-full bg-[#3855A5] py-3 font-semibold text-white transition hover:bg-[#762A7D] disabled:opacity-60"
            >
              {busy ? "Publishing…" : "Publish event"}
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3855A5]">All events</h2>
            {loading && <p className="mt-4 text-slate-500">Loading…</p>}
            {!loading && events.length === 0 && (
              <p className="mt-4 text-sm text-slate-500">No events yet. Add your first one.</p>
            )}
            <ul className="mt-4 space-y-3">
              {events.map((event) => (
                <li key={event.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <img src={event.posterUrl} alt="" className="h-16 w-12 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#3855A5]">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.date}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(event.id, event.title)}
                    className="rounded-full p-2 text-red-600 hover:bg-red-50"
                    aria-label={`Delete ${event.title}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;