
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/Logo.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      id: 1,
      name: "Home",
      to: "/",
    },
    {
      id: 2,
      name: "Events",
      to: "/events",
    },
    {
      id: 3,
      name: "About",
      to: "/about",
    },
    {
      id: 4,
      name: "Contact",
      to: "/contact",
    },
  ];

  const navigate = useNavigate();

  const handleSignUp = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const handleSignIn = () => {
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full border-b-4 border-[#762A7D] bg-[#3154A5] shadow-lg">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex min-w-0 items-center">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="group flex items-center gap-3"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#5BC0E3] opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-70"></div>

                <img
                  src={logo}
                  alt="Network Evangelistic Team Logo"
                  className="relative h-12 w-12 rounded-full bg-white object-contain p-1 shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-sm font-extrabold leading-tight tracking-wide text-white sm:text-base md:text-lg">
                  Network
                  <span className="text-[#5BC0E3]"> Evangelistic</span>
                  <span className="text-white"> Team</span>
                </h1>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                  Jooust Chapter
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-2 shadow-sm backdrop-blur-md">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="block rounded-full px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-white hover:text-[#3154A5] hover:shadow-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center justify-end gap-3 lg:flex">
            <Button
              text="Sign in"
              onClick={handleSignIn}
              className="rounded-full border border-white/60 bg-transparent px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#3154A5]"
            />

            <Button
              onClick={handleSignUp}
              text="Sign Up"
              className="rounded-full bg-[#762A7D] px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5BC0E3] hover:text-[#3154A5] hover:shadow-lg"
            />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white hover:text-[#3154A5] lg:hidden"
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
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
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
                      className="block rounded-xl px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-[#3154A5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row">
              <Button
                text="Sign in"
                onClick={handleSignIn}
                className="w-full rounded-xl border border-white/60 bg-transparent px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#3154A5] sm:flex-1"
              />

              <Button
                text="Sign Up"
                onClick={handleSignUp}
                className="w-full rounded-xl bg-[#762A7D] px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#5BC0E3] hover:text-[#3154A5] sm:flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;