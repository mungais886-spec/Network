
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../Services/Api.js";
import { useAuth } from "../Context/AuthContext";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Settings,
  LogOut,
  Camera,
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  Home,
  ChevronRight,
  ArrowUpRight,
  Save,
  LockKeyhole,
  Trash2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";

const API_BASE_URL = "http://localhost:3000/api";

const initialProfile = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  department: "",
  yearOfStudy: "",
  role: "member",
  permissions: [],
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#5BC0E3] focus:bg-white focus:ring-4 focus:ring-[#5BC0E3]/10";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState("Profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(initialProfile);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const canManageEvents =
    authUser?.role === "admin" ||
    user?.role === "admin" ||
    (Array.isArray(authUser?.permissions) &&
      authUser.permissions.includes("events.manage")) ||
    (Array.isArray(user?.permissions) &&
      user.permissions.includes("events.manage"));

  const initials = user.fullName
    ? user.fullName.trim().charAt(0).toUpperCase()
    : "U";

  const loadPhoto = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/member/profile/photo`,
        { credentials: "include" }
      );

      if (!response.ok) {
        setPhotoUrl("");
        return;
      }

      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      setPhotoUrl((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl);
        return newUrl;
      });
    } catch {
      setPhotoUrl("");
    }
  };

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await apiRequest("/member/profile");
        const member = data.member ?? data.user ?? data;

        if (!active) return;

        setUser({
          fullName: member.full_name ?? member.fullName ?? "",
          email: member.email ?? "",
          phone: member.phone ?? "",
          location: member.location ?? "",
          bio: member.bio ?? "",
          department: member.department ?? "",
          yearOfStudy: member.year_of_study ?? "",
          role: member.role ?? authUser?.role ?? "member",
          permissions: Array.isArray(member.permissions)
            ? member.permissions
            : Array.isArray(authUser?.permissions)
              ? authUser.permissions
              : [],
        });

        const response = await fetch(
          `${API_BASE_URL}/member/profile/photo`,
          { credentials: "include" }
        );

        if (active && response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          if (active) {
            setPhotoUrl(url);
          } else {
            URL.revokeObjectURL(url);
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load your profile.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!authUser) return;

    setUser((previous) => ({
      ...previous,
      role: authUser.role ?? previous.role,
      permissions: Array.isArray(authUser.permissions)
        ? authUser.permissions
        : previous.permissions,
    }));
  }, [authUser]);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  const navigation = [
    { name: "Profile", icon: UserRound, description: "Personal information" },
    { name: "Security", icon: ShieldCheck, description: "Account protection" },
    { name: "Notifications", icon: Bell, description: "Your notifications" },
    { name: "Settings", icon: Settings, description: "Account preferences" },
  ];

  const updateUser = (event) => {
    setUser((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const goHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  const changeTab = (name) => {
    setActiveTab(name);
    setMenuOpen(false);
    setError("");
    setMessage("");
    setPasswordError("");
    setPasswordMessage("");
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const data = await apiRequest("/member/profile", {
        method: "PUT",
        body: JSON.stringify({
          full_name: user.fullName,
          phone: user.phone,
          location: user.location,
          bio: user.bio,
          department: user.department,
          year_of_study: user.yearOfStudy,
        }),
      });

      const member = data.member;

      setUser((previous) => ({
        ...previous,
        fullName: member.full_name,
        phone: member.phone,
        location: member.location ?? "",
        bio: member.bio ?? "",
        department: member.department ?? "",
        yearOfStudy: member.year_of_study ?? "",
        permissions: Array.isArray(member.permissions)
          ? member.permissions
          : previous.permissions,
      }));

      setMessage(data.message || "Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const photo = event.target.files?.[0];

    if (!photo) return;

    setError("");
    setMessage("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(photo.type)) {
      setError("Please select a JPEG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (photo.size > 5 * 1024 * 1024) {
      setError("Your profile photo cannot exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setPhotoLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const data = await apiRequest("/member/profile/photo", {
        method: "POST",
        body: formData,
      });

      await loadPhoto();
      setMessage(data.message || "Profile photo updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to upload your photo.");
    } finally {
      setPhotoLoading(false);
      event.target.value = "";
    }
  };

  const handleRemovePhoto = async () => {
    setError("");
    setMessage("");
    setRemovingPhoto(true);

    try {
      const data = await apiRequest("/member/profile/photo", {
        method: "DELETE",
      });

      setPhotoUrl((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl);
        return "";
      });

      setMessage(data.message || "Profile photo removed successfully.");
    } catch (err) {
      setError(err.message || "Unable to remove your photo.");
    } finally {
      setRemovingPhoto(false);
    }
  };

  const updatePasswordField = (event) => {
    setPasswords((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("Your new passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setPasswordError("Your new password must contain at least 8 characters.");
      return;
    }

    if (
      new TextEncoder().encode(passwords.newPassword).length > 72
    ) {
      setPasswordError("Your new password cannot exceed 72 bytes.");
      return;
    }

    setPasswordLoading(true);

    try {
      const data = await apiRequest("/member/profile/password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage(data.message || "Password changed successfully.");
    } catch (err) {
      setPasswordError(err.message || "Unable to change your password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F8FC]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#3154A5]/15 border-t-[#3154A5]" />
          <p className="text-sm font-semibold text-[#3154A5]">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (error && !user.fullName) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F8FC] px-5">
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#3154A5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#762A7D]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl p-2 text-[#3154A5] transition hover:bg-[#3154A5]/10 md:hidden"
              aria-label={menuOpen ? "Close sidebar" : "Open sidebar"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3154A5] text-white shadow-sm">
              <LayoutDashboard size={21} />
            </div>

            <div>
              <h1 className="text-base font-extrabold tracking-tight text-[#3154A5] sm:text-lg">
                My Account
              </h1>
              <p className="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
                JOOUST CHRISTIAN UNION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-2 rounded-xl border border-[#3154A5]/15 px-3 py-2 text-sm font-bold text-[#3154A5] transition hover:border-[#5BC0E3] hover:bg-[#5BC0E3]/10 sm:px-4"
            >
              <Home size={17} />
              <span>Home</span>
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#5BC0E3] bg-[#3154A5] text-sm font-extrabold text-white">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : initials}
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-72px)]">
        {menuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <aside
          className={`fixed bottom-0 left-0 top-[72px] z-30 flex h-[calc(100vh-72px)] w-[280px] flex-col bg-[#243F7D] px-5 py-6 text-white shadow-xl transition-transform duration-300 md:sticky md:top-[72px] md:z-10 md:h-[calc(100vh-72px)] md:shrink-0 md:shadow-none ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.07] p-5">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#5BC0E3] bg-white text-3xl font-extrabold text-[#3154A5] shadow-lg">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : initials}
              </div>

              <h2 className="mt-4 max-w-full break-words text-base font-bold">
                {user.fullName}
              </h2>

              <p className="mt-1 max-w-full break-all text-xs text-white/60">
                {user.email}
              </p>

              <span className="mt-3 rounded-full border border-[#5BC0E3]/30 bg-[#5BC0E3]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8DDCF4]">
                {user.role === "admin"
                  ? "Administrator"
                  : user.role === "leader"
                    ? "Team Leader"
                    : "Member"}
              </span>
            </div>
          </div>

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Account menu
          </div>

          <nav className="flex-1 space-y-1.5">
            {navigation.map(({ name, icon: Icon, description }) => (
              <button
                key={name}
                type="button"
                onClick={() => changeTab(name)}
                className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition duration-200 ${
                  activeTab === name
                    ? "border-white/15 bg-white text-[#3154A5] shadow-md"
                    : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                    activeTab === name
                      ? "bg-[#3154A5]/10"
                      : "bg-white/10 group-hover:bg-white/15"
                  }`}
                >
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{name}</span>
                  <span
                    className={`mt-0.5 block text-[10px] ${
                      activeTab === name
                        ? "text-slate-500"
                        : "text-white/45"
                    }`}
                  >
                    {description}
                  </span>
                </span>

                {activeTab === name && <ChevronRight size={17} />}
              </button>
            ))}

            {canManageEvents && (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/leader/events");
                }}
                className="group mt-4 flex w-full items-center gap-3 rounded-xl border border-[#5BC0E3]/25 bg-[#5BC0E3]/10 px-3 py-3 text-left text-white transition hover:border-[#5BC0E3]/60 hover:bg-[#5BC0E3]/20"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5BC0E3]/15 text-[#8DDCF4]">
                  <CalendarDays size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">
                    Event Management
                  </span>
                  <span className="mt-0.5 block text-[10px] text-white/55">
                    Manage CU events
                  </span>
                </span>

                <ArrowUpRight size={16} className="text-[#8DDCF4]" />
              </button>
            )}
          </nav>

          <div className="mt-5 space-y-2 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={goHome}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Home size={19} />
              <span>Back to Home</span>
              <ArrowUpRight size={15} className="ml-auto" />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/80 transition hover:bg-[#762A7D] hover:text-white"
            >
              <LogOut size={19} />
              <span>Log out</span>
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-3 text-center">
            <p className="text-[10px] font-extrabold tracking-[0.15em] text-[#8DDCF4]">
              NETWORK EVANGELISTIC TEAM
            </p>
            <p className="mt-1 text-[10px] text-white/45">
              JOOUST Chapter
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 overflow-hidden rounded-2xl bg-[#3154A5] shadow-lg shadow-[#3154A5]/10">
              <div className="relative p-6 sm:p-8 lg:p-9">
                <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/[0.05]" />
                <div className="absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-[#5BC0E3]/10" />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8DDCF4]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8DDCF4]" />
                    Member dashboard
                  </div>

                  <h1 className="max-w-2xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                    Welcome back, {user.fullName.split(" ")[0] || "Member"}.
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                    Your account information and personal settings are all in
                    one place. Stay connected with the JOOUST Christian Union.
                  </p>

                  <button
                    type="button"
                    onClick={goHome}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#3154A5] shadow-sm transition hover:bg-[#EAF8FC]"
                  >
                    Visit Home Page
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#762A7D]">
                  Account overview
                </p>

                <h2 className="text-2xl font-extrabold text-[#243F7D] sm:text-3xl">
                  {activeTab === "Profile" ? "Profile Details" : activeTab}
                </h2>

                <p className="mt-1.5 text-sm text-slate-500">
                  Manage your account and personal information.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[#3154A5]/10 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:flex">
                <ShieldCheck size={15} className="text-[#3154A5]" />
                Account Dashboard
              </div>
            </div>

            {(error || message) && (
              <div
                role="status"
                className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {error || message}
              </div>
            )}

            {activeTab === "Profile" && (
              <div className="space-y-6">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <h3 className="font-bold text-[#243F7D]">
                      Personal information
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Update your personal details and profile photo.
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 border-b border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:px-7">
                    <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#5BC0E3] bg-[#3154A5] text-3xl font-extrabold text-white shadow-sm">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Your profile"
                          className="h-full w-full object-cover"
                        />
                      ) : initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-lg font-extrabold text-[#243F7D]">
                        {user.fullName}
                      </h3>
                      <p className="mt-1 break-all text-sm text-slate-500">
                        {user.email}
                      </p>
                      <p className="mt-2 text-xs font-medium text-slate-400">
                        JPEG, PNG or WebP · Maximum 5 MB
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={photoLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#3154A5]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#3154A5] transition hover:border-[#5BC0E3] hover:bg-[#5BC0E3]/10 disabled:opacity-50"
                      >
                        <Camera size={16} />
                        {photoLoading ? "Uploading..." : "Change photo"}
                      </button>

                      {photoUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          disabled={removingPhoto}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                          {removingPhoto ? "Removing..." : "Remove"}
                        </button>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile}>
                    <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-7">
                      <div>
                        <label htmlFor="fullName" className={labelClass}>
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={user.fullName}
                          onChange={updateUser}
                          minLength={2}
                          maxLength={150}
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={user.email}
                          readOnly
                          className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-500`}
                        />
                        <p className="mt-1.5 text-[11px] text-slate-400">
                          Email changes require verification.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={user.phone}
                          onChange={updateUser}
                          placeholder="+2547..."
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="location" className={labelClass}>
                          <span className="inline-flex items-center gap-2">
                            <MapPin size={14} />
                            Location
                          </span>
                        </label>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          value={user.location}
                          onChange={updateUser}
                          maxLength={150}
                          placeholder="Your location"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="department" className={labelClass}>
                          <span className="inline-flex items-center gap-2">
                            <GraduationCap size={14} />
                            Department
                          </span>
                        </label>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          value={user.department}
                          onChange={updateUser}
                          maxLength={150}
                          placeholder="Your academic department"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="yearOfStudy" className={labelClass}>
                          Year of Study
                        </label>
                        <input
                          id="yearOfStudy"
                          name="yearOfStudy"
                          type="text"
                          value={user.yearOfStudy}
                          onChange={updateUser}
                          maxLength={30}
                          placeholder="e.g. Year 2"
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="bio" className={labelClass}>
                          About Me
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={user.bio}
                          onChange={updateUser}
                          rows={4}
                          maxLength={1000}
                          placeholder="Tell us a little about yourself..."
                          className={`${inputClass} resize-y`}
                        />
                        <p className="mt-1 text-right text-[11px] text-slate-400">
                          {user.bio.length}/1000
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                      <p className="text-[11px] text-slate-400">
                        Your changes are saved to your account.
                      </p>

                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3154A5] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#243F7D] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={16} />
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => changeTab("Security")}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#5BC0E3] hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3154A5]/10 text-[#3154A5]">
                      <ShieldCheck size={21} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#243F7D]">
                        Security
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Change your account password
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#3154A5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => changeTab("Settings")}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#5BC0E3] hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#762A7D]/10 text-[#762A7D]">
                      <Settings size={21} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#243F7D]">
                        Account Settings
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Account information and preferences
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#3154A5]" />
                  </button>
                </section>
              </div>
            )}

            {activeTab === "Security" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-4 border-b border-slate-100 p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3154A5]/10 text-[#3154A5]">
                    <ShieldCheck size={23} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#243F7D]">
                      Password and security
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Keep your account secure by using a strong password.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="max-w-2xl space-y-5 p-6 sm:p-8">
                  {passwordError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {passwordError}
                    </div>
                  )}

                  {passwordMessage && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {passwordMessage}
                    </div>
                  )}

                  <div>
                    <label htmlFor="currentPassword" className={labelClass}>
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      value={passwords.currentPassword}
                      onChange={updatePasswordField}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className={labelClass}>
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.newPassword}
                      onChange={updatePasswordField}
                      minLength={8}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.confirmPassword}
                      onChange={updatePasswordField}
                      minLength={8}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                    Your current password is verified before the new password
                    is saved. Use at least 8 characters.
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3154A5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#243F7D] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LockKeyhole size={16} />
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </section>
            )}

            {activeTab === "Notifications" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-4 border-b border-slate-100 p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3154A5]/10 text-[#3154A5]">
                    <Bell size={23} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#243F7D]">
                      Notifications
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage how you receive account and church updates.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Bell size={19} className="mt-0.5 shrink-0 text-[#3154A5]" />
                    <div>
                      <h4 className="text-sm font-bold text-[#243F7D]">
                        Notification preferences are not configured yet
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        We'll connect this section to saved notification
                        preferences so your choices are remembered across
                        devices.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Settings" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-4 border-b border-slate-100 p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#762A7D]/10 text-[#762A7D]">
                    <Settings size={23} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#243F7D]">
                      Account information
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Review your account registration details.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 px-6 sm:px-8">
                  <div className="flex items-center gap-4 py-5">
                    <Mail size={19} className="text-[#3154A5]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Email address</p>
                      <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                        {user.email}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                      {authUser?.email_verified ? "Verified" : "Account email"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-5">
                    <Phone size={19} className="text-[#3154A5]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Phone number</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {user.phone}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      authUser?.phone_verified
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {authUser?.phone_verified ? "Verified" : "Not verified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-5">
                    <ShieldCheck size={19} className="text-[#3154A5]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Account role</p>
                      <p className="mt-1 text-sm font-semibold capitalize text-slate-700">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-5">
                    <UserRound size={19} className="text-[#3154A5]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Member since</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        Your account registration date is available in your
                        account record.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:px-8">
                  <p className="text-xs leading-5 text-slate-500">
                    For changes to your email address or account role, contact
                    the church website administrator.
                  </p>
                </div>
              </section>
            )}

            <footer className="mt-10 border-t border-slate-200 py-5 text-center">
              <p className="text-xs font-semibold text-slate-400">
                JOOUST CHRISTIAN UNION · NETWORK EVANGELISTIC TEAM
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                In pursuit for eternal glory.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
