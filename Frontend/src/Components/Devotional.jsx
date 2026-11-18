
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const Verses = [
  { id: 1, category: "Trusting God", reference: "Proverbs 3:5-6", verse: "Trust in the LORD with all your heart and lean not on your own understanding." },
  { id: 2, category: "Faith", reference: "Hebrews 11:1", verse: "Now faith is confidence in what we hope for and assurance about what we do not see." },
  { id: 3, category: "Strength", reference: "Philippians 4:13", verse: "I can do all things through Christ who strengthens me." },
  { id: 4, category: "God's Love", reference: "John 3:16", verse: "For God so loved the world that he gave his one and only Son." },
  { id: 5, category: "Fear and Courage", reference: "Joshua 1:9", verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." },
  { id: 6, category: "Peace", reference: "Philippians 4:6-7", verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." },
  { id: 7, category: "Hope", reference: "Jeremiah 29:11", verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { id: 8, category: "Prayer", reference: "1 Thessalonians 5:17", verse: "Pray continually." },
  { id: 9, category: "Salvation", reference: "Romans 10:9", verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." },
  { id: 10, category: "Evangelism", reference: "Mark 16:15", verse: "Go into all the world and preach the gospel to all creation." },
  { id: 11, category: "God's Guidance", reference: "Psalm 119:105", verse: "Your word is a lamp for my feet, a light on my path." },
  { id: 12, category: "Forgiveness", reference: "Ephesians 4:32", verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
  { id: 13, category: "Love", reference: "1 Corinthians 13:4", verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud." },
  { id: 14, category: "Serving God", reference: "Colossians 3:23", verse: "Whatever you do, work at it with all your heart, as working for the Lord." },
  { id: 15, category: "Overcoming Challenges", reference: "Romans 8:28", verse: "And we know that in all things God works for the good of those who love him." },
];

const INTERVAL = 12000;

export const Devotional = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const currentVerse = Verses[currentIndex];

  const nextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % Verses.length);
  };

  const previousVerse = () => {
    setCurrentIndex((prev) => (prev - 1 + Verses.length) % Verses.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Verses.length);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F7F9FD] px-5 py-6 sm:py-7">
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#762A7D]">
          <BookOpen size={14} />
          Daily Inspiration
        </div>

        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#18366F] sm:text-3xl">
          Grow in the <span className="text-[#3154A5]">Word.</span>
        </h2>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#762A7D]">
            {currentVerse.category}
          </p>

          <div className="mx-auto mt-2 flex min-h-[75px] max-w-3xl items-center justify-center px-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVerse.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.5,
                  ease: "easeInOut",
                }}
              >
                <p className="font-serif text-lg leading-relaxed text-slate-700 sm:text-xl">
                  “{currentVerse.verse}”
                </p>
                <p className="mt-2 text-xs font-bold text-[#3154A5]">
                  {currentVerse.reference}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={previousVerse}
            aria-label="Previous verse"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3154A5]/20 text-[#3154A5] transition hover:border-[#762A7D] hover:text-[#762A7D]"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex items-center gap-1.5">
            {Verses.map((verse, index) => (
              <button
                key={verse.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show ${verse.reference}`}
                aria-current={index === currentIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-5 bg-[#3154A5]"
                    : "w-1.5 bg-[#3154A5]/20 hover:bg-[#762A7D]/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextVerse}
            aria-label="Next verse"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3154A5] text-white transition hover:bg-[#762A7D]"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};
