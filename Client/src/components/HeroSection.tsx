// import video_1 from "../videos/video_1.mp4";
// import video_2 from "../videos/video_2.mp4";
import video_4 from "../videos/video_4.mp4";
// import video_3 from "../videos/video_3.mp4";

export default function HeroSection() {
  return (
    <>
      <div className="h-full w-full relative">
        {/* Section for main page video playing on loop */}
        <video src={video_4} autoPlay loop muted />
        {/* Overlay div, provides shadow over video */}
        <div className="absolute bg-slate-600 mix-blend-overlay top-0 w-full h-full" />
        <div className="absolute w-full font-rubik h-full top-0 flex flex-col justify-center items-center text-white font-bold">
          <h1 className="text-7xl">
            Automotive Tools for <br /> Amateurs and Professionals
          </h1>
        </div>

        {/* <div className="absolute flex flex-col items-center mt-6 lg:mt-20 font-roboto bg-white"> */}
        {/* Summary paragraph for home page */}
        {/*       <p className="mt-10 text-lg text-center max-w-4xl font-Roboto">
            Welcome to AutoSpec, your go-to resource for all things related to
            vehicle maintenance and management. Whether you're a professional
            mechanic or a car enthusiast, our platform is designed to help you
            stay on top of your vehicle's needs. You can easily track your
            vehicle's maintenance history, look up detailed specifications for
            various repair procedures, and even monitor how much money you've
            spent on your car over time. With our user-friendly tools,
            maintaining your vehicle has never been easier or more efficient.
          </p> */}
        {/* </div> */}
      </div>
    </>
  );
}
