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
} from "lucide-react";

export const Mission = () => {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  const objectives = [
    {
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
    },
  ];

  return (
    <section className="relative z-10 -mt-14 bg-[linear-gradient(to_bottom,transparent_56px,white_56px)] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-300/60"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
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
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-[#3855A5]/40 via-[#6BCDF2]/50 to-[#762A7D]/40" />
            {objectives.map((item) => {
              const Icon = item.icon;
              return (
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
                <motion.div
                  key={value.id}
                  variants={fadeUp}
                  className="group flex flex-col items-center gap-3 px-4 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6BCDF2]/25 text-[#3855A5] transition duration-300 group-hover:scale-110 group-hover:bg-[#3855A5] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-base font-semibold text-[#3855A5]">{value.name}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};