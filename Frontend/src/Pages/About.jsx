
import React from "react";
import { Mission } from "../Components/Mission";
import Footer from "../Components/Footer";
import { Origin } from "./Origin";
import Card from "../Components/Card";
import B2 from "../assets/B2.jpeg"

const About = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-white to-[#F3E8FF]">

      <section className="relative px-4 py-10 sm:px-8 md:py-16">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5BC0E3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#762A7D]/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Card
          img={B2}
            heading="Welcome to Our NET Family"
            text="We're so happy to have you here! You're part of a family passionate about Christ, fellowship, and sharing His love. Come, grow with us, make meaningful connections, and let's win souls for Christ together."
          />
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#3154A5]/5 via-transparent to-[#5BC0E3]/15" />

        <div className="relative mx-auto max-w-6xl rounded-3xl border border-white/70 bg-white/70 p-4 shadow-xl shadow-[#3154A5]/10 backdrop-blur-sm sm:p-8 md:p-10">
          <div className="mx-auto mb-8 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#3154A5] via-[#762A7D] to-[#5BC0E3]" />
          <Origin />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#152B62] via-[#3154A5] to-[#762A7D] px-4 py-14 sm:px-8 md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#5BC0E3]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#762A7D]/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Mission />
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#EAF2FF] via-[#F3E8FF] to-[#E0F7FF] px-4 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/80 bg-white/60 px-6 py-10 text-center shadow-xl shadow-[#3154A5]/10 backdrop-blur-md sm:px-10 sm:py-14">
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#3154A5] via-[#762A7D] to-[#5BC0E3]" />

          <h2 className="text-2xl font-extrabold leading-tight text-[#3154A5] sm:text-3xl md:text-4xl">
            Together, We Win Souls for Christ
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
            We are more than a team. We are a family united by faith, driven
            by love, and committed to sharing the Gospel. There's a place for
            you in our journey.
          </p>

          <a
            href="/signup"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#762A7D] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#762A7D]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3154A5] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0E3]"
          >
            Join Our Family
            <span className="ml-2 text-[#5BC0E3]">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;