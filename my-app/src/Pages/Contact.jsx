
import React from "react";
import { Card } from "../Components/Card";
import b1 from "../assets/contact.png";
import Navbar from "../Components/Navbar";

const Contact = () => {
  return (
    <>

    <main className="min-h-screen bg-slate-50">
      <section className="px-4 py-8 sm:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <Card
            img={b1}
            heading="We'd Love to Hear From You"
            text="Have a question, a prayer request, or would you like to be part of our mission? We'd love to connect with you. Reach out and let's grow together in faith, fellowship, and service."
          />
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#762A7D]">
              Get in Touch
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#3154A5] sm:text-4xl">
              Let's Connect
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              We believe in the power of fellowship and community. Whether
              you're new to NET or already part of our family, we're happy
              to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="group rounded-2xl border border-[#3154A5]/10 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#5BC0E3] hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3154A5]/10 text-2xl text-[#3154A5] transition-colors group-hover:bg-[#3154A5] group-hover:text-white">
                ✉
              </div>

              <h3 className="text-xl font-bold text-[#3154A5]">
                Email Us
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Have a question or need more information about our activities?
                Send us an email.
              </p>

              <a
                href="mailto:your-email@example.com"
                className="mt-5 inline-block break-all font-semibold text-[#762A7D] transition-colors hover:text-[#3154A5]"
              >
               
              </a>
            </article>

            <article className="group rounded-2xl border border-[#3154A5]/10 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#5BC0E3] hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#762A7D]/10 text-2xl text-[#762A7D] transition-colors group-hover:bg-[#762A7D] group-hover:text-white">
                ♡
              </div>

              <h3 className="text-xl font-bold text-[#3154A5]">
                Join Our Fellowship
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Be part of a welcoming community committed to prayer,
                spiritual growth, evangelism, and serving Christ together.
              </p>

              <a
                href="/signup"
                className="mt-5 inline-block font-semibold text-[#762A7D] transition-colors hover:text-[#3154A5]"
              >
                Become a Member →
              </a>
            </article>

            <article className="group rounded-2xl border border-[#3154A5]/10 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#5BC0E3] hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#5BC0E3]/15 text-2xl text-[#3154A5] transition-colors group-hover:bg-[#5BC0E3]">
                ☎
              </div>

              <h3 className="text-xl font-bold text-[#3154A5]">
                Connect With Us
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Stay connected with our team to learn about upcoming events,
                fellowship meetings, and outreach activities.
              </p>

              <a
                href="mailto:your-email@example.com"
                className="mt-5 inline-block font-semibold text-[#762A7D] transition-colors hover:text-[#3154A5]"
              >
                Contact the Team →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#3154A5] via-[#263E80] to-[#762A7D] px-4 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#5BC0E3]">
              Send Us a Message
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              We're Here for You
            </h2>

            <p className="mt-5 max-w-lg leading-8 text-white/80">
              Whether you have a question, need guidance, or simply want to
              connect with us, feel free to leave us a message. We'd be glad
              to hear from you.
            </p>

            <p className="mt-6 font-semibold text-[#5BC0E3]">
              Network Evangelistic Team — Jooust Chapter
            </p>
          </div>

          <form
            className="rounded-2xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const name = data.get("name");
              const email = data.get("email");
              const subject = data.get("subject");
              const message = data.get("message");

              const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

              window.location.href =
                `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            <h3 className="mb-6 text-2xl font-bold text-[#3154A5]">
              Send a Message
            </h3>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/20"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/20"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                required
                placeholder="What would you like to discuss?"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/20"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Your Message
              </label>

              <textarea
                name="message"
                rows="4"
                required
                placeholder="Write your message here..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#5BC0E3] focus:ring-2 focus:ring-[#5BC0E3]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#762A7D] px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3154A5] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0E3]"
            >
              Send Message →
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Your email application will open with your message prepared.
            </p>
          </form>
        </div>
      </section>

      <section className="px-4 py-10 text-center sm:px-8">
        <h2 className="text-2xl font-extrabold text-[#3154A5] sm:text-3xl">
          Let's Win Souls for Christ Together
        </h2>

        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
          We look forward to connecting with you and growing together in
          faith, love, and service.
        </p>
      </section>
    </main>
    </>
  );
};

export default Contact;