import video_4 from "../videos/video_4.mp4";

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
      </div>
    </>
  );
}
