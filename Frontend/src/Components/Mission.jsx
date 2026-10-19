import { motion } from "framer-motion";
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

  const cards = [
    {
      id: 1,
      title: "Our Vision",
      icon: Eye,
      text: "The avenue for reaching out, evangelizing and making disciples for Christ.",
    },
    {
      id: 2,
      title: "Our Mission",
      icon: Target,
      text: "To proclaim the gospel of Christ and nurture true disciples of all nations.",
    },
    {
      id: 3,
      title: "Our Motto",
      icon: Quote,
      text: "Expanding the Kingdom of God.",
    },
  ];

  const reveal = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-[#481d4c]/50 px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-[#5BC0E3]/70 bg-[#3154A5]/80 px-4 py-2 shadow-lg backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#5BC0E3]"></span>

            <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
              Welcome to Network Evangelistic Team — Jooust Chapter
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#263f91] sm:text-4xl">
            Our Foundation
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#65cce5]" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl border border-[#743779]/20 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#65cce5]/20 text-[#263f91] transition-colors duration-300 group-hover:bg-[#263f91] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#263f91]">
                  {card.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">{card.text}</p>

                <div className="mt-5 h-1 w-12 rounded-full bg-[#743779] transition-all duration-300 group-hover:w-20" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#743779]">
                Our Purpose
              </p>

              <h3 className="mt-1 text-2xl font-extrabold text-[#263f91]">
                Aims & Objectives
              </h3>
            </motion.div>

            <div className="space-y-3">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;

                return (
                  <motion.div
                    key={objective.id}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex gap-4 rounded-xl border border-[#263f91]/10 bg-[#f5faff] p-4 transition-colors duration-300 hover:border-[#65cce5] hover:bg-[#65cce5]/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#263f91] text-white">
                      <Icon size={19} />
                    </div>

                    <p className="text-sm leading-6 text-gray-700">
                      {objective.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#743779]">
                What Guides Us
              </p>

              <h3 className="mt-1 text-2xl font-extrabold text-[#263f91]">
                Core Values
              </h3>
            </motion.div>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-[#743779]/20 bg-white p-5 shadow-md"
            >
              <p className="mb-5 text-sm leading-6 text-gray-600">
                Our values guide our fellowship, service, evangelism and
                commitment to Christ.
              </p>

              <div className="space-y-3">
                {values.map((value, index) => {
                  const Icon = value.icon;

                  return (
                    <motion.div
                      key={value.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 rounded-lg bg-[#f5faff] p-3 transition-colors duration-300 hover:bg-[#65cce5]/20"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#263f91] text-white">
                        <Icon size={18} />
                      </div>

                      <span className="font-semibold text-[#263f91]">
                        {value.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-2 text-center text-sm font-medium text-[#743779]"
        >
        </motion.div>
      </div>
    </section>
  );
};
