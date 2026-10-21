import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/Logo.jpeg";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const navLinks = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "Events", to: "/events" },
    { id: 3, name: "About", to: "/about" },
    { id: 4, name: "Contact", to: "/contact" },
    { id: 5, name: "Item", to: "/item" },
  ];

  const handleSignUp = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const handleSignIn = () => {
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleLogout = async () => {
    setMenuOpen(false);

    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Unable to log out. Please try again.");
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <header className="relative z-50 w-full border-b-4 border-[#762A7D] bg-[#3154A5] shadow-lg">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="group flex min-w-0 items-center gap-3"
          >
            <img
              src={logo}
              alt="Network Evangelistic Team Logo"
              className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-1 shadow-md sm:h-14 sm:w-14"
            />

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold tracking-wide text-white sm:text-base md:text-lg">
                Network
                <span className="text-[#5BC0E3]"> Evangelistic</span>
                <span> Team</span>
              </h1>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                Jooust Chapter
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className="block rounded-full px-5 py-2.5 font-medium text-white transition-all hover:bg-white hover:text-[#3154A5]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {loading ? null : !isAuthenticated ? (
              <>
                <Button
                  text="Sign in"
                  onClick={handleSignIn}
                  className="rounded-full border border-white/60 bg-transparent px-5 py-2.5 font-semibold text-white hover:bg-white hover:text-[#3154A5]"
                />

                <Button
                  text="Sign Up"
                  onClick={handleSignUp}
                  className="rounded-full bg-[#762A7D] px-6 py-2.5 font-semibold text-white hover:bg-[#5BC0E3] hover:text-[#3154A5]"
                />
              </>
            ) : (
              <>
                <Button
                  text="Profile"
                  onClick={handleProfile}
                  className="rounded-full border border-white/60 bg-transparent px-5 py-2.5 font-semibold text-white hover:bg-white hover:text-[#3154A5]"
                />

                {user?.role === "admin" && (
                  <Button
                    text="Admin"
                    onClick={() => navigate("/admin")}
                    className="rounded-full border border-white/60 bg-transparent px-5 py-2.5 font-semibold text-white hover:bg-white hover:text-[#3154A5]"
                  />
                )}

                <Button
                  text="Logout"
                  onClick={handleLogout}
                  className="rounded-full bg-[#762A7D] px-6 py-2.5 font-semibold text-white hover:bg-[#5BC0E3] hover:text-[#3154A5]"
                />
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`absolute left-0 right-0 top-full lg:hidden ${
            menuOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
        >
          <div className="border-t border-white/20 bg-[#3154A5] px-4 pb-5 pt-3 shadow-2xl transition-opacity duration-300">
            <nav>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.to}
                      onClick={handleLinkClick}
                      className="block rounded-xl px-5 py-3 font-medium text-white hover:bg-white hover:text-[#3154A5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row">
              {loading ? null : !isAuthenticated ? (
                <>
                  <Button
                    text="Sign in"
                    onClick={handleSignIn}
                    className="w-full rounded-xl border border-white/60 bg-transparent px-5 py-3 font-semibold text-white hover:bg-white hover:text-[#3154A5] sm:flex-1"
                  />

                  <Button
                    text="Sign Up"
                    onClick={handleSignUp}
                    className="w-full rounded-xl bg-[#762A7D] px-5 py-3 font-semibold text-white hover:bg-[#5BC0E3] hover:text-[#3154A5] sm:flex-1"
                  />
                </>
              ) : (
                <>
                  <Button
                    text="Profile"
                    onClick={handleProfile}
                    className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-[#3154A5]"
                  />

                  {user?.role === "admin" && (
                    <Button
                      text="Admin"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/admin");
                      }}
                      className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-[#3154A5]"
                    />
                  )}

                  <Button
                    text="Logout"
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-[#762A7D] px-5 py-3 font-semibold text-white hover:bg-[#5BC0E3] hover:text-[#3154A5]"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
