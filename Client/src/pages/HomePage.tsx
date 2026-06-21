import About from "../components/About";
import Brands from "../components/Brands";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <>
      <div>
        <HeroSection />
        <About />
        <Brands />
      </div>
    </>
  );
}
