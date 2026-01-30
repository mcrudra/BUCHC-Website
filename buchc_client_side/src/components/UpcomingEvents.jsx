import { Calendar, Clock, MapPin, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data.upcomingEvents || []);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-gray-600 mb-10">
            Don't miss out on our exciting chess activities
          </p>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
        <p className="text-gray-600 mb-10">
          Don't miss out on our exciting chess activities
        </p>

        {events.length === 0 ? (
          <div className="text-gray-600">No upcoming events. Add events from the admin panel.</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-15 ">
            {events.map((event, index) => (
            <div
              key={index}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm hover:shadow-2xl transition cursor-pointer"
            >
              <div className="p-7 text-left border-t-7 border-blue-500 rounded-t-lg">
                <h4 className="text-xl font-bold mb-4">{event.title}</h4>

                {event.date && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar color="#007bff" size={18} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                )}

                {event.time && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock color="#007bff" size={18} />
                    <span>{event.time}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin color="#007bff" size={18} />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedEvent.img && (
              <div className="relative">
                <img
                  src={selectedEvent.img}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                >
                  <X size={20} className="text-gray-800" />
                </button>
              </div>
            )}
            {!selectedEvent.img && (
              <div className="relative p-4 border-b">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
                >
                  <X size={20} className="text-gray-800" />
                </button>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedEvent.title}
              </h2>

              {selectedEvent.desc && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedEvent.desc}
                </p>
              )}

              <div className="space-y-3 mb-6">
                {selectedEvent.date && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={20} className="text-blue-600" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={20} className="text-blue-600" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={20} className="text-blue-600" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {selectedEvent.registration_link && (
                <a
                  href={selectedEvent.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Register Now
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
