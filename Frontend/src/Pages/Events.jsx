import React from "react";
import { Card } from "../Components/Card";
import E from "../assets/events.png";
import Navbar from "../Components/Navbar";

const Events = () => {
  return (
    <>
    <div className="w-full px-3 py-4 sm:px-5">
      <Card
        heading="Welcome to Our NETWORK Family"
        text="We're so happy to have you here! You're part of a family passionate about Christ, fellowship, and sharing His love. Come, grow with us, make meaningful connections, and let's win souls for Christ together."
      />
    </div>
    </>
  );
};

export default Events;
