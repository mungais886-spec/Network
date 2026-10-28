import React, { useState } from "react";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
import useEvents from "../hooks/useEvents";
import Footer from "../Components/Footer";

const parseDate = (d) => new Date(`${d}T00:00:00`);

const Events = () => {
  const { events, loading, error } = useEvents();
  const [active, setActive] = useState(null);

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
            </div>
          )}

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

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
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
        </div>
      )}
    </>
  );
};

export default Events;