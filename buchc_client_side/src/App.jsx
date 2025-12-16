// App.jsx (main component)
import React from "react";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <UpcomingEvents />
    </div>
  );
}

export default App;
