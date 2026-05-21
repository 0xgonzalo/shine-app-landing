import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import LaunchAppButton from "@/components/LaunchAppButton";
import About from "@/components/About";
import TheProblem from "@/components/TheProblem";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LaunchAppButton />
      <main id="main-content">
        <Hero />
        <About />
        <TheProblem />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
