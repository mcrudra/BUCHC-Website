import { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";
import { X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import LazyImage from "./LazyImage";

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
      <div id="events" className="chess-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="chess-section-title text-4xl md:text-5xl mb-4">
              Events
            </h2>
            <p className="chess-section-subtitle text-lg">
              Join us for exciting tournaments, workshops, and chess activities
            </p>
          </div>
          <div className="text-center chess-text-muted">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="events"
      className="chess-section chess-section-rail py-12 sm:py-20 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-white/5 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-100/80 backdrop-blur-sm mb-5">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.9)]" />
            Club Highlights
          </div>
          <h2 className="chess-section-title text-3xl sm:text-4xl md:text-5xl mb-4">
            Events
          </h2>
          <p className="chess-section-subtitle text-base sm:text-lg px-4">
            Join us for exciting tournaments, workshops, and chess activities
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 sm:w-32 h-1 rounded-full chess-accent-line shadow-[0_0_24px_rgba(245,158,11,0.35)]" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-white text-2xl sm:text-3xl">Upcoming Events</h3>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center chess-text-muted py-8 text-sm sm:text-base">
              No upcoming events...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className={`chess-panel chess-slide-card ${index % 2 === 0 ? "chess-slide-left" : "chess-slide-right"} rounded-2xl overflow-hidden transition group cursor-pointer relative hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="aspect-video overflow-hidden bg-slate-800">
                    {event.img ? (
                      <LazyImage
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="text-slate-500" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-white text-lg sm:text-xl mb-3 sm:mb-4">
                      {event.title}
                    </h4>
                    {event.desc && (
                      <p className="text-slate-300 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                        {event.desc}
                      </p>
                    )}
                    <div className="space-y-2 mb-4 sm:mb-6">
                      {event.date && (
                        <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                          <Calendar
                            size={14}
                            className="sm:w-4 sm:h-4 text-amber-400"
                          />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                          <Clock
                            size={14}
                            className="sm:w-4 sm:h-4 text-amber-400"
                          />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                          <MapPin
                            size={14}
                            className="sm:w-4 sm:h-4 text-amber-400"
                          />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.registration_link && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(event.registration_link, "_blank");
                        }}
                        className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 sm:py-2.5 font-semibold text-slate-950 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base hover:from-amber-400 hover:to-amber-500"
                      >
                        Register Now
                        <ArrowRight
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                        />
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
            <h3 className="text-white text-2xl sm:text-3xl">Past Events</h3>
          </div>

          {pastEvents.length === 0 ? (
            <div className="text-center chess-text-muted py-8 text-sm sm:text-base">
              No past events available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className={`chess-panel chess-slide-card ${index % 2 === 0 ? "chess-slide-right" : "chess-slide-left"} rounded-2xl overflow-hidden transition group cursor-pointer relative hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="aspect-square overflow-hidden bg-slate-800">
                    {event.img ? (
                      <LazyImage
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="text-slate-500" size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="text-white mb-2 text-sm sm:text-base">
                      {event.title}
                    </h4>
                    {event.desc && (
                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-2">
                        {event.desc}
                      </p>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="chess-panel rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
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

            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedEvent.title}
                </h2>
              </div>

              {selectedEvent.desc && (
                <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {selectedEvent.desc}
                </p>
              )}

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {selectedEvent.date && (
                  <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                    <Calendar
                      size={18}
                      className="sm:w-5 sm:h-5 text-amber-400 flex-shrink-0"
                    />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                )}
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                    <Clock
                      size={18}
                      className="sm:w-5 sm:h-5 text-amber-400 flex-shrink-0"
                    />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                    <MapPin
                      size={18}
                      className="sm:w-5 sm:h-5 text-amber-400 flex-shrink-0"
                    />
                    <span className="break-words">
                      {selectedEvent.location}
                    </span>
                  </div>
                )}
              </div>

              {selectedEvent.registration_link && (
                <a
                  href={selectedEvent.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-slate-950 transition hover:from-amber-400 hover:to-amber-500"
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
