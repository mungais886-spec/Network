
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  ChevronRight,
  Heart,
  Mail,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/Logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Our Events", to: "/events" },
    { name: "Contact Us", to: "/contact" },
    { name: "Join Our Fellowship", to: "/signup" },
  ];

  const ministryLinks = [
    { name: "Evangelism", to: "/events" },
    { name: "Outreach Programs", to: "/events" },
    { name: "Fellowship", to: "/events" },
    { name: "Bible Study", to: "/events" },
    { name: "Prayer & Worship", to: "/events" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "#" },
    { name: "Instagram", icon: FaInstagram, url: "#" },
    { name: "YouTube", icon: FaYoutube, url: "#" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#8B5A91] text-white">
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1fr] lg:gap-10">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Network Evangelistic Team Logo"
                className="h-14 w-14 rounded-full border-2 border-white/70 bg-white object-contain p-1 shadow-lg transition duration-300 group-hover:scale-105"
              />

              <div>
                <h2 className="text-lg font-extrabold leading-tight tracking-tight">
                  Network
                  <span className="text-white/75"> Evangelistic</span>
                  <span> Team</span>
                </h2>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">
                  JOOUST Chapter
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/85">
              Winning souls for Christ through the proclamation of the Gospel,
              sharing God's love, and raising a generation passionate about
              serving Christ.
            </p>

            <div className="mt-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                Follow our journey
              </p>

              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      aria-label={social.name}
                      target={social.url === "#" ? undefined : "_blank"}
                      rel={social.url === "#" ? undefined : "noreferrer"}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/[0.10] text-white/90 transition duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/20 hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
              <span className="h-5 w-1 rounded-full bg-white/70" />
              Quick Links
            </h3>

            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-white/80 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <ChevronRight
                      size={14}
                      className="text-white/60 transition group-hover:text-white"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
              <span className="h-5 w-1 rounded-full bg-white/70" />
              Our Ministry
            </h3>

            <ul className="space-y-3.5">
              {ministryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-white/80 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <ChevronRight
                      size={14}
                      className="text-white/60 transition group-hover:text-white"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
              <span className="h-5 w-1 rounded-full bg-white/70" />
              Get in Touch
            </h3>

            <p className="mb-5 text-sm leading-6 text-white/80">
              We'd love to hear from you. Connect with our team and be part of
              what God is doing through this ministry.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/[0.10] text-white">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Our Location
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/80">
                    Jaramogi Oginga Odinga University of Science and Technology
                    <br />
                    Bondo, Kenya
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/[0.10] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/60 hover:bg-white/20"
              >
                <Mail size={16} />
                Contact Our Team
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-white/25 bg-white/[0.10] px-6 py-7 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-base font-extrabold text-white sm:text-lg">
                Winning Souls. Changing Lives. Glorifying Christ.
              </p>
              <p className="mt-2 text-sm text-white/80">
                Expanding the Kingdom of God.
              </p>
            </div>

            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#8B5A91] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-white/90"
            >
              Become Part of Us
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/20 bg-[#8B5A91]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <p className="text-xs leading-5 text-white/75">
            © {currentYear} Network Evangelistic Team — JOOUST Chapter. All
            rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-white/75">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link to="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <span className="flex items-center gap-1.5">
              Made with
              <Heart size={12} className="fill-white/80 text-white/80" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
