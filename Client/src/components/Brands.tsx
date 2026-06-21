import bmw from "../images/bmw.png";
import dodge from "../images/dodge.png";
import ford from "../images/ford.png";
import honda from "../images/honda.png";
import jeep from "../images/jeep.png";
import subaru from "../images/subaru.png";
import toyota from "../images/toyota.png";
import chrysler from "../images/chrysler.png";
import ferrari from "../images/ferrari.png";
import mazda from "../images/mazda.png";
import mercesdes from "../images/mercedes.png";
import porsche from "../images/porsche.png";
import volkswagen from "../images/volkswagen.png";

import Marquee from "react-fast-marquee";

export default function Brands() {
  const images = [
    bmw,
    dodge,
    ford,
    honda,
    jeep,
    subaru,
    toyota,
    chrysler,
    ferrari,
    mazda,
    mercesdes,
    porsche,
    volkswagen,
  ];

  return (
    <>
      <div className="mx-auto pt-48 px-6 my-20 overflow-hidden font-rubik sm:px-10 pb-0">
        <h1 className="text-4xl font-bold mb-2 text-center text-slate-900">
          Supported Manufacturers
        </h1>
        <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto text-3xl">
          Explore some of the most popular car manufacturers of today that we
          support.
        </p>
        <div className="rounded-2xl px-44 h-58 pt-20">
          <Marquee
            pauseOnHover={true}
            gradient={true}
            gradientColor="white"
            speed={125}
          >
            {images.map((image, index) => (
              <img
                className="h-52 w-52 object-contain mx-2"
                key={index}
                src={image}
                alt="Brand logo"
              />
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
}
