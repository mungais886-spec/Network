
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Home as HomeIcon,
  BookOpen,
  Target,
  CalendarDays,
  Mail,
  HeartHandshake,
  Play,
  Users
} from "lucide-react";
import logo from "../assets/Logo.jpeg";
import { useAuth } from "../Context/AuthContext";
import HeaderCard from "./HeaderCard";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const navLinks = [
    { id: 2, name: "Events", to: "/events" },
    { id: 3, name: "About", to: "/about" },
    { id: 4, name: "Contact", to: "/contact" },
    { id: 5, name: "Leaders", to: "/learders" },
  ];

const homeSections = [
  { name: "Welcome", id: "welcome", icon: HomeIcon },
  { name: "Our Mission", id: "mission", icon: Target },
  { name: "What We Do", id: "what-we-do", icon: HeartHandshake },
  { name: "Devotional", id: "devotional", icon: BookOpen },
  { name: "Upcoming Events", id: "events", icon: CalendarDays },
  { name: "Latest Sermons", id: "sermons", icon: Play },
  { name: "Join Fellowship", id: "join", icon: Users },
  { name: "Contact", id: "contact", icon: Mail },
];

  const closeMenu = () => {
    setMenuOpen(false);
    setHomeDropdownOpen(false);
  };

  const navigateTo = (path) => {
    closeMenu();
    navigate(path);
  };

  const navigateToSection = (sectionId) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, "", `/#${sectionId}`);
    }
  };

  const handleLogout = async () => {
    closeMenu();

    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Unable to log out. Please try again.");
    }
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <HeaderCard />

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#203F82]/95 shadow-lg shadow-[#142D63]/10 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[76px] items-center justify-between">
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Network Evangelistic Team"
                  className="h-12 w-12 rounded-full border-2 border-white/80 bg-white object-contain p-0.5 transition duration-300 group-hover:scale-105 sm:h-[52px] sm:w-[52px]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#203F82] bg-[#5BC0E3]" />
              </div>

              <div>
                <h1 className="text-[15px] font-extrabold leading-tight tracking-tight text-white sm:text-base">
                  Network Evangelistic
                  <span className="block text-[#5BC0E3]">Team</span>
                </h1>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  JOOUST Chapter
                </p>
              </div>
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-1">
                <li className="relative">
                  <div className="flex items-center rounded-lg bg-white/10">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className={`rounded-l-lg px-4 py-2.5 text-[13px] font-semibold transition ${
                        isActive("/")
                          ? "text-[#5BC0E3]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      Home
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setHomeDropdownOpen(!homeDropdownOpen)
                      }
                      aria-label="Toggle homepage sections"
                      aria-expanded={homeDropdownOpen}
                      className="rounded-r-lg px-2 py-2.5 text-white/80 transition hover:text-[#5BC0E3]"
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          homeDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {homeDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-black/15">
                      <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Explore Homepage
                      </p>

                      {homeSections.map((section) => {
                        const Icon = section.icon;

                        return (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() =>
                              navigateToSection(section.id)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#3154A5]"
                          >
                            <Icon size={16} className="text-[#3154A5]" />
                            {section.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>

                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.to}
                      className={`relative flex items-center rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                        isActive(link.to)
                          ? "bg-white/10 text-[#5BC0E3]"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive(link.to) && (
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#5BC0E3]" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              {loading ? (
                <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
              ) : !isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigateTo("/signin")}
                    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:text-[#5BC0E3]"
                  >
                    Sign in
                  </button>

                  <button
                    onClick={() => navigateTo("/signup")}
                    className="group flex items-center gap-2 rounded-lg bg-[#5BC0E3] px-5 py-2.5 text-sm font-bold text-[#17366F] transition duration-200 hover:bg-white"
                  >
                    Join Fellowship
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateTo("/profile")}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#5BC0E3]/50 hover:bg-white/15"
                  >
                    <UserRound size={16} />
                    Profile
                  </button>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => navigateTo("/admin")}
                      className="flex items-center gap-2 rounded-lg bg-[#762A7D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8D3695]"
                    >
                      <LayoutDashboard size={16} />
                      Admin
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-[#0D1D40]/20 lg:hidden"
            />

            <div className="absolute right-4 top-[calc(100%+10px)] z-50 w-[min(290px,calc(100vw-32px))] origin-top-right rounded-2xl border border-white/15 bg-[#203F82] p-3 shadow-2xl shadow-[#0D1D40]/35 ring-1 ring-black/10 sm:right-6 lg:hidden">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 px-2 pb-3">
                <div>
                  <p className="text-sm font-bold text-white">Navigation</p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
                    JOOUST Chapter
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white"
                  aria-label="Close navigation"
                >
                  <X size={17} />
                </button>
              </div>

              <nav>
                <ul className="space-y-1">
                  <li>
                    <div className="flex items-center rounded-xl bg-white/10">
                      <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex-1 rounded-l-xl px-3 py-2.5 text-[13px] font-semibold text-[#5BC0E3]"
                      >
                        Home
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setHomeDropdownOpen(!homeDropdownOpen)
                        }
                        aria-label="Toggle homepage sections"
                        aria-expanded={homeDropdownOpen}
                        className="px-3 py-2.5 text-white/80"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            homeDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {homeDropdownOpen && (
                      <div className="ml-3 mt-1 space-y-1 border-l border-white/15 pl-3">
                        {homeSections.map((section) => {
                          const Icon = section.icon;

                          return (
                            <button
                              key={section.id}
                              type="button"
                              onClick={() =>
                                navigateToSection(section.id)
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-[#5BC0E3]"
                            >
                              <Icon size={15} />
                              {section.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </li>

                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${
                          isActive(link.to)
                            ? "bg-[#5BC0E3]/15 text-[#5BC0E3]"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {link.name}
                        {isActive(link.to) && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5BC0E3]" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-3 border-t border-white/10 pt-3">
                {loading ? (
                  <div className="h-9 animate-pulse rounded-lg bg-white/10" />
                ) : !isAuthenticated ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigateTo("/signin")}
                      className="flex-1 rounded-xl border border-white/20 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      Sign in
                    </button>

                    <button
                      onClick={() => navigateTo("/signup")}
                      className="flex-1 rounded-xl bg-[#5BC0E3] px-3 py-2.5 text-xs font-bold text-[#17366F] transition hover:bg-white"
                    >
                      Join Fellowship
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-white/85 transition hover:bg-white/10"
                    >
                      <UserRound size={16} />
                      My Profile
                    </button>

                    {user?.role === "admin" && (
                      <button
                        onClick={() => navigateTo("/admin")}
                        className="flex w-full items-center gap-3 rounded-xl bg-[#762A7D] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8D3695]"
                      >
                        <LayoutDashboard size={16} />
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Navbar;
