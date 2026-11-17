<<<<<<< Updated upstream
=======

import React from "react";
>>>>>>> Stashed changes
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  Target,
  Quote,
  BookOpen,
  HandHeart,
  Users,
  Heart,
  Scale,
  Church,
  Globe,
  GraduationCap,
<<<<<<< Updated upstream
=======
  ArrowUpRight,
  Cross,
>>>>>>> Stashed changes
} from "lucide-react";
import teamImage from "../assets/bg9.jpeg";
import unityImage from "../assets/unity.jpeg";

const objectives = [
  {
    icon: BookOpen,
    title: "Proclaim the Gospel",
    description:
      "Share the message of salvation through Jesus Christ with students and the wider community.",
  },
  {
    icon: Users,
    title: "Make Disciples",
    description:
      "Equip believers with biblical knowledge and encourage spiritual maturity and growth.",
  },
  {
    icon: HandHeart,
    title: "Promote Christian Fellowship",
    description:
      "Build a loving community where members encourage, support and grow together in faith.",
  },
  {
    icon: Globe,
    title: "Reach the Community",
    description:
      "Participate in evangelism and outreach initiatives that bring the hope of Christ to others.",
  },
  {
    icon: GraduationCap,
    title: "Develop Christian Leaders",
    description:
      "Identify, nurture and equip students to become responsible Christian leaders and servants.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Love",
    description: "Showing Christ-like love to God and to one another.",
  },
  {
    icon: BookOpen,
    title: "Faith",
    description: "Building our lives on God's Word and trusting His promises.",
  },
  {
    icon: HandHeart,
    title: "Service",
    description: "Serving God and others with humility and commitment.",
  },
  {
    icon: Scale,
    title: "Integrity",
    description: "Living with honesty, accountability and godly character.",
  },
  {
    icon: Church,
    title: "Unity",
    description: "Growing together as one body in Christ.",
  },
];

export const Mission = ({ id }) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
<<<<<<< Updated upstream
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" } },
=======
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
>>>>>>> Stashed changes
  };

  const container = {
    hidden: {},
<<<<<<< Updated upstream
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
=======
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
>>>>>>> Stashed changes
  };

  const visionMission = [
    {
<<<<<<< Updated upstream
      id: 1,
      icon: Globe,
      text: "To effectively participate in the ministry of evangelism in various parts of Kenya.",
    },
    {
      id: 2,
      icon: Users,
      text: "To dedicate hours of fellowship, prayers and intercession for the land and people of Kenya, with a view to spiritual revival and spiritual stability.",
    },
    {
      id: 3,
      icon: BookOpen,
      text: "To help Christians, especially members of the Team, pray, study the Scriptures, fellowship and promote greater maturity in the Christian faith and life.",
    },
    {
      id: 4,
      icon: Church,
      text: "To help Christians, especially members of the Team, witness and present the Lord Jesus Christ with a view to personal commitment to Him.",
    },
    {
      id: 5,
      icon: GraduationCap,
      text: "To help Christians grow spiritually and develop a quality of good leadership.",
    },
  ];

  const values = [
    { id: 1, name: "Godliness", icon: Heart },
    { id: 2, name: "Love", icon: HandHeart },
    { id: 3, name: "Obedience", icon: BookOpen },
    { id: 4, name: "Unity", icon: Users },
    { id: 5, name: "Equity", icon: Scale },
  ];

  const panel = [
    {
      id: 1,
      title: "Vision",
      icon: Eye,
      text: "The avenue for reaching out, evangelizing and making disciples for Christ.",
    },
    {
      id: 2,
      title: "Mission",
      icon: Target,
      text: "To proclaim the gospel of Christ and nurture true disciples of all nations.",
=======
      icon: Eye,
      title: "Our Vision",
      description:
        "To be an avenue for reaching out, evangelizing and making disciples for Christ.",
      background: "bg-[#3154A5]",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To proclaim the Gospel of Christ and nurture true disciples of all nations.",
      background: "bg-[#8B5A91]",
>>>>>>> Stashed changes
    },
  ];

  return (
<<<<<<< Updated upstream
    <section className="relative z-10 -mt-14 bg-[linear-gradient(to_bottom,transparent_56px,white_56px)] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-300/60"
          variants={fadeUp}
=======
    <section
      id={id}
      className="overflow-hidden bg-slate-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={container}
>>>>>>> Stashed changes
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
<<<<<<< Updated upstream
          <div className="grid divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0">
            {panel.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex gap-4 p-6 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3855A5] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3855A5]">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-[#762A7D] px-6 py-4 text-center sm:flex-row sm:gap-4">
            <div className="pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full border-[3px] border-white/15" />
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 rounded-full border-[3px] border-[#6BCDF2]/30" />
            <span className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6BCDF2]">
              <Quote className="h-4 w-4" />
              Our motto
            </span>
            <p className="relative text-lg font-semibold italic text-white">
              Expanding the Kingdom of God.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
=======
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#3154A5]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#3154A5]"
          >
            <Cross size={14} />
            About NET JOOUST
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-3xl font-extrabold leading-tight text-[#18366F] sm:text-4xl lg:text-5xl"
          >
            Our Purpose.
            <span className="block text-[#8B5A91]">Our Calling.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
          >
            The Network Evangelistic Team is a ministry within the JOOUST
            Christian Union, committed to sharing the Gospel, reaching
            people for Christ and nurturing believers into true disciples.
            Since its establishment in 2012, NET has continued to provide
            an avenue for fellowship, evangelism and spiritual growth.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-10 overflow-hidden rounded-3xl bg-[#18366F] shadow-xl shadow-[#18366F]/10"
        >
          <div className="relative h-[260px] sm:h-[360px] lg:h-[440px]">
            <img
              src={teamImage}
              alt="Network Evangelistic Team members"
              className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10234C]/90 via-[#10234C]/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5BC0E3] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#5BC0E3]" />
                NET JOOUST Community
              </span>

              <h3 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                United in Christ.
                <span className="block text-[#5BC0E3]">
                  Growing Together.
                </span>
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                A family of believers committed to fellowship, evangelism,
                discipleship and expanding the Kingdom of God.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {visionMission.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className={`${item.background} group relative overflow-hidden rounded-2xl p-7 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:p-9`}
              >
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border-[24px] border-white/5" />

                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/85 sm:text-base">
                    {item.description}
                  </p>

                  <ArrowUpRight
                    size={22}
                    className="mt-6 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#8B5A91]/15 bg-white px-6 py-8 text-center shadow-sm sm:flex-row sm:gap-5 sm:py-7"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B5A91]/10 text-[#8B5A91]">
            <Quote size={24} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5A91]">
              Our Motto
            </p>
            <h3 className="mt-1 text-xl font-extrabold text-[#18366F] sm:text-2xl">
              Expanding the Kingdom of God
            </h3>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
>>>>>>> Stashed changes
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
<<<<<<< Updated upstream
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-[#762A7D]/30 bg-[#762A7D]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#762A7D]"
            >
              What drives us
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold leading-tight text-[#3855A5] sm:text-4xl"
            >
              Our Objectives
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-sm leading-relaxed text-slate-600">
              Five commitments that shape how we serve, pray and grow together.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#3855A5] via-[#6BCDF2] to-[#762A7D]"
            />
          </motion.div>

          <motion.ol
            className="relative"
            variants={stagger}
=======
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5A91]">
              What Drives Us
            </span>

            <h3 className="mt-3 text-3xl font-extrabold leading-tight text-[#18366F] sm:text-4xl">
              Our Objectives
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We are guided by a shared commitment to the Gospel and
              the growth of God's Kingdom. These objectives shape
              our ministry and activities.
            </p>
          </motion.div>

          <motion.div
            variants={container}
>>>>>>> Stashed changes
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-3"
          >
            <div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-[#3855A5]/40 via-[#6BCDF2]/50 to-[#762A7D]/40" />
            {objectives.map((item) => {
              const Icon = item.icon;
              return (
<<<<<<< Updated upstream
                <motion.li
                  key={item.id}
                  variants={fadeUp}
                  className="group relative flex gap-5 pb-6 last:pb-0"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3855A5] text-sm font-bold text-white ring-4 ring-white transition-colors duration-300 group-hover:bg-[#762A7D]">
                    {item.id}
                  </div>
                  <div className="flex-1 rounded-xl border border-transparent px-4 py-2 transition-colors duration-300 group-hover:border-slate-200 group-hover:bg-slate-50">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-[#6BCDF2]" />
                      <p className="leading-relaxed text-slate-700">{item.text}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <motion.div
          className="mt-14 border-t border-slate-200 pt-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-2xl font-bold text-[#3855A5] sm:text-3xl">Our Core Values</h2>
            <p className="mt-2 text-sm text-slate-500">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-slate-200">
            {values.map((value) => {
              const Icon = value.icon;
              return (
=======
>>>>>>> Stashed changes
                <motion.div
                  key={item.title}
                  variants={fadeUp}
<<<<<<< Updated upstream
                  className="group flex flex-col items-center gap-3 px-4 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6BCDF2]/25 text-[#3855A5] transition duration-300 group-hover:scale-110 group-hover:bg-[#3855A5] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-base font-semibold text-[#3855A5]">{value.name}</p>
                </motion.div>
              );
            })}
=======
                  className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#3154A5]/20 hover:shadow-md sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B5A91]/10 text-[#8B5A91] transition-colors duration-300 group-hover:bg-[#8B5A91] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h4 className="font-bold text-[#18366F]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 overflow-hidden rounded-3xl bg-[#8B5A91] p-6 shadow-xl sm:p-9 lg:p-10"
        >
          <motion.div variants={fadeUp} className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              What We Stand For
            </span>

            <h3 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Our Core Values
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/80">
              The principles that guide our faith, relationships, service
              and commitment to God's work.
            </p>
          </motion.div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: reduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div className="relative min-h-[340px] overflow-hidden rounded-2xl sm:min-h-[440px]">
                <motion.img
                  src={unityImage}
                  alt="NET JOOUST members united in fellowship"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: reduceMotion ? 1 : 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 1.4,
                    ease: "easeOut",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#35243D]/80 via-[#35243D]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                    One Family. One Faith.
                  </span>

                  <h4 className="mt-3 max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    United in Christ, Stronger Together.
                  </h4>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/85">
                    Growing together in love, serving together in faith
                    and pursuing God's purpose as one community.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={container}
              className="grid gap-3 sm:grid-cols-2"
            >
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className={`group rounded-2xl border border-white/20 bg-white/[0.12] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.2] ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white transition duration-300 group-hover:bg-white group-hover:text-[#8B5A91]">
                      <Icon size={22} />
                    </div>

                    <h4 className="mt-4 font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-white/85">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
>>>>>>> Stashed changes
          </div>
        </motion.div>
      </div>
    </section>
  );
};