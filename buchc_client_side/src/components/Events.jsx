export default function Events() {
  const upcomingEvents = [
    {
      title: "Monthly Arena Championship",
      desc: "Our flagship monthly tournament where players compete for ranking points.",
      date: "December 16, 2025",
      time: "5:00 PM",
      location: "MPH",
      img: "https://res.cloudinary.com/dxuezm3jb/image/upload/v1766079479/ChatGPT_Image_Dec_18_2025_11_34_59_PM_ft4uff.png",
    },
    {
      title: "Strategy Workshop: Opening Theory",
      desc: "Learn advanced opening strategies from our top-rated players.",
      date: "December 20, 2025",
      time: "6:00 PM",
      location: "BU Campus",
      img: "/events/chess2.jpg",
    },
    {
      title: "Beginner’s Chess Bootcamp",
      desc: "New to chess? Join our intensive beginner-friendly bootcamp.",
      date: "January 5, 2026",
      time: "4:00 PM",
      location: "BU Lab",
      img: "/events/chess3.jpg",
    },
  ];

  const pastEvents = [
    {
      title: "Inter-University Championship 2024",
      img: "/events/chess1.jpg",
    },
    {
      title: "Annual Chess Festival",
      img: "/events/chess3.jpg",
    },
    {
      title: "Grandmasters’ Visit & Simul",
      img: "/events/chess2.jpg",
    },
    {
      title: "Blitz Chess Marathon",
      img: "/events/chess1.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600 mt-2">
            Join us for exciting tournaments, workshops, and chess activities
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Upcoming Events
            </h3>
            <div className="w-10 h-0.5 bg-blue-500"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>

                  <p className="text-sm text-gray-600 mb-4">{event.desc}</p>

                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <div>📅 {event.date}</div>
                    <div>⏰ {event.time}</div>
                    <div>📍 {event.location}</div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                    Register Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Past Events
            </h3>
            <div className="w-10 h-0.5 bg-blue-500"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700">
                    {event.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
