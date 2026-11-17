
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Cross,
  HeartHandshake,
  Users,
  Play,
} from "lucide-react";
import bg7 from "../assets/bg7.jpeg"
import bg8 from "../assets/bg8.jpeg"

const highlights = [
  {
    icon: Cross,
    title: "Proclaim Christ",
    description: "Sharing the Gospel and making Christ known.",
  },
  {
    icon: BookOpen,
    title: "Make Disciples",
    description: "Growing believers through God's Word.",
  },
  {
    icon: HeartHandshake,
    title: "Serve Others",
    description: "Reaching people with the love of Christ.",
  },
];

const Welcome = ({id}) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#a3b0d6] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 text-center lg:mb-14"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-9 rounded-full bg-[#87079A]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#87079A]">
              Welcome to NET JOOUST
            </span>
            <span className="h-[2px] w-9 rounded-full bg-[#87079A]" />
          </div>

          <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#18366F] sm:text-4xl lg:text-5xl">
            More Than a Fellowship.
            <span className="mt-2 block text-[#87079A]">
              A Calling to Transform Lives.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            A community of believers united by faith, driven by purpose
            and committed to expanding the Kingdom of God.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-[#18366F]/10">
              <img
                src={bg7}
                alt="A group of people sharing fellowship together"
                className="h-[330px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#10234C]/65 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5BC0E3]">
                  One Faith. One Mission.
                </span>
                <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Growing Together in Christ.
                </h3>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-2 w-40 overflow-hidden rounded-2xl border-4 border-[#F8F9FC] shadow-xl sm:-right-7 sm:w-52">
              <img
                src={bg8}
                alt="Friends gathered together in community"
                className="h-28 w-full object-cover sm:h-36"
              />
            </div>

            <div className="absolute -left-3 -top-4 -z-10 h-28 w-28 rounded-3xl bg-[#87079A]/10 sm:-left-5 sm:-top-5" />

            <div className="absolute -bottom-2 left-3 flex items-center gap-2 rounded-xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg sm:left-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3154A5]/10 text-[#3154A5]">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#18366F]">
                  United in Christ
                </p>
                <p className="text-[10px] text-slate-500">
                  Growing in faith together
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="pt-5 lg:pt-0"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#3154A5]/15 bg-[#3154A5]/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#3154A5]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#3154A5]">
                Who We Are
              </span>
            </div>

            <h3 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-[#18366F] sm:text-4xl">
              Making Christ Known.
              <span className="block text-[#87079A]">
                Raising True Disciples.
              </span>
            </h3>

            <p className="mt-6 text-[15px] leading-8 text-slate-600">
              The Network Evangelistic Team is a ministry within the
              JOOUST Christian Union, bringing believers together with
              a shared passion for evangelism, discipleship and the
              advancement of God's Kingdom.
            </p>

            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              Since its beginnings at JOOUST in 2012, NET has been
              committed to reaching people with the Gospel, nurturing
              believers in their faith and raising disciples who live
              out the teachings of Jesus Christ.
            </p>

            <div className="mt-8 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#87079A]/10 text-[#87079A]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#18366F]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="/about"
                className="group inline-flex items-center gap-3 rounded-lg bg-[#87079A] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#87079A]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#690777]"
              >
                Discover Our Story
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <span className="flex items-center gap-2 text-sm font-semibold text-[#3154A5]">
                <Cross size={17} />
                Expanding God's Kingdom
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
