
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
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  UserRound,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Crown,
  LockKeyhole,
  Save,
  UserCog,
  CalendarCheck,
  BookOpen,
  ShieldAlert,
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

const permissionOptions = [
  {
    key: "events.manage",
    title: "Event management",
    description: "Create, edit, publish and delete church events.",
    icon: CalendarCheck,
  },
  {
    key: "devotionals.manage",
    title: "Devotional management",
    description: "Create, edit and publish devotionals.",
    icon: BookOpen,
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("events");

  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [memberPage, setMemberPage] = useState(1);
  const [memberRefreshKey, setMemberRefreshKey] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDetailsLoading, setMemberDetailsLoading] = useState(false);
  const [accessRole, setAccessRole] = useState("member");
  const [accessPermissions, setAccessPermissions] = useState([]);
  const [accessSaving, setAccessSaving] = useState(false);
  const [accessMessage, setAccessMessage] = useState({
    type: "",
    text: "",
  });

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

  useEffect(() => {
    if (activeTab !== "members") return;

    let cancelled = false;

    const fetchMembers = async () => {
      setMembersLoading(true);
      setMembersError("");

      try {
        const params = new URLSearchParams({
          page: String(memberPage),
          limit: "20",
          search: memberSearch,
        });

        const response = await apiRequest(
          `/member/admin?${params.toString()}`
        );

        if (!cancelled) {
          setMembers(response.members || []);
          setPagination(
            response.pagination || {
              page: 1,
              limit: 20,
              total: 0,
              totalPages: 0,
            }
          );
        }
      } catch (error) {
        if (!cancelled) {
          setMembersError(error.message || "Unable to load members.");
        }
      } finally {
        if (!cancelled) {
          setMembersLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      cancelled = true;
    };
  }, [activeTab, memberPage, memberSearch, memberRefreshKey]);

  const refreshEvents = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const refreshMembers = () => {
    setMemberRefreshKey((prev) => prev + 1);
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

  const handleMemberSearch = (e) => {
    setMemberSearch(e.target.value);
    setMemberPage(1);
  };

  const handleMemberDetails = async (id) => {
    setSelectedMember(null);
    setMemberDetailsLoading(true);
    setAccessMessage({ type: "", text: "" });

    try {
      const response = await apiRequest(`/member/admin/${id}`);
      const member = response.member;

      setSelectedMember(member);
      setAccessRole(member.role || "member");
      setAccessPermissions(
        Array.isArray(member.permissions)
          ? member.permissions.map((permission) =>
              typeof permission === "string"
                ? permission
                : permission.permission_key
            )
          : []
      );
    } catch (error) {
      setMembersError(
        error.message || "Unable to retrieve member details."
      );
    } finally {
      setMemberDetailsLoading(false);
    }
  };

  const handlePermissionToggle = (permissionKey) => {
    setAccessPermissions((current) =>
      current.includes(permissionKey)
        ? current.filter((permission) => permission !== permissionKey)
        : [...current, permissionKey]
    );
  };

  const handleAccessSave = async () => {
    if (!selectedMember || selectedMember.role === "admin") return;

    if (accessRole === "member" && accessPermissions.length > 0) {
      setAccessMessage({
        type: "error",
        text: "Members cannot have leader management permissions.",
      });
      return;
    }

    setAccessSaving(true);
    setAccessMessage({ type: "", text: "" });

    try {
      await apiRequest(`/member/admin/${selectedMember.id}/access`, {
        method: "PUT",
        body: JSON.stringify({
          role: accessRole,
          permissions: accessRole === "leader" ? accessPermissions : [],
        }),
      });

      const response = await apiRequest(
        `/member/admin/${selectedMember.id}`
      );

      setSelectedMember(response.member);
      setAccessRole(response.member.role || "member");
      setAccessPermissions(
        Array.isArray(response.member.permissions)
          ? response.member.permissions.map((permission) =>
              typeof permission === "string"
                ? permission
                : permission.permission_key
            )
          : []
      );

      setAccessMessage({
        type: "success",
        text: "Member access updated successfully.",
      });

      refreshMembers();
    } catch (error) {
      setAccessMessage({
        type: "error",
        text: error.message || "Unable to update member access.",
      });
    } finally {
      setAccessSaving(false);
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

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Not available";

    return parsed.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#3154A5] focus:ring-4 focus:ring-[#5BC0E3]/15";

  const roleStyle = (role) => {
    if (role === "admin") {
      return "bg-purple-50 text-[#762A7D] ring-purple-100";
    }

    if (role === "leader") {
      return "bg-amber-50 text-amber-700 ring-amber-100";
    }

    return "bg-blue-50 text-[#3154A5] ring-blue-100";
  };

  return (
    <section className="min-h-screen bg-[#F4F6FA]">
      <div className="relative overflow-hidden bg-[#172B55]">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#5BC0E3]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#762A7D]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
                <ShieldCheck className="h-4 w-4" />
                JOOUST Christian Union
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Administration dashboard
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100/75">
                Manage church events, member accounts and leadership access
                from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <House className="h-4 w-4" />
                Home
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#172B55] transition hover:bg-blue-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-blue-100/70">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm">Total events loaded</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-white tabular-nums">
                {events.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-blue-100/70">
                <Users className="h-5 w-5" />
                <span className="text-sm">Registered members</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-white tabular-nums">
                {pagination.total}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-blue-100/70">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm">Dashboard access</span>
              </div>
              <p className="mt-3 text-xl font-bold text-white">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="mt-7 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setActiveTab("events");
              setSelectedMember(null);
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "events"
                ? "bg-[#3154A5] text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-[#3154A5]"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            Events
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("members");
              setSelectedMember(null);
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "members"
                ? "bg-[#3154A5] text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-[#3154A5]"
            }`}
          >
            <Users className="h-4 w-4" />
            Members
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === "members"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {pagination.total}
            </span>
          </button>
        </div>

        {activeTab === "events" && (
          <div className="mt-7 grid items-start gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#762A7D]">
                    Event management
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#172B55]">
                    {editingId ? "Edit event" : "Create an event"}
                  </h2>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </div>

              <label
                className="mt-6 block text-sm font-semibold text-slate-700"
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
                    className="block text-sm font-semibold text-slate-700"
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
                    className="block text-sm font-semibold text-slate-700"
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
                className="mt-4 block text-sm font-semibold text-slate-700"
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
                className="mt-4 block text-sm font-semibold text-slate-700"
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
                className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#3154A5]/30 bg-[#3154A5]/[0.035] p-5 text-center transition hover:border-[#3154A5] hover:bg-[#3154A5]/[0.06]"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Event poster preview"
                    className="max-h-56 rounded-xl object-contain"
                  />
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3154A5]/10">
                      <ImagePlus className="h-6 w-6 text-[#3154A5]" />
                    </div>
                    <span className="text-sm font-semibold text-[#3154A5]">
                      Upload event poster
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
                  className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                    message.type === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3154A5] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#263F7C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {busy
                  ? editingId
                    ? "Saving changes..."
                    : "Creating event..."
                  : editingId
                    ? "Save changes"
                    : "Create event"}
              </button>
            </form>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#762A7D]">
                    Event overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#172B55]">
                    All events
                  </h2>
                </div>

                <span className="rounded-xl bg-[#3154A5]/10 px-3 py-2 text-sm font-bold text-[#3154A5]">
                  {events.length} events
                </span>
              </div>

              {loading && (
                <p className="mt-5 text-sm text-slate-500">
                  Loading events...
                </p>
              )}

              {eventsError && (
                <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {eventsError}
                </p>
              )}

              {!loading && !eventsError && events.length === 0 && (
                <div className="py-12 text-center">
                  <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 font-semibold text-slate-600">
                    No events yet
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Create your first event using the form.
                  </p>
                </div>
              )}

              <ul className="mt-5 space-y-3">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="rounded-2xl border border-slate-200 p-4 transition hover:border-[#3154A5]/30 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {event.poster_url || event.posterUrl ? (
                        <img
                          src={event.poster_url || event.posterUrl}
                          alt=""
                          className="h-24 w-20 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                          <CalendarDays className="h-6 w-6 text-slate-400" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#172B55]">
                          {event.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {event.date}
                          {event.time ? ` · ${event.time}` : ""}
                        </p>

                        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
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

                    <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        disabled={publishingId === event.id}
                        onClick={() => handlePublish(event)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
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
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#3154A5] transition hover:bg-[#3154A5]/10"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === event.id}
                        onClick={() => handleDelete(event.id, event.title)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
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
        )}

        {activeTab === "members" && (
          <div className="mt-7 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">All accounts</span>
                  <Users className="h-5 w-5 text-[#3154A5]" />
                </div>
                <p className="mt-3 text-3xl font-bold text-[#172B55] tabular-nums">
                  {pagination.total}
                </p>
                <p className="mt-1 text-xs text-slate-400">Registered accounts</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Administrators</span>
                  <ShieldCheck className="h-5 w-5 text-[#762A7D]" />
                </div>
                <p className="mt-3 text-3xl font-bold text-[#172B55] tabular-nums">
                  {members.filter((member) => member.role === "admin").length}
                </p>
                <p className="mt-1 text-xs text-slate-400">On this page</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Leaders</span>
                  <Crown className="h-5 w-5 text-amber-600" />
                </div>
                <p className="mt-3 text-3xl font-bold text-[#172B55] tabular-nums">
                  {members.filter((member) => member.role === "leader").length}
                </p>
                <p className="mt-1 text-xs text-slate-400">On this page</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Members</span>
                  <UserRound className="h-5 w-5 text-[#3154A5]" />
                </div>
                <p className="mt-3 text-3xl font-bold text-[#172B55] tabular-nums">
                  {members.filter((member) => member.role === "member").length}
                </p>
                <p className="mt-1 text-xs text-slate-400">On this page</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#762A7D]">
                    Account directory
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#172B55]">
                    Member management
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review accounts and manage leadership access.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={refreshMembers}
                  disabled={membersLoading}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-[#3154A5]/30 hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      membersLoading ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </button>
              </div>

              <div className="p-5 sm:p-6">
                <div className="relative max-w-lg">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={memberSearch}
                    onChange={handleMemberSearch}
                    placeholder="Search by name, email or phone..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#5BC0E3]/15"
                  />
                </div>

                {membersError && (
                  <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {membersError}
                  </div>
                )}

                {membersLoading ? (
                  <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Loading members...
                  </div>
                ) : members.length === 0 ? (
                  <div className="py-16 text-center">
                    <Users className="mx-auto h-10 w-10 text-slate-300" />
                    <p className="mt-3 font-semibold text-slate-600">
                      No members found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try another search term.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full min-w-[760px] text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                            <th className="px-4 py-4 font-semibold">Member</th>
                            <th className="px-4 py-4 font-semibold">Contact</th>
                            <th className="px-4 py-4 font-semibold">Role</th>
                            <th className="px-4 py-4 font-semibold">Verification</th>
                            <th className="px-4 py-4 text-right font-semibold">
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {members.map((member) => (
                            <tr
                              key={member.id}
                              className="transition hover:bg-slate-50/80"
                            >
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3154A5]/10 text-sm font-bold text-[#3154A5]">
                                    {member.full_name?.charAt(0)?.toUpperCase() || "M"}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-800">
                                      {member.full_name}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                      Joined {formatDate(member.created_at)}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-4">
                                <p className="text-sm text-slate-700">
                                  {member.email}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {member.phone}
                                </p>
                              </td>

                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${roleStyle(member.role)}`}
                                >
                                  {member.role === "admin" ? (
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                  ) : member.role === "leader" ? (
                                    <Crown className="h-3.5 w-3.5" />
                                  ) : (
                                    <UserRound className="h-3.5 w-3.5" />
                                  )}
                                  {member.role === "admin"
                                    ? "Admin"
                                    : member.role === "leader"
                                      ? "Leader"
                                      : "Member"}
                                </span>
                              </td>

                              <td className="px-4 py-4">
                                <div className="space-y-1.5 text-xs">
                                  <p className="flex items-center gap-1.5">
                                    {member.email_verified ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                    ) : (
                                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                                    )}
                                    <span className="text-slate-600">Email</span>
                                  </p>
                                  <p className="flex items-center gap-1.5">
                                    {member.phone_verified ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                    ) : (
                                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                                    )}
                                    <span className="text-slate-600">Phone</span>
                                  </p>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleMemberDetails(member.id)}
                                  className="inline-flex items-center gap-2 rounded-xl bg-[#3154A5]/[0.07] px-3.5 py-2.5 text-sm font-semibold text-[#3154A5] transition hover:bg-[#3154A5] hover:text-white"
                                >
                                  <Eye className="h-4 w-4" />
                                  Manage
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      <p className="text-sm text-slate-500">
                        Page {pagination.page} of{" "}
                        {Math.max(pagination.totalPages, 1)} ·{" "}
                        {pagination.total} accounts
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={memberPage <= 1}
                          onClick={() => setMemberPage((page) => page - 1)}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>

                        <button
                          type="button"
                          disabled={
                            memberPage >= pagination.totalPages ||
                            pagination.totalPages === 0
                          }
                          onClick={() => setMemberPage((page) => page + 1)}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {memberDetailsLoading && (
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-10 text-sm text-slate-500">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Loading member details...
              </div>
            )}

            {selectedMember && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/70 p-5 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3154A5]/10 text-[#3154A5]">
                      <UserRound className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#762A7D]">
                        Account profile
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-[#172B55]">
                        {selectedMember.full_name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${roleStyle(selectedMember.role)}`}
                        >
                          {selectedMember.role}
                        </span>
                        <span className="text-xs text-slate-400">
                          Registered {formatDate(selectedMember.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMember(null);
                      setAccessMessage({ type: "", text: "" });
                    }}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                    aria-label="Close member details"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <h4 className="text-base font-bold text-[#172B55]">
                      Account information
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Contact and verification details.
                    </p>

                    <div className="mt-5 space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Email address
                        </p>
                        <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-700">
                          <Mail className="h-4 w-4 shrink-0 text-[#3154A5]" />
                          {selectedMember.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Phone number
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                          <Phone className="h-4 w-4 text-[#3154A5]" />
                          {selectedMember.phone}
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold text-slate-500">
                            Email verification
                          </p>
                          <p
                            className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${
                              selectedMember.email_verified
                                ? "text-green-700"
                                : "text-red-600"
                            }`}
                          >
                            {selectedMember.email_verified ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {selectedMember.email_verified
                              ? "Verified"
                              : "Not verified"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold text-slate-500">
                            Phone verification
                          </p>
                          <p
                            className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${
                              selectedMember.phone_verified
                                ? "text-green-700"
                                : "text-red-600"
                            }`}
                          >
                            {selectedMember.phone_verified ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {selectedMember.phone_verified
                              ? "Verified"
                              : "Not verified"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Last account update
                        </p>
                        <p className="mt-2 text-sm text-slate-700">
                          {formatDate(selectedMember.updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3154A5]/10 text-[#3154A5]">
                        <UserCog className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#172B55]">
                          Role and permissions
                        </h4>
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          Control which management areas this account can
                          access.
                        </p>
                      </div>
                    </div>

                    {selectedMember.role === "admin" ? (
                      <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50 p-4">
                        <div className="flex items-center gap-2 font-semibold text-[#762A7D]">
                          <ShieldAlert className="h-5 w-5" />
                          Administrator account
                        </div>
                        <p className="mt-2 text-sm leading-6 text-purple-800/80">
                          Administrator access is protected. Ordinary admins
                          cannot modify another administrator's role or
                          permissions.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mt-6">
                          <label
                            htmlFor="member-role"
                            className="text-sm font-semibold text-slate-700"
                          >
                            Account role
                          </label>

                          <select
                            id="member-role"
                            value={accessRole}
                            onChange={(e) => {
                              setAccessRole(e.target.value);
                              if (e.target.value === "member") {
                                setAccessPermissions([]);
                              }
                              setAccessMessage({ type: "", text: "" });
                            }}
                            disabled={accessSaving}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#3154A5] focus:ring-4 focus:ring-[#5BC0E3]/15"
                          >
                            <option value="member">Member</option>
                            <option value="leader">Leader</option>
                          </select>

                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            Leaders receive only the permissions selected
                            below. Members have standard account access.
                          </p>
                        </div>

                        {accessRole === "leader" && (
                          <div className="mt-6">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-700">
                                Management permissions
                              </p>
                              <span className="rounded-full bg-[#3154A5]/10 px-2.5 py-1 text-xs font-semibold text-[#3154A5]">
                                {accessPermissions.length} selected
                              </span>
                            </div>

                            <div className="space-y-3">
                              {permissionOptions.map((permission) => {
                                const Icon = permission.icon;
                                const checked = accessPermissions.includes(
                                  permission.key
                                );

                                return (
                                  <label
                                    key={permission.key}
                                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                                      checked
                                        ? "border-[#3154A5]/40 bg-[#3154A5]/[0.045]"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      disabled={accessSaving}
                                      onChange={() =>
                                        handlePermissionToggle(permission.key)
                                      }
                                      className="mt-1 h-4 w-4 accent-[#3154A5]"
                                    />

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3154A5]/10 text-[#3154A5]">
                                      <Icon className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-semibold text-slate-800">
                                        {permission.title}
                                      </p>
                                      <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {permission.description}
                                      </p>
                                    </div>

                                    {checked && (
                                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#3154A5]" />
                                    )}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {accessRole === "member" && (
                          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-2 text-slate-700">
                              <LockKeyhole className="h-4 w-4 text-[#3154A5]" />
                              <p className="text-sm font-semibold">
                                Standard member access
                              </p>
                            </div>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                              This account will not have event or devotional
                              management permissions.
                            </p>
                          </div>
                        )}

                        {accessMessage.text && (
                          <div
                            role="status"
                            className={`mt-5 rounded-xl p-3 text-sm ${
                              accessMessage.type === "error"
                                ? "bg-red-50 text-red-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {accessMessage.text}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleAccessSave}
                          disabled={accessSaving}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3154A5] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#263F7C] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {accessSaving ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          {accessSaving ? "Saving access..." : "Save access changes"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
