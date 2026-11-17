
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImagePlus,
  LogOut,
  Trash2,
  House,
  Pencil,
  X,
  CalendarDays,
  Users,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { apiRequest } from "../Services/Api.js";
import { useAuth } from "../Context/AuthContext";
import { uploadImage } from "../lib/UploadImage.js";
import useEvents from "../hooks/useEvents";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  venue: "",
  description: "",
};

const MAX_MB = 5;

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);

  const { events, loading, error: eventsError } = useEvents({
    includePast: true,
    refreshKey,
  });

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const refreshEvents = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => {
    const picked = e.target.files?.[0];

    if (!picked) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(picked.type)) {
      setMessage({
        type: "error",
        text: "Choose a JPG, PNG or WebP image.",
      });
      setFile(null);
      setPreview("");
      e.target.value = "";
      return;
    }

    if (picked.size > MAX_MB * 1024 * 1024) {
      setMessage({
        type: "error",
        text: `Poster must not exceed ${MAX_MB} MB.`,
      });
      setFile(null);
      setPreview("");
      e.target.value = "";
      return;
    }

    setMessage({ type: "", text: "" });
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setFile(null);
    setPreview("");
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !file) {
      setMessage({
        type: "error",
        text: "Please select an event poster first.",
      });
      return;
    }

    setBusy(true);
    setMessage({ type: "", text: "" });

    try {
      const startDate = new Date(
        `${form.date}T${form.time || "00:00"}`
      );

      if (Number.isNaN(startDate.getTime())) {
        throw new Error("Enter a valid event date and time.");
      }

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.venue.trim(),
        start_time: startDate.toISOString(),
      };

      if (editingId) {
        await apiRequest(`/events/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        if (file) {
          await uploadImage(editingId, file);
        }
      } else {
        const created = await apiRequest("/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const eventId = created.event?.id ?? created.id;

        if (!eventId) {
          throw new Error(
            "Event was created, but its ID was not returned by the server. Check your POST /events response."
          );
        }

        await uploadImage(eventId, file);
      }

      setMessage({
        type: "success",
        text: editingId
          ? "Event updated successfully."
          : "Event created successfully.",
      });

      resetForm();
      refreshEvents();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (event) => {
    const startDate = new Date(event.start_time);

    if (Number.isNaN(startDate.getTime())) {
      setMessage({
        type: "error",
        text: "Unable to read this event's date.",
      });
      return;
    }

    const localDate = [
      startDate.getFullYear(),
      String(startDate.getMonth() + 1).padStart(2, "0"),
      String(startDate.getDate()).padStart(2, "0"),
    ].join("-");

    const localTime = [
      String(startDate.getHours()).padStart(2, "0"),
      String(startDate.getMinutes()).padStart(2, "0"),
    ].join(":");

    setEditingId(event.id);

    setForm({
      title: event.title || "",
      date: localDate,
      time: localTime,
      venue: event.location || event.venue || "",
      description: event.description || "",
    });

    setFile(null);
    setPreview(event.poster_url || event.posterUrl || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setMessage({ type: "", text: "" });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) {
      return;
    }

    setDeletingId(id);
    setMessage({ type: "", text: "" });

    try {
      await apiRequest(`/events/${id}`, {
        method: "DELETE",
      });

      if (editingId === id) {
        resetForm();
      }

      setMessage({
        type: "success",
        text: "Event deleted successfully.",
      });

      refreshEvents();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Unable to delete event.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handlePublish = async (event) => {
    const isPublished = event.is_published;

    setPublishingId(event.id);
    setMessage({ type: "", text: "" });

    try {
      await apiRequest(
        `/events/${event.id}/${isPublished ? "unpublish" : "publish"}`,
        {
          method: "PATCH",
        }
      );

      setMessage({
        type: "success",
        text: isPublished
          ? "Event unpublished successfully."
          : "Event published successfully.",
      });

      refreshEvents();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Unable to update event status.",
      });
    } finally {
      setPublishingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Unable to sign out.",
      });
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-[#3154A5] focus:ring-2 focus:ring-[#5BC0E3]/40";

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Administration
            </p>
            <h1 className="text-2xl font-bold text-[#3154A5] sm:text-3xl">
              Manage events
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full border border-[#3154A5] px-4 py-2 text-sm font-medium text-[#3154A5] transition hover:bg-[#3154A5] hover:text-white"
            >
              <House className="h-4 w-4" />
              Home
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-[#3154A5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#762A7D]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#3154A5]">
                {editingId ? "Edit event" : "Add a new event"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>

            <label
              className="mt-5 block text-sm font-medium text-slate-700"
              htmlFor="title"
            >
              Event title
            </label>

            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="date"
                >
                  Date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="time"
                >
                  Time
                </label>

                <input
                  id="time"
                  name="time"
                  type="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <label
              className="mt-4 block text-sm font-medium text-slate-700"
              htmlFor="venue"
            >
              Venue
            </label>

            <input
              id="venue"
              name="venue"
              required
              value={form.venue}
              onChange={handleChange}
              className={inputClass}
            />

            <label
              className="mt-4 block text-sm font-medium text-slate-700"
              htmlFor="description"
            >
              Event description
            </label>

            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />

            <label
              htmlFor="poster"
              className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#3154A5]/40 bg-[#3154A5]/5 p-5 text-center transition hover:border-[#3154A5]"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Event poster preview"
                  className="max-h-56 rounded-lg object-contain"
                />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-[#3154A5]" />
                  <span className="text-sm font-medium text-[#3154A5]">
                    Click to upload poster
                  </span>
                  <span className="text-xs text-slate-500">
                    JPG, PNG or WebP, up to {MAX_MB} MB
                  </span>
                </>
              )}

              <input
                ref={fileInputRef}
                id="poster"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFile}
                className="sr-only"
              />
            </label>

            {message.text && (
              <p
                role="status"
                className={`mt-4 text-sm ${
                  message.type === "error"
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3154A5] py-3 font-semibold text-white transition hover:bg-[#762A7D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {busy
                ? editingId
                  ? "Saving changes..."
                  : "Creating event..."
                : editingId
                  ? "Save changes"
                  : "Publish event"}
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#3154A5]">
                All events
              </h2>

              <span className="rounded-full bg-[#3154A5]/10 px-3 py-1 text-sm font-semibold text-[#3154A5]">
                {events.length} events
              </span>
            </div>

            {loading && (
              <p className="mt-4 text-sm text-slate-500">
                Loading events...
              </p>
            )}

            {eventsError && (
              <p className="mt-4 text-sm text-red-600">
                {eventsError}
              </p>
            )}

            {!loading && !eventsError && events.length === 0 && (
              <p className="mt-4 text-sm text-slate-500">
                No events yet. Add your first event.
              </p>
            )}

            <ul className="mt-5 space-y-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="rounded-xl border border-slate-200 p-3 transition hover:border-[#3154A5]/40"
                >
                  <div className="flex items-start gap-3">
                    {event.poster_url || event.posterUrl ? (
                      <img
                        src={event.poster_url || event.posterUrl}
                        alt=""
                        className="h-20 w-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                        <CalendarDays className="h-6 w-6 text-slate-400" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#3154A5]">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {event.date}
                        {event.time ? ` • ${event.time}` : ""}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <Users className="h-3.5 w-3.5" />
                        {Number(event.attendance_count || 0)} attending
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          event.is_published
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {event.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      disabled={publishingId === event.id}
                      onClick={() => handlePublish(event)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                      {event.is_published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      {publishingId === event.id
                        ? "Updating..."
                        : event.is_published
                          ? "Unpublish"
                          : "Publish"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEdit(event)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-[#3154A5] transition hover:bg-[#3154A5]/10"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === event.id}
                      onClick={() => handleDelete(event.id, event.title)}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === event.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
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
