
import React from "react";
<<<<<<< Updated upstream
import B1 from "../assets/B1.jpeg";
import Footer from "../Components/Footer";
=======
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Users,
  HeartHandshake,
  Megaphone,
  Play,
  Compass,
  Globe2,
} from "lucide-react";
>>>>>>> Stashed changes
import { useNavigate } from "react-router-dom";
import B1 from "../assets/B1.jpeg";
import B9 from "../assets/images/b9.jpeg";
import B10 from "../assets/images/b10.jpeg";
import B11 from "../assets/images/b11.jpeg";
import B12 from "../assets/images/b12.jpeg";
import B13 from "../assets/images/b13.jpeg";
import B14 from "../assets/images/b14.jpeg";
import B15 from "../assets/images/b15.jpeg";
import B16 from "../assets/images/b16.jpeg";
import B17 from "../assets/images/b17.jpeg";
import B18 from "../assets/images/b18.jpeg";
import B19 from "../assets/images/b19.jpeg";
import B20 from "../assets/images/b20.jpeg";
import B21 from "../assets/images/b21.jpeg";
import B22 from "../assets/images/b22.jpeg";
import Footer from "../Components/Footer";
import { Mission } from "../Components/Mission";
import { Devotional } from "../Components/Devotional";
<<<<<<< Updated upstream

=======
import Events from "./Events";
import Welcome from "./Identity";
>>>>>>> Stashed changes

const headlineLines = [
  { words: ["Making", "Disciples."], accent: false },
  { words: ["Grow", "in", "Christ."], accent: true },
  { words: ["Transforming", "Lives."], accent: false },
];

const ministryActivities = [
  {
    number: "01",
    title: "Evangelism & Outreach",
    description:
      "Sharing the Gospel of Jesus Christ and reaching communities with the message of salvation.",
    icon: Megaphone,
    image: B9,
    alt: "NET members participating in evangelism and outreach",
  },
  {
    number: "02",
    title: "Discipleship",
    description:
      "Equipping believers through biblical teaching, fellowship and intentional spiritual growth.",
    icon: BookOpen,
    image: B10,
    alt: "Members participating in Bible study and discipleship",
  },
  {
    number: "03",
    title: "Prayer & Fellowship",
    description:
      "Building a united community through prayer, worship and meaningful Christian relationships.",
    icon: Users,
    image: B11,
    alt: "Members gathered for prayer and fellowship",
  },
  {
    number: "04",
    title: "Creative Ministry",
    description:
      "Using drama, media and creative expression to communicate the Gospel and impact lives.",
    icon: HeartHandshake,
    image: B12,
    alt: "NET creative ministry team serving together",
  },
];

const fellowshipMoments = [
  {
    image: B13,
    secondaryImage: B16,
    title: "Worship Together",
    description: "Growing closer to God through worship and prayer.",
    alt: "Members worshipping together",
  },
  {
    image: B14,
    secondaryImage: B17,
    title: "Stronger Together",
    description: "Building genuine friendships and Christian community.",
    alt: "NET members spending time together",
  },
  {
    image: B15,
    secondaryImage: B18,
    title: "Living the Mission",
    description: "Taking the message of Christ beyond our gatherings.",
    alt: "Members taking part in an outreach activity",
  },
];

const Home = () => {
  const navigate = useNavigate();

<<<<<<< Updated upstream
  const handleRegistration = () => {
    navigate("/signup");
  };

  const handleSermon = () => {
    navigate("/sermons");
=======
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
      },
    },
>>>>>>> Stashed changes
  };

  let wordIndex = 0;

  return (
    <>
<<<<<<< Updated upstream
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
=======
      <section
        id="home"
        className="relative flex min-h-[560px] items-center overflow-hidden bg-[#3154A5] md:min-h-[620px]"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${B1})`,
            willChange: "transform",
          }}
          initial={{ scale: 1.04 }}
          animate={
            reduceMotion
              ? { scale: 1.04 }
              : {
                  scale: [1.04, 1.1, 1.04],
                  x: [0, -8, 0],
                }
          }
          transition={{
            duration: 35,
            ease: "easeInOut",
            repeat: Infinity,
          }}
>>>>>>> Stashed changes
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3855A5] via-[#3855A5]/90 to-[#3855A5]/40" />
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border-[3px] border-[#762A7D]/60" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full border-[3px] border-[#6BCDF2]/25" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border-[3px] border-[#762A7D]/40" />

<<<<<<< Updated upstream
        <div className="relative z-10 grid min-h-[600px] w-full items-stretch gap-10 px-6 py-14 sm:px-10 md:min-h-[75vh] lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
          <div className="flex flex-col justify-between text-left text-white">
            <div>
              <span
                className="pop inline-block rounded-full border border-[#6BCDF2]/60 bg-[#6BCDF2]/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[#6BCDF2]"
                style={{ animationDelay: "0.1s" }}
              >
                Network Evangelsitic Team-JOOUST CHAPTER.
              </span>
=======
        <div className="absolute inset-0 bg-[#142D63]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#142D63]/80 via-[#142D63]/40 to-transparent" />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 md:py-20 lg:px-12"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-3 border-l-4 border-[#5BC0E3] pl-4"
            >
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#5BC0E3] sm:text-sm">
                Network Evangelistic Team
              </span>

              <span className="h-1 w-1 rounded-full bg-white/70" />

              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                JOOUST Chapter
              </span>
            </motion.div>
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                onClick={handleRegistration}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6BCDF2] px-8 py-3.5 text-base font-semibold text-[#3855A5] shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6BCDF2]/50 sm:w-auto"
=======
                onClick={() => navigate("/signup")}
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#5BC0E3] px-7 py-3.5 font-bold text-[#183B80] transition hover:bg-white"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                onClick={handleSermon}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#762A7D] hover:bg-[#762A7D] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 sm:w-auto"
=======
                onClick={() => navigate("/sermons")}
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-[#762A7D] hover:bg-[#762A7D]"
>>>>>>> Stashed changes
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch latest sermon
              </button>
<<<<<<< Updated upstream
            </div>
=======
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 border-t border-white/25 pt-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Our Motto
              </p>

              <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                Expanding the Kingdom of God
              </p>
            </motion.div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <Mission />
      <Devotional />
      <Events />
      <Footer />
=======

      <section id="welcome" className="scroll-mt-24">
        <Welcome />
      </section>

      <section id="mission" className="scroll-mt-24">
        <Mission />
      </section>

      <section
        id="what-we-do"
        className="scroll-mt-24 bg-[#6685c4] px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#762A7D]"
            >
              Our Ministry
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-extrabold tracking-tight text-[#18366F] sm:text-4xl"
            >
              What We Do
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm leading-7 text-slate-600 sm:text-base"
            >
              We exist to make Christ known, build strong believers and
              transform lives through the power of the Gospel.
            </motion.p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ministryActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#5BC0E3]/60 hover:shadow-xl hover:shadow-[#18366F]/10"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142D63]/65 via-transparent to-transparent" />
                    <span className="absolute bottom-3 right-4 text-xs font-bold tracking-widest text-white/90">
                      {activity.number}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3154A5]/10 text-[#3154A5] transition group-hover:bg-[#3154A5] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#18366F]">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {activity.description}
                    </p>

                    <div className="mt-5 h-1 w-10 rounded-full bg-[#5BC0E3] transition-all duration-300 group-hover:w-16" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="life-at-net"
        className="scroll-mt-24 overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5A91]">
                More Than a Fellowship
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#18366F] sm:text-4xl">
                Life at NETWORK JOOUST
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                A community of believers growing in faith, serving together and
                making lasting memories as we pursue Christ.
              </p>
            </motion.div>

            <p className="max-w-xs text-sm font-medium leading-6 text-slate-500">
              United in Christ. Growing together. Reaching out with love.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {fellowshipMoments.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 22,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : index * 0.12,
                }}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 1 ? "md:mt-8" : ""
                }`}
              >
                <div className="relative h-[300px] overflow-hidden sm:h-[340px]">
                  <img
                    src={moment.image}
                    alt={moment.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute right-4 top-4 h-24 w-24 overflow-hidden rounded-xl border-2 border-white shadow-xl sm:h-28 sm:w-28">
                    <img
                      src={moment.secondaryImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#142D63]/90 via-[#142D63]/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{moment.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
                    {moment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="devotional" className="scroll-mt-24">
        <Devotional />
      </section>

      <section id="events" className="scroll-mt-24">
        <Events />
      </section>

      <section
        id="sermons"
        className="scroll-mt-24 overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#762A7D]">
              Grow Through God's Word
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#18366F] sm:text-4xl">
              Listen. Learn.
              <span className="block text-[#3154A5]">Grow in Christ.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore biblical teachings, sermons and messages that encourage
              you to grow in faith, understand God's Word and live out your
              Christian calling.
            </p>

            <button
              type="button"
              onClick={() => navigate("/sermons")}
              className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-[#3154A5] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#762A7D]"
            >
              Explore Sermons
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative grid grid-cols-2 gap-3"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={B19}
                alt="Christian teaching and ministry"
                loading="lazy"
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src={B20}
                alt="Members growing through God's Word"
                loading="lazy"
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>

            <div className="relative col-span-2 overflow-hidden rounded-2xl">
              <img
                src={B21}
                alt="NET members serving in ministry"
                loading="lazy"
                className="h-48 w-full object-cover sm:h-56"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#142D63]/90 via-[#142D63]/15 to-transparent p-6 sm:p-8">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5BC0E3] text-[#18366F]">
                    <BookOpen size={23} />
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#5BC0E3]">
                    The Word of God
                  </p>

                  <h3 className="mt-2 max-w-md text-xl font-bold leading-snug text-white sm:text-2xl">
                    Be transformed by the renewing of your mind.
                  </h3>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    Romans 12:2
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="join"
        className="scroll-mt-24 bg-[#F7F9FD] px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative isolate overflow-hidden rounded-2xl bg-[#3154A5] px-6 py-12 text-center sm:px-12 sm:py-16">
            <img
              src={B22}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />

            <div className="absolute inset-0 -z-10 bg-[#142D63]/85" />

            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />
            <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[35px] border-[#5BC0E3]/10" />

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 mx-auto max-w-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#5BC0E3]">
                <Compass size={29} />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#5BC0E3]">
                Be Part of the Mission
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                There Is a Place for You Here.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/85 sm:text-base">
                Become part of a community committed to knowing Christ, growing
                together and making His love known to the world.
              </p>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-[#5BC0E3] px-7 py-3.5 text-sm font-bold text-[#18366F] transition hover:bg-white"
              >
                Join Our Fellowship
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <Footer />
      </section>
>>>>>>> Stashed changes
    </>
  );
};

export default Home;