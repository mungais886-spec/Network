
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#3d023cdc] text-white">
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#3154A5]/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#762A7D]/20 blur-3xl"></div>

      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            
            <div className="lg:col-span-1">
              <Link to="/" className="group inline-flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#5BC0E3] opacity-30 blur-md transition duration-300 group-hover:opacity-60"></div>

                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-lg">
                    <img
                      src="/src/assets/Logo.jpeg"
                      alt="Network Evangelistic Team Logo"
                      className="h-full w-full rounded-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-extrabold leading-tight">
                    Network
                    <span className="text-[#5BC0E3]"> Evangelistic</span>
                    <span> Team</span>
                  </h2>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Jooust Chapter
                  </p>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                Winning souls for Christ by sharing the Gospel, spreading the
                love of God, and building a generation passionate about
                serving Christ.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3154A5]/30 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#000000]"
                  aria-label="Facebook"
                >
                  f
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3154A5]/30 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#000000]"
                  aria-label="Instagram"
                >
                  ig
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3154A5]/30 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#000000]"
                  aria-label="YouTube"
                >
                  ▶
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3154A5]/30 text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#000000]"
                  aria-label="WhatsApp"
                >
                  wa
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#5BC0E3]">
                Quick Links
              </h3>

              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <Link
                    to="/"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/signup"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Join Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#5BC0E3]">
                Our Ministry
              </h3>

              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Evangelism
                  </Link>
                </li>

                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Outreach Programs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Fellowship
                  </Link>
                </li>

                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Bible Study
                  </Link>
                </li>

                <li>
                  <Link
                    to="/events"
                    className="transition duration-200 hover:pl-1 hover:text-[#5BC0E3]"
                  >
                    Prayer & Worship
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#5BC0E3]">
                Stay Connected
              </h3>

              <p className="text-sm leading-6 text-white/60">
                Stay updated with our upcoming events, outreaches, and
                activities.
              </p>

              <div className="mt-5 flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                />

                <button className="bg-[#762A7D] px-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#5BC0E3] hover:text-[#000000]">
                  Join
                </button>
              </div>

              <div className="mt-6 space-y-3 text-sm text-white/60">
                <p className="flex items-start gap-3">
                  <span className="text-[#5BC0E3]"></span>
                  <span>Network Evangelistic Team</span>
                </p>

                <p className="flex items-start gap-3">
                  <span className="text-[#5BC0E3]"></span>
                  <span>Jooust Chapter</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-b border-white/10 bg-[#3154A5]/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <p className="text-sm font-semibold text-white">
              Winning Souls. Changing Lives. Glorifying Christ.
            </p>

            <p className="mt-1 text-xs text-white/40">
              Network Evangelistic Team — Jooust Chapter
            </p>
          </div>

          <Link
            to="/contact"
            className="rounded-full border border-[#5BC0E3]/50 px-5 py-2 text-xs font-semibold text-[#5BC0E3] transition duration-300 hover:bg-[#5BC0E3] hover:text-[#000000]"
          >
            Get Involved
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-white/40 sm:px-6 md:flex-row md:text-left lg:px-8">
        <p>
          © {currentYear} Network Evangelistic Team — Jooust Chapter. All
          rights reserved.
        </p>

        <div className="flex gap-5">
          <Link
            to="/privacy"
            className="transition hover:text-[#5BC0E3]"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="transition hover:text-[#5BC0E3]"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
