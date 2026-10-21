import { useEffect, useState } from "react";
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
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "Kenya",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await apiRequest("/member/profile");
        const member = data.member ?? data.user ?? data;

        if (active) {
          setUser({
            fullName: member.full_name ?? member.fullName ?? "",
            email: member.email ?? "",
            phone: member.phone ?? "",
            location: "Kenya",
            bio: "",
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load your profile.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);
  const navigation = [
    { name: "Profile", icon: UserRound },
    { name: "Security", icon: ShieldCheck },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ];

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/signin";
    } catch (err) {
      setError(err.message || "Unable to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-[#3154A5]">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#3154A5] px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F5F8FC] text-black">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#3154A5]/15 bg-white px-5 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-[#3154A5] transition hover:bg-[#5BC0E3]/15 md:hidden"
            aria-label={menuOpen ? "Close sidebar" : "Open sidebar"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <LayoutDashboard size={25} className="text-[#3154A5]" />

          <span className="text-lg font-bold text-[#3154A5]">My Account</span>
        </div>

        <div className="flex items-center gap-4">
          <Bell size={20} className="text-[#3154A5]" />

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#5BC0E3] bg-[#3154A5] font-bold text-white">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-4rem)]">
        {menuOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <aside
          className={`fixed bottom-0 left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-white/15 bg-[#3154A5] p-5 text-white transition-transform duration-300 md:sticky md:top-16 md:z-10 md:h-[calc(100vh-4rem)] md:shrink-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="mb-8 flex flex-col items-center border-b border-white/20 pb-6">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#5BC0E3] bg-white text-3xl font-bold text-[#3154A5]">
              {user.fullName.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-center font-bold">{user.fullName}</h2>

            <p className="mt-1 text-sm text-white/75">Personal Account</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map(({ name, icon: Icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setActiveTab(name);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition duration-200 ${
                  activeTab === name
                    ? "border-l-4 border-[#5BC0E3] bg-white font-semibold text-[#3154A5] shadow-sm"
                    : "text-white/90 hover:bg-white/10 hover:text-[#5BC0E3]"
                }`}
              >
                <Icon size={19} />
                <span>{name}</span>
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-[#762A7D]"
          >
            <LogOut size={19} />
            <span>Log out</span>
          </button>

          <div className="mt-5 rounded-lg border border-white/20 bg-white/5 p-3 text-center">
            <p className="text-xs font-semibold tracking-wide text-[#5BC0E3]">
              NETWORK EVANGELISTIC TEAM
            </p>
            <p className="mt-1 text-xs text-white/70">JOOUST Chapter</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-7 md:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 border-l-4 border-[#762A7D] pl-4">
              <p className="mb-2 text-sm font-bold tracking-widest text-[#762A7D]">
                MY ACCOUNT
              </p>

              <h1 className="text-2xl font-extrabold text-[#3154A5] md:text-3xl">
                {activeTab === "Profile" ? "Profile Details" : activeTab}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Manage your account and personal information.
              </p>
            </div>

            {activeTab === "Profile" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Profile updated in this session.");
                }}
                className="overflow-hidden rounded-2xl border border-[#3154A5]/15 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-5 border-b border-[#3154A5]/10 bg-[#3154A5]/[0.03] p-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[#5BC0E3] bg-[#3154A5] text-3xl font-bold text-white">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold text-[#3154A5]">
                      {user.fullName}
                    </h2>

                    <p className="mt-1 break-all text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#3154A5]/25 px-4 py-2 text-sm font-semibold text-[#3154A5] transition hover:border-[#5BC0E3] hover:bg-[#5BC0E3]/10">
                    <Camera size={17} />
                    Change photo
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  {[
                    { label: "Full Name", name: "fullName" },
                    { label: "Email Address", name: "email" },
                    { label: "Phone Number", name: "phone" },
                    { label: "Location", name: "location" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="mb-2 block text-sm font-semibold text-[#3154A5]"
                      >
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.name === "email" ? "email" : "text"}
                        value={user[field.name]}
                        onChange={updateUser}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/25"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="bio"
                      className="mb-2 block text-sm font-semibold text-[#3154A5]"
                    >
                      About Me
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      value={user.bio}
                      onChange={updateUser}
                      rows={3}
                      className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/25"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-[#3154A5]/10 bg-slate-50 px-6 py-4">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#762A7D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3154A5] focus:outline-none focus:ring-2 focus:ring-[#5BC0E3] focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <section className="rounded-2xl border border-[#3154A5]/15 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-bold text-[#3154A5]">
                  {activeTab}
                </h2>

                <p className="text-sm text-slate-600">
                  Manage your {activeTab.toLowerCase()} preferences here.
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
