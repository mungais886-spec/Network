
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  ImagePlus,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  Upload,
  X,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { apiRequest } from "../Services/Api.js";
import { uploadImage } from "../lib/UploadImage.js";
import useEvents from "../hooks/useEvents.js";
import { useAuth } from "../Context/AuthContext.jsx";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  venue: "",
  description: "",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const getLocalDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getLocalTime = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const LeaderEvents = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);
  const { events, loading, error: eventsError } = useEvents({
    includePast: true,
    refreshKey,
  });

  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setForm(emptyForm);
    setSelectedFile(null);
    setPreview("");
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPEG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The poster must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleEdit = (event) => {
    resetForm();

    setEditingId(event.id);
    setForm({
      title: event.title ?? "",
      date: getLocalDate(event.start_time),
      time: getLocalTime(event.start_time),
      venue: event.location ?? "",
      description: event.description ?? "",
    });

    setPreview(event.posterUrl ?? "");
    setShowForm(true);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.title.trim() || !form.date || !form.time) {
      setError("Enter the event title, date and time.");
      return;
    }

    if (!editingId && !selectedFile) {
      setError("Please select an event poster.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        location: form.venue.trim() || null,
        start_time: new Date(
          `${form.date}T${form.time}`,
        ).toISOString(),
      };

      let eventId = editingId;

      if (editingId) {
        await apiRequest(`/events/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        const data = await apiRequest("/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        eventId = data.event.id;
      }

      if (selectedFile) {
        await uploadImage(eventId, selectedFile);
      }

      setMessage(
        editingId
          ? "Event updated successfully."
          : "Event created successfully. It is currently unpublished.",
      );

      resetForm();
      setRefreshKey((current) => current + 1);
    } catch (err) {
      setError(err.message || "Unable to save the event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setActionId(event.id);
    setError("");
    setMessage("");

    try {
      await apiRequest(`/events/${event.id}`, {
        method: "DELETE",
      });

      setMessage("Event deleted successfully.");
      setRefreshKey((current) => current + 1);
    } catch (err) {
      setError(err.message || "Unable to delete the event.");
    } finally {
      setActionId(null);
    }
  };

  const handlePublish = async (event) => {
    setActionId(event.id);
    setError("");
    setMessage("");

    try {
      await apiRequest(
        `/events/${event.id}/${event.is_published ? "unpublish" : "publish"}`,
        { method: "PATCH" },
      );

      setMessage(
        event.is_published
          ? "Event unpublished successfully."
          : "Event published successfully.",
      );

      setRefreshKey((current) => current + 1);
    } catch (err) {
      setError(err.message || "Unable to update event status.");
    } finally {
      setActionId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log out.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-slate-800">
      <header className="border-b border-[#3154A5]/15 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3154A5] text-white">
              <CalendarDays size={23} />
            </div>

            <div>
              <p className="font-bold text-[#3154A5]">
                Event Management
              </p>
              <p className="text-xs text-slate-500">
                Network Evangelistic Team
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-600 sm:block">
              {user?.full_name}
            </span>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-[#3154A5] transition hover:bg-slate-50"
            >
              My Profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-[#762A7D] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#5e2164]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3154A5] hover:text-[#762A7D]"
            >
              <ArrowLeft size={17} />
              Back to profile
            </button>

            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#762A7D]">
              LEADER WORKSPACE
            </p>

            <h1 className="text-3xl font-extrabold text-[#3154A5] sm:text-4xl">
              Manage Events
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Create events, manage posters and control what is visible to the public.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3154A5] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#762A7D]"
          >
            <Plus size={19} />
            Create Event
          </button>
        </div>

        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#3154A5]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total events
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#3154A5]">
              {events.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#3154A5]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Published
            </p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-700">
              {events.filter((event) => event.is_published).length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#3154A5]/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Unpublished
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#762A7D]">
              {events.filter((event) => !event.is_published).length}
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <CheckCircle2 size={19} />
            {message}
            <button
              type="button"
              onClick={() => setMessage("")}
              className="ml-auto"
              aria-label="Dismiss message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {(error || eventsError) && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error || eventsError}
          </div>
        )}

        {showForm && (
          <section className="mb-8 overflow-hidden rounded-2xl border border-[#3154A5]/15 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2 className="font-bold text-[#3154A5]">
                  {editingId ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Fields marked with * are required.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close event form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Event title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      setForm({ ...form, title: event.target.value })
                    }
                    maxLength={200}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3154A5] focus:ring-2 focus:ring-[#3154A5]/10"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Event date *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#3154A5]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start time *
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      setForm({ ...form, time: event.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#3154A5]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(event) =>
                      setForm({ ...form, venue: event.target.value })
                    }
                    maxLength={250}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#3154A5]"
                    placeholder="Enter event venue"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        description: event.target.value,
                      })
                    }
                    rows={5}
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#3154A5]"
                    placeholder="Describe the event..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Event poster {!editingId && "*"}
                  </label>

                  <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#3154A5]/25 bg-[#3154A5]/[0.03] p-5 text-center transition hover:border-[#5BC0E3] hover:bg-[#5BC0E3]/5">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Event poster preview"
                        className="max-h-64 max-w-full rounded-lg object-contain"
                      />
                    ) : (
                      <>
                        <ImagePlus size={30} className="mb-2 text-[#3154A5]" />
                        <span className="font-semibold text-[#3154A5]">
                          Choose an event poster
                        </span>
                        <span className="mt-1 text-xs text-slate-500">
                          JPEG, PNG or WebP, maximum 5 MB
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {preview && (
                    <p className="mt-2 text-xs text-slate-500">
                      Select another image above to replace this poster.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3154A5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#762A7D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Upload size={18} />
                  )}
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Event"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#3154A5]">
                All Events
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage published events and unpublished drafts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setRefreshKey((current) => current + 1)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#3154A5] transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <LoaderCircle size={28} className="animate-spin text-[#3154A5]" />
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <CalendarDays size={36} className="mx-auto text-[#3154A5]/50" />
              <h3 className="mt-4 font-bold text-slate-700">
                No events yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Create your first event to get started.
              </p>
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 rounded-lg bg-[#3154A5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#762A7D]"
              >
                Create Event
              </button>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-2xl border border-[#3154A5]/10 bg-white shadow-sm transition hover:shadow-md"
                >
                  {event.posterUrl ? (
                    <img
                      src={event.posterUrl}
                      alt={event.poster_alt_text || event.title}
                      className="h-52 w-full bg-slate-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-[#3154A5]/5 text-[#3154A5]/50">
                      <ImagePlus size={42} />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          event.is_published
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-purple-50 text-[#762A7D]"
                        }`}
                      >
                        {event.is_published ? "Published" : "Unpublished"}
                      </span>

                      <span className="text-xs text-slate-500">
                        {event.attendance_count ?? 0} attending
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#3154A5]">
                      {event.title}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} className="shrink-0" />
                        {formatDate(event.start_time)}
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock size={16} className="shrink-0" />
                        {new Date(event.start_time).toLocaleTimeString(
                          "en-KE",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>

                      {event.location && (
                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="shrink-0" />
                          {event.location}
                        </p>
                      )}
                    </div>

                    {event.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {event.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(event)}
                        disabled={actionId === event.id}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#3154A5]/20 px-3 py-2 text-sm font-semibold text-[#3154A5] transition hover:bg-[#3154A5]/5 disabled:opacity-50"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePublish(event)}
                        disabled={actionId === event.id}
                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
                      >
                        {actionId === event.id ? (
                          <LoaderCircle size={15} className="animate-spin" />
                        ) : event.is_published ? (
                          <EyeOff size={15} />
                        ) : (
                          <Send size={15} />
                        )}
                        {event.is_published ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        disabled={actionId === event.id}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default LeaderEvents;
