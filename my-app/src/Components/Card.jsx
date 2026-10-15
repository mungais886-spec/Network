import React from "react";
import Button from "./Button";
import {Link,useNavigate} from "react-router-dom"

export const Card = ({ img, heading, text, onClick }) => {
     const navigate = useNavigate()

    const handleClick =()=>{
        navigate("/")
    }
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#3154A5]/20 bg-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#5BC0E3] hover:shadow-xl hover:shadow-[#3154A5]/20 sm:flex-row">

      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-[#3154A5] sm:h-auto sm:min-h-[240px] sm:w-[40%]">
        {img && (
          <img
            src={img}
            alt={heading || "Blog banner"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#3154A5]/60 via-transparent to-[#5BC0E3]/10" />
      </div>

      <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-white via-white to-[#5BC0E3]/10 p-5 sm:p-7 md:p-8">
        <span className="mb-3 h-1 w-14 rounded-full bg-gradient-to-r from-[#3154A5] to-[#762A7D] transition-all duration-300 group-hover:w-24" />

        <h2 className="mb-3 text-xl font-bold leading-tight text-[#3154A5] transition-colors duration-300 group-hover:text-[#762A7D] sm:text-2xl md:text-3xl">
          {heading}
        </h2>

        <p className="text-sm leading-7 text-slate-600 sm:text-base">
          {text}
        </p>

       <Button 
       onClick={handleClick}
       text="Go To Home"
       className="mt-5 w-fit rounded-full bg-[#762A7D] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#762A7D]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3154A5] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0E3]"
       />
      </div>

    </article>
  );
};

export default Card;
