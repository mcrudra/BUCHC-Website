import { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";
import { X, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setUpcomingEvents(data.upcomingEvents || []);
        setPastEvents(data.pastEvents || []);
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Events</h2>
            <p className="text-gray-600 mt-2">
              Join us for exciting tournaments, workshops, and chess activities
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="text-center text-gray-600">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600 mt-2">
            Join us for exciting tournaments, workshops, and chess activities
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Upcoming Events
            </h3>
            <div className="w-10 h-0.5 bg-blue-500"></div>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No upcoming events. Add events from the admin panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100 cursor-pointer"
              >
                {event.img && (
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>

                  {event.desc && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.desc}</p>
                  )}

                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    {event.date && <div>📅 {formatDate(event.date)}</div>}
                    {event.time && <div>⏰ {event.time}</div>}
                    {event.location && <div>📍 {event.location}</div>}
                  </div>

                  {event.registration_link && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(event.registration_link, '_blank');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                    >
                      Register Now →
                    </button>
                  )}
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Past Events
            </h3>
            <div className="w-10 h-0.5 bg-blue-500"></div>
          </div>

          {pastEvents.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No past events available.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pastEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer"
              >
                {event.img && (
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700">
                    {event.title}
                  </p>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
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

