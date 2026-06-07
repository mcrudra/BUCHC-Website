// App.jsx
import React from "react";
import Navbar from "./Navbar";
import RegistrationBanner from "./components/RegistrationBanner";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import OurTeam from "./components/OurTeam";
import TopPlayer from "./components/TopPlayer";
import Events from "./components/Events";
import Footer from "./Footer";

function App() {
  return (
    <div className="w-full relative overflow-hidden bg-[#07111d] text-slate-100 pt-[64px] sm:pt-[72px]">
      <div
        className="homepage-background pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="homepage-board" />
        <div className="homepage-glow homepage-glow-one" />
        <div className="homepage-glow homepage-glow-two" />
        <div className="homepage-sweep" />
      </div>
      <Navbar />
      <RegistrationBanner />
      <main className="relative z-10">
        <Hero />
        <UpcomingEvents />
        <OurTeam />
        <TopPlayer />
        <Events />
        <Footer />
      </main>
    </div>
  );
}

export default App;
