// App.jsx
import React from "react";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import OurTeam from "./components/OurTeam";
import TopPlayer from "./components/TopPlayer";
import Events from "./components/Events";
import Footer from "./Footer";

function App() {
  return (
    <div className="w-full relative">
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <OurTeam />
      <TopPlayer />
      <Events />
      <Footer />
    </div>
  );
}

export default App;
