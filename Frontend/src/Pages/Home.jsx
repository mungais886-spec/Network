
import React from "react";
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
import Events from "./Events";
import Welcome from "./Identity";

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
  const reduceMotion = useReducedMotion();

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
  };

  return (
    <>
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
        />

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

            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {headlineLines.map((line, index) => (
                <motion.span
                  key={index}
                  variants={fadeUp}
                  className={`block ${line.accent ? "text-[#5BC0E3]" : ""}`}
                >
                  {line.words.join(" ")}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg"
            >
              Called to share the love of Christ, proclaim the Gospel, and reach
              the world with the hope of salvation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#5BC0E3] px-7 py-3.5 font-bold text-[#183B80] transition hover:bg-white"
              >
                Join Our Fellowship
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/sermons")}
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-[#762A7D] hover:bg-[#762A7D]"
              >
                <Play size={17} fill="currentColor" />
                Watch Latest Sermon
              </button>
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
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#762A7D]" />
      </section>

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
    </>
  );
};

export default Home;
