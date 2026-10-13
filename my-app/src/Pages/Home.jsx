import React from "react";
import B1 from "../assets/B1.jpeg";
import Footer from "../Components/Footer";
import AniamatedPage from "../Components/AniamatedPage";
import Button from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleSignUP = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };
  return (
    <>
      <section
        className="relative h-[45vh] min-h-[400px] overflow-hidden bg-cover bg-center sm:h-[60vh] md:h-[65vh]"
        style={{ backgroundImage: `url(${B1})` }}
      >
        <div className="absolute inset-0 bg-[#3154A5]/60"></div>

        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#5BC0E3]/70 bg-[#3154A5]/80 px-4 py-2 shadow-lg backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-[#5BC0E3]"></span>

              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
                Welcome to Network Evangelistic Team — Jooust Chapter
              </span>
            </div>

            <div className="winning-text">
              <h1 className="text-4xl font-extrabold leading-tight text-[#FFFFFF] sm:text-5xl md:text-6xl lg:text-7xl">
                Winning Souls <span className="text-[#5BC0E3]">for Christ</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#FFFFFF] sm:text-base md:text-lg">
                Sharing the Gospel, spreading the love of Christ, and reaching
                people with the message of salvation.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                text="Join Us"
                onClick={handleSignUP}
                className="w-full rounded-full bg-[#762A7D] px-8 py-3.5 font-bold text-[#FFFFFF] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#3154A5] hover:shadow-xl sm:w-auto"
              />

              <Button
                text="Login"
                onClick={handleSignIn}
                className="w-full rounded-full border-2 border-[#5BC0E3] bg-[#3154A5]/80 px-8 py-3.5 font-bold text-[#FFFFFF] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#5BC0E3] hover:text-[#3154A5] hover:shadow-xl sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <AniamatedPage />
      <Footer />
    </>
  );
};

export default Home;
