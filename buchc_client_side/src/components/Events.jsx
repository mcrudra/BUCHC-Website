import { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";
import { X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

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
      <div id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl md:text-5xl mb-4">Events</h2>
            <p className="text-gray-600 text-lg">
              Join us for exciting tournaments, workshops, and chess activities
            </p>
          </div>
          <div className="text-center text-gray-600">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div id="events" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl mb-4">Events</h2>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            Join us for exciting tournaments, workshops, and chess activities
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-gray-900 text-2xl sm:text-3xl">Upcoming Events</h3>
            <div className="w-16 sm:w-24 h-1 bg-blue-600" />
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center text-gray-600 py-8 text-sm sm:text-base">
              No upcoming events. Add events from the admin panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer relative"
                >
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    {event.img ? (
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <Calendar className="text-gray-400" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4">{event.title}</h4>
                    {event.desc && (
                      <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">{event.desc}</p>
                    )}
                    <div className="space-y-2 mb-4 sm:mb-6">
                      {event.date && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                          <Calendar size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                          <Clock size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                          <MapPin size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.registration_link && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(event.registration_link, '_blank');
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        Register Now
                        <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-gray-900 text-2xl sm:text-3xl">Past Events</h3>
            <div className="w-16 sm:w-24 h-1 bg-blue-600" />
          </div>

          {pastEvents.length === 0 ? (
            <div className="text-center text-gray-600 py-8 text-sm sm:text-base">
              No past events available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer relative"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    {event.img ? (
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <Calendar className="text-gray-400" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="text-gray-900 mb-2 text-sm sm:text-base">{event.title}</h4>
                    {event.desc && (
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{event.desc}</p>
                    )}
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
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

            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {selectedEvent.title}
                </h2>
              </div>

              {selectedEvent.desc && (
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {selectedEvent.desc}
                </p>
              )}

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {selectedEvent.date && (
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                    <Calendar size={18} className="sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                    <Clock size={18} className="sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                    <MapPin size={18} className="sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span className="break-words">{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {selectedEvent.registration_link && (
                <a
                  href={selectedEvent.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  Register Now
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
