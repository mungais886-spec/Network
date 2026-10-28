import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const todayString = () => new Date().toLocaleDateString("en-CA");

const useEvents = ({ includePast = false } = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setEvents(includePast ? all : all.filter((e) => e.date >= todayString()));
        setLoading(false);
      },
      () => {
        setError("Couldn't load events. Refresh to try again.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [includePast]);

  return { events, loading, error };
};

export default useEvents;