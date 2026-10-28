import React from "react";
import B1 from "../assets/B1.jpeg";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { Mission } from "../Components/Mission";
import Events from "./Events";


const headlineLines = [
  { words: ["Making", "Disciples."], accent: false },
  { words: ["Grow", "in", "Christ."], accent: true },
  { words: ["Transforming", "Lives."], accent: false },
];

const Home = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/signup");
  };

  const handleSermon = () => {
    navigate("/sermons");
  };

  let wordIndex = 0;

  return (
    <>
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(28px) scale(0.85); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pop {
          animation: popIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .pop { animation: none; }
        }
      `}</style>

      <section className="relative min-h-[600px] overflow-hidden bg-[#3855A5] md:min-h-[75vh]">
        <img
          src={B1}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3855A5] via-[#3855A5]/90 to-[#3855A5]/40" />
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border-[3px] border-[#762A7D]/60" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full border-[3px] border-[#6BCDF2]/25" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border-[3px] border-[#762A7D]/40" />

        <div className="relative z-10 grid min-h-[600px] w-full items-stretch gap-10 px-6 py-14 sm:px-10 md:min-h-[75vh] lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
          <div className="flex flex-col justify-between text-left text-white">
            <div>
              <span
                className="pop inline-block rounded-full border border-[#6BCDF2]/60 bg-[#6BCDF2]/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[#6BCDF2]"
                style={{ animationDelay: "0.1s" }}
              >
                Network Evangelsitic Team-JOOUST CHAPTER.
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl xl:text-6xl">
                {headlineLines.map((line, lineIdx) => (
                  <span key={lineIdx} className="block">
                    {line.words.map((word) => {
                      const delay = 0.35 + wordIndex * 0.15;
                      wordIndex += 1;
                      return (
                        <span
                          key={`${lineIdx}-${word}`}
                          className={`pop mr-[0.25em] inline-block ${
                            line.accent ? "text-[#6BCDF2]" : ""
                          }`}
                          style={{ animationDelay: `${delay}s` }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h1>

              <p
                className="pop mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg"
                style={{ animationDelay: "1.6s" }}
              >
                Called to share the love of Christ, proclaim the Gospel, and reach the world with the hope of salvation.
              </p>
            </div>

            <div
              className="pop mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "1.9s" }}
            >
              <button
                type="button"
                onClick={handleRegistration}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6BCDF2] px-8 py-3.5 text-base font-semibold text-[#3855A5] shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6BCDF2]/50 sm:w-auto"
              >
                Join Our Fellowship
                <svg
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleSermon}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#762A7D] hover:bg-[#762A7D] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 sm:w-auto"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch latest sermon
              </button>
            </div>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            <div
              className="pop relative h-full max-h-[460px] w-full max-w-md overflow-hidden rounded-[2rem] border-4 border-[#6BCDF2]/70 shadow-2xl shadow-black/30"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src={B1}
                alt="Congregation worshipping together"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3855A5]/60 to-transparent" />
            </div>

            <div
              className="pop absolute -bottom-4 left-0 rounded-2xl bg-white p-5 text-[#3855A5] shadow-xl xl:-left-6"
              style={{ animationDelay: "2.1s" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#762A7D]">
                Join us this week
              </p>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>Sunday</li>
                <li>Time</li>
                <li>Venue</li>
              </ul>
            </div>
          </div>

          <ul
            className="pop flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-[#762A7D] bg-[#762A7D]/40 px-4 py-2 text-sm text-white backdrop-blur-sm lg:hidden"
            style={{ animationDelay: "2.1s" }}
          >
            <li>Sunday</li>
            <li aria-hidden="true">·</li>
            <li>Time</li>
            <li aria-hidden="true">·</li>
            <li>Venue</li>
          </ul>
        </div>
      </section>
      <Mission />
      <Events />
      <Footer />
    </>
  );
};

export default Home;