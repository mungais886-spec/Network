<<<<<<< Updated upstream
import React, { useState } from "react";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
=======

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  X,
  Download,
  Users,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Send,
  Timer,
  CalendarCheck,
  LoaderCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import useEvents from "../hooks/useEvents";
import Footer from "../Components/Footer";

<<<<<<< Updated upstream
const parseDate = (d) => new Date(`${d}T00:00:00`);
=======
const PURPLE = "#8B5A91";

const parseEventDate = (event) => {
  const value =
    event.start_time ||
    (event.date && event.time ? `${event.date}T${event.time}` : event.date);

  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseEventEndDate = (event) => {
  const value =
    event.end_time ||
    event.start_time ||
    (event.date && event.time ? `${event.date}T${event.time}` : event.date);

  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const isRsvpConfirmed = (value) => {
  if (value === true) return true;
  if (typeof value === "string") return value === "confirmed";
  if (value && typeof value === "object") {
    return value.status === "confirmed";
  }
  return false;
};

const formatDate = (date) =>
  date.toLocaleDateString("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getCountdown = (date, now) => {
  const difference = Math.max(0, date.getTime() - now);

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: difference === 0,
  };
};

const pad = (value) => String(value).padStart(2, "0");

const Countdown = ({ date, now }) => {
  const countdown = getCountdown(date, now);

  if (countdown.expired) {
    return (
      <p className="text-sm font-semibold" style={{ color: PURPLE }}>
        Event has started
      </p>
    );
  }

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="rounded-lg border border-[#3154A5]/10 bg-white px-2 py-2.5 text-center"
        >
          <p className="text-lg font-extrabold tabular-nums text-[#18366F]">
            {pad(unit.value)}
          </p>
          <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
};

const PosterImage = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#18366F] ${className}`}
      >
        <div className="text-center">
          <ImageIcon size={42} className="mx-auto text-white/50" />
          <p className="mt-2 text-xs font-medium text-white/50">
            Event poster
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
>>>>>>> Stashed changes

const Events = () => {
  const { events, loading, error } = useEvents();
  const [active, setActive] = useState(null);
<<<<<<< Updated upstream

  return (
    <>
      <section className="relative overflow-hidden bg-[#3855A5] px-6 py-14 text-center text-white sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[3px] border-[#762A7D]/60" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[3px] border-[#6BCDF2]/30" />
        <span className="relative inline-block rounded-full border border-[#6BCDF2]/60 bg-[#6BCDF2]/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[#6BCDF2]">
          Join us
        </span>
        <h1 className="relative mt-4 text-4xl font-bold sm:text-5xl">Upcoming Events</h1>
        <p className="relative mx-auto mt-3 max-w-xl text-white/85">
          Gatherings, outreaches and fellowship moments. There's a place for you at each one.
        </p>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 animate-pulse rounded-2xl bg-slate-100" />
              ))}
=======
  const [activeTab, setActiveTab] = useState("upcoming");
  const [confirmed, setConfirmed] = useState({});
  const [attendanceCounts, setAttendanceCounts] = useState({});
  const [rsvpLoading, setRsvpLoading] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentSending, setCommentSending] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!active) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [active]);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = [];
    const past = [];

    events.forEach((event) => {
      const endDate = parseEventEndDate(event);

      if (endDate && endDate.getTime() >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    upcoming.sort((a, b) => parseEventDate(a) - parseEventDate(b));
    past.sort((a, b) => parseEventEndDate(b) - parseEventEndDate(a));

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
    };
  }, [events, now]);

  const visibleEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const handleDownload = async (event) => {
    if (!event.posterUrl) return;

    try {
      const response = await fetch(event.posterUrl);

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${event.title.replace(/[^a-z0-9]/gi, "-")}-poster`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      window.open(event.posterUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleRSVP = async (event) => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const alreadyConfirmed =
      confirmed[event.id] ?? isRsvpConfirmed(event.user_rsvp);

    if (alreadyConfirmed) return;

    setRsvpLoading(event.id);

    try {
      const response = await apiRequest(`/events/${event.id}/rsvp`, {
        method: "POST",
        body: JSON.stringify({ status: "confirmed" }),
      });

      setConfirmed((prev) => ({
        ...prev,
        [event.id]: true,
      }));

      setAttendanceCounts((prev) => ({
        ...prev,
        [event.id]:
          response.attendance_count !== undefined
            ? Number(response.attendance_count)
            : Number(prev[event.id] ?? event.attendance_count ?? 0) + 1,
      }));
    } catch (err) {
      alert(
        err.message || "Unable to confirm your attendance. Please try again.",
      );
    } finally {
      setRsvpLoading(null);
    }
  };

  const handleCancelRSVP = async (event) => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const alreadyConfirmed =
      confirmed[event.id] ?? isRsvpConfirmed(event.user_rsvp);

    if (!alreadyConfirmed) return;

    setRsvpLoading(event.id);

    try {
      const response = await apiRequest(`/events/${event.id}/rsvp`, {
        method: "DELETE",
      });

      setConfirmed((prev) => ({
        ...prev,
        [event.id]: false,
      }));

      setAttendanceCounts((prev) => ({
        ...prev,
        [event.id]:
          response.attendance_count !== undefined
            ? Number(response.attendance_count)
            : Math.max(
                0,
                Number(prev[event.id] ?? event.attendance_count ?? 0) - 1,
              ),
      }));
    } catch (err) {
      alert(err.message || "Unable to cancel your RSVP. Please try again.");
    } finally {
      setRsvpLoading(null);
    }
  };

  const openEvent = async (event) => {
    setActive(event);
    setComments([]);
    setCommentText("");
    setCommentError("");
    setCommentSuccess("");
    setCommentsLoading(true);

    try {
      const response = await apiRequest(`/events/${event.id}/comments`);
      setComments(response.comments ?? response ?? []);
    } catch (err) {
      setCommentError(
        err.message || "Unable to load comments. Please try again.",
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/signin");
      return;
    }

    if (!commentText.trim() || !active) return;

    setCommentSending(true);
    setCommentError("");
    setCommentSuccess("");

    try {
      const response = await apiRequest(`/events/${active.id}/comments`, {
        method: "POST",
        body: JSON.stringify({ comment: commentText.trim() }),
      });

      const newComment = response.comment ?? response;

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      setCommentSuccess("Your comment has been posted.");
    } catch (err) {
      setCommentError(err.message || "Unable to post your comment.");
    } finally {
      setCommentSending(false);
    }
  };

  const EventCard = ({ event, past = false }) => {
    const date = parseEventDate(event);
    const isConfirmed = confirmed[event.id] ?? isRsvpConfirmed(event.user_rsvp);
    const attendance =
      attendanceCounts[event.id] ?? Number(event.attendance_count ?? 0);
    const hasStarted = date ? date.getTime() <= now : false;

    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_18px_rgba(24,54,111,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#3154A5]/25 hover:shadow-[0_16px_36px_rgba(24,54,111,0.11)]">
        <div className="relative flex h-[300px] items-center justify-center overflow-hidden bg-[#EDF0F6]">
          <PosterImage
            src={event.posterUrl}
            alt={`${event.title} poster`}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
          />

          {date && (
            <div className="absolute left-4 top-4 min-w-[58px] rounded-xl border border-white/70 bg-white/95 px-3 py-2 text-center shadow-md backdrop-blur">
              <p
                className="text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: PURPLE }}
              >
                {date.toLocaleDateString("en-KE", { month: "short" })}
              </p>
              <p className="text-2xl font-black leading-none text-[#18366F]">
                {date.getDate()}
              </p>
            </div>
          )}

          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
              past
                ? "bg-slate-800 text-white"
                : "bg-[#5BC0E3] text-[#18366F]"
            }`}
          >
            {past ? "Completed" : "Upcoming"}
          </span>

          <button
            type="button"
            onClick={() => handleDownload(event)}
            disabled={!event.posterUrl}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/95 text-[#18366F] shadow-md transition hover:bg-[#5BC0E3] disabled:cursor-not-allowed disabled:opacity-50"
            title="Download event poster"
            aria-label="Download event poster"
          >
            <Download size={17} />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex-1">
            <h3 className="text-lg font-extrabold leading-snug text-[#18366F] transition group-hover:text-[#3154A5] sm:text-xl">
              {event.title}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3154A5]/[0.07] text-[#3154A5]">
                  <CalendarDays size={16} />
                </span>
                <span>{date ? formatDate(date) : event.date}</span>
              </div>

              {event.time && (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3154A5]/[0.07] text-[#3154A5]">
                    <Clock size={16} />
                  </span>
                  <span>{event.time}</span>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3154A5]/[0.07] text-[#3154A5]">
                    <MapPin size={16} />
                  </span>
                  <span>{event.venue}</span>
                </div>
              )}
            </div>

            {event.description && (
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
                {event.description}
              </p>
            )}
          </div>

          {!past && date && (
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#3154A5]">
                <Timer size={15} />
                Event starts in
              </div>
              <Countdown date={date} now={now} />
            </div>
          )}

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-500">
              {past ? (
                <>
                  <MessageCircle size={16} style={{ color: PURPLE }} />
                  <span>Share your experience</span>
                </>
              ) : (
                <>
                  <Users size={16} className="text-[#3154A5]" />
                  <span>{attendance} attending</span>
                </>
              )}
            </div>

            {past ? (
              <button
                type="button"
                onClick={() => openEvent(event)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-extrabold transition hover:bg-[#8B5A91]/10"
                style={{ color: PURPLE }}
              >
                Discuss
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  isConfirmed ? handleCancelRSVP(event) : handleRSVP(event)
                }
                disabled={
                  rsvpLoading === event.id || (!isConfirmed && hasStarted)
                }
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${
                  isConfirmed
                    ? "bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-700"
                    : "bg-[#3154A5] text-white shadow-sm hover:bg-[#18366F]"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {rsvpLoading === event.id ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : isConfirmed ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <CalendarCheck size={15} />
                )}

                {rsvpLoading === event.id
                  ? "Please wait..."
                  : isConfirmed
                    ? "Cancel RSVP"
                    : hasStarted
                      ? "Event started"
                      : "Attend"}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <main className="min-h-screen bg-[#F7F8FC]">
        <section className="relative overflow-hidden bg-[#3154A5] px-5 py-8 text-white sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full border border-[#5BC0E3]/20" />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#5BC0E3]">
                <CalendarDays size={21} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A9E8FA]">
                  NET JOOUST
                </p>
                <h1 className="mt-0.5 text-2xl font-extrabold sm:text-3xl">
                  Events
                </h1>
              </div>
>>>>>>> Stashed changes
            </div>
          )}

<<<<<<< Updated upstream
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && events.length === 0 && (
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <CalendarDays className="mx-auto h-10 w-10 text-[#3855A5]" />
              <h2 className="mt-4 text-xl font-bold text-[#3855A5]">No upcoming events yet</h2>
              <p className="mt-2 text-slate-600">Check back soon. New events are posted here as they're planned.</p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const date = parseDate(event.date);
              return (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => setActive(event)}
                    className="relative block w-full overflow-hidden bg-slate-100"
                    aria-label={`View ${event.title} poster`}
                  >
                    <img
                      src={event.posterUrl}
                      alt={`${event.title} poster`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-xl bg-white px-3 py-1.5 text-center shadow-lg">
                      <p className="text-xs font-bold uppercase text-[#762A7D]">
                        {date.toLocaleDateString("en-KE", { month: "short" })}
                      </p>
                      <p className="text-xl font-bold leading-none text-[#3855A5]">{date.getDate()}</p>
                    </div>
                  </button>

                  <div className="p-5">
                    <h2 className="text-lg font-bold text-[#3855A5]">{event.title}</h2>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                      {event.time && (
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#6BCDF2]" /> {event.time}
                        </li>
                      )}
                      {event.venue && (
                        <li className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#6BCDF2]" /> {event.venue}
                        </li>
                      )}
                    </ul>
                    {event.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {event.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
=======
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
              Find upcoming gatherings and explore moments from our past events.
            </p>
          </div>
        </section>

        <section
          id="event-list"
          className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p
                  className="text-xs font-extrabold uppercase tracking-[0.2em]"
                  style={{ color: PURPLE }}
                >
                  Stay connected
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#18366F] sm:text-4xl">
                  Explore our events
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  Be part of what God is doing in our community. Find an event,
                  save its poster and confirm your attendance.
                </p>
              </div>

              <div className="flex w-full rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition sm:flex-none ${
                    activeTab === "upcoming"
                      ? "bg-[#3154A5] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-[#18366F]"
                  }`}
                >
                  Upcoming
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "upcoming"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {upcomingEvents.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("past")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition sm:flex-none ${
                    activeTab === "past"
                      ? "bg-[#3154A5] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-[#18366F]"
                  }`}
                >
                  Past
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "past"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {pastEvents.length}
                  </span>
                </button>
              </div>
            </div>

            {loading && (
              <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                  >
                    <div className="h-[300px] animate-pulse bg-slate-200" />
                    <div className="space-y-4 p-6">
                      <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                      <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && visibleEvents.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3154A5]/10 text-[#3154A5]">
                  <CalendarDays size={29} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-[#18366F]">
                  {activeTab === "upcoming"
                    ? "No upcoming events yet"
                    : "No past events available"}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                  {activeTab === "upcoming"
                    ? "New gatherings and activities will appear here as soon as they are announced. Check back soon."
                    : "Our previous events will be displayed here. Come back to share your experiences."}
                </p>
              </div>
            )}

            {!loading && !error && visibleEvents.length > 0 && (
              <>
                <div className="mt-9 mb-5 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-400">
                    {visibleEvents.length}{" "}
                    {activeTab === "upcoming" ? "upcoming" : "past"}{" "}
                    {visibleEvents.length === 1 ? "event" : "events"}
                  </p>
                  <span className="h-px flex-1 max-w-32 bg-slate-200" />
                </div>

                <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      past={activeTab === "past"}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="bg-[#18366F] px-5 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5BC0E3]">
                Stay involved
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-white">
                There is a place for you here.
              </h2>

              <p className="mt-2 text-sm text-white/70">
                Join us as we grow, serve and reach out together.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5BC0E3] px-6 py-3.5 text-sm font-extrabold text-[#18366F] transition hover:bg-white"
            >
              Join our fellowship
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>
>>>>>>> Stashed changes

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
<<<<<<< Updated upstream
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={active.posterUrl}
            alt={`${active.title} poster`}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
=======
          <div
            className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#18366F] px-5 py-4 text-white sm:px-7">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8DDCF4]">
                  Past event discussion
                </p>
                <h2 className="mt-1 text-lg font-extrabold">{active.title}</h2>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-xl p-2 transition hover:bg-white/10"
                aria-label="Close event discussion"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-slate-50 p-5 sm:p-6">
                <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#EDF0F6] p-3">
                  <PosterImage
                    src={active.posterUrl}
                    alt={`${active.title} poster`}
                    className="max-h-[340px] max-w-full object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(active)}
                  disabled={!active.posterUrl}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#3154A5]/20 bg-white px-4 py-3 text-sm font-bold text-[#3154A5] transition hover:bg-[#3154A5] hover:text-white disabled:opacity-50"
                >
                  <Download size={17} />
                  Download poster
                </button>
              </div>

              <div className="flex min-h-[420px] flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-extrabold text-[#18366F]">
                      Event conversation
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Share your memories and experiences.
                    </p>
                  </div>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5A91]/10"
                    style={{ color: PURPLE }}
                  >
                    <MessageCircle size={20} />
                  </div>
                </div>

                <div className="max-h-[300px] flex-1 space-y-4 overflow-y-auto py-5">
                  {commentsLoading && (
                    <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
                      <LoaderCircle size={18} className="animate-spin" />
                      Loading comments...
                    </div>
                  )}

                  {!commentsLoading && comments.length === 0 && (
                    <div className="py-10 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <MessageCircle size={25} />
                      </div>
                      <p className="mt-3 font-bold text-slate-600">
                        No comments yet
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Be the first to share your experience.
                      </p>
                    </div>
                  )}

                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-extrabold text-[#18366F]">
                          {comment.full_name || comment.author_name || "Member"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {comment.created_at
                            ? new Date(comment.created_at).toLocaleDateString(
                                "en-KE",
                              )
                            : ""}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {commentError && (
                  <p className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-600">
                    {commentError}
                  </p>
                )}

                {commentSuccess && (
                  <p className="mb-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700">
                    {commentSuccess}
                  </p>
                )}

                <form
                  onSubmit={handleComment}
                  className="border-t border-slate-100 pt-4"
                >
                  <label
                    htmlFor="event-comment"
                    className="mb-2 block text-sm font-extrabold text-[#18366F]"
                  >
                    Leave a comment
                  </label>

                  <textarea
                    id="event-comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share something about this event..."
                    rows={3}
                    maxLength={1000}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3154A5] focus:bg-white focus:ring-4 focus:ring-[#3154A5]/10"
                  />

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">
                      {commentText.length}/1000 characters
                    </p>

                    <button
                      type="submit"
                      disabled={!commentText.trim() || commentSending}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#3154A5] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#18366F] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {commentSending ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Post comment
                    </button>
                  </div>

                  {!user && (
                    <p className="mt-3 text-xs text-slate-500">
                      You need to{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/signin")}
                        className="font-bold underline"
                        style={{ color: PURPLE }}
                      >
                        sign in
                      </button>{" "}
                      to comment.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      )}
    </>
  );
};

export default Events;