import { Calendar, Clock, MapPin } from "lucide-react";

export default function UpcomingEvents() {
  const events = [
    {
      title: "Monthly Arena Championship",
      date: "December 16, 2025",
      time: "5:00 PM",
      location: "MPH",
    },
    {
      title: "Strategy Workshop: Opening Theory",
      date: "December 17, 2025",
      time: "4:00 PM",
      location: "Chachir Tong",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
        <p className="text-gray-600 mb-10">
          Don't miss out on our exciting chess activities
        </p>

        {/* Grid container centered */}
        <div className="flex flex-wrap justify-center gap-15">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm hover:shadow-2xl transition"
            >
              <div className="p-7 text-left">
                <h4 className="text-xl font-bold mb-4">{event.title}</h4>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar color="#007bff" size={18} />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock color="#007bff" size={18} />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin color="#007bff" size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
