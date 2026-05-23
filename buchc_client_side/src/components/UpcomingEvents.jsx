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
      <section className="chess-section py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="chess-section-title text-3xl font-bold mb-2">
            Upcoming Events
          </h2>
          <p className="chess-section-subtitle mb-10">
            Don't miss out on our exciting chess activities
          </p>
          <p className="chess-text-muted">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chess-section py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="chess-section-title text-3xl font-bold mb-2">
          Upcoming Events
        </h2>
        <p className="chess-section-subtitle mb-10">
          Don't miss out on our exciting chess activities
        </p>

        {events.length === 0 ? (
          <div className="chess-text-muted"></div>
        ) : (
          <div className="flex flex-wrap justify-center gap-15 ">
            {events.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className="chess-panel rounded-2xl overflow-hidden w-full max-w-sm transition cursor-pointer hover:-translate-y-1"
              >
                <div className="p-7 text-left border-t-4 border-amber-500 rounded-t-lg">
                  <h4 className="text-xl font-bold mb-4 text-white">
                    {event.title}
                  </h4>

                  {event.date && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar color="#f59e0b" size={18} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  )}

                  {event.time && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock color="#f59e0b" size={18} />
                      <span>{event.time}</span>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin color="#f59e0b" size={18} />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="chess-panel rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                  className="absolute top-4 right-4 rounded-full border border-white/10 bg-slate-950/70 p-2 shadow-lg transition hover:bg-slate-900"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            )}
            {!selectedEvent.img && (
              <div className="relative p-4 border-b border-white/10">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedEvent.title}
              </h2>

              {selectedEvent.desc && (
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {selectedEvent.desc}
                </p>
              )}

              <div className="space-y-3 mb-6">
                {selectedEvent.date && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar size={20} className="text-amber-400" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock size={20} className="text-amber-400" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin size={20} className="text-amber-400" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {selectedEvent.registration_link && (
                <a
                  href={selectedEvent.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-slate-950 transition hover:from-amber-400 hover:to-amber-500"
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
