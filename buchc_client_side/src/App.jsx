// App.jsx
import React from "react";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import OurTeam from "./components/OurTeam";
import Development from "./components/Development";

function App() {
  return (
    <div className="w-full relative">
      <Development />
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <OurTeam />
    </div>
  );
}

export default App;
