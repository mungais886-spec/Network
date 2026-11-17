import { useEffect, useState } from "react";
import { apiRequest } from "../Services/Api.js";

const getLocalDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const useEvents = ({ includePast = false, refreshKey = 0 } = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/events");
        const allEvents = data.events ?? [];

        const formattedEvents = allEvents.map((event) => ({
          ...event,
          date: getLocalDate(event.start_time),
          time: formatTime(event.start_time),
          venue: event.location,
          posterUrl: event.poster_url
            ? event.poster_url.startsWith("http")
              ? event.poster_url
              : `http://localhost:3000${event.poster_url}`
            : null,
          attendance_count: Number(event.attendance_count ?? 0),
        }));

        const sortedEvents = formattedEvents.sort(
          (a, b) => new Date(a.start_time) - new Date(b.start_time),
        );

        const today = getLocalDate(new Date());

        const filteredEvents = includePast
          ? sortedEvents
          : sortedEvents.filter((event) => event.date >= today);

        if (active) setEvents(filteredEvents);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to retrieve events.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      active = false;
    };
  }, [includePast, refreshKey]);

  return { events, loading, error };
};

export default useEvents;
