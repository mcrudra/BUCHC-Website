import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchTeamMembers } from "../services/api";
import rudraBhai from "../assets/governingBody/rudraBhai.jpg";

export default function OurTeam() {
  const [governingBody, setGoverningBody] = useState([]);
  const [generalCoordinator, setGeneralCoordinator] = useState(null);
  const [em, setEm] = useState([]);
  const [creative, setCreative] = useState([]);
  const [training, setTraining] = useState([]);
  const [hr, setHr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();

        // Sort governing body by position order
        const governingOrder = {
          'President': 1,
          'Vice President': 2,
          'General Secretary': 3,
          'Joint Secretary': 4,
          'Treasurer': 5
        };

        // Sort departmental positions by order
        const departmentalOrder = {
          'Director': 1,
          'Co-Director': 2,
          'Asst. Director': 3,
          'Assistant Director': 3 // Handle both variations
        };

        const sortGoverning = (members) => {
          return [...members].sort((a, b) => {
            const orderA = governingOrder[a.position] || 999;
            const orderB = governingOrder[b.position] || 999;
            return orderA - orderB;
          });
        };

        const sortDepartmental = (members) => {
          return [...members].sort((a, b) => {
            const orderA = departmentalOrder[a.position] || 999;
            const orderB = departmentalOrder[b.position] || 999;
            return orderA - orderB;
          });
        };

        setGoverningBody(sortGoverning(data.governing || []));
        setGeneralCoordinator(data.general_coordinator || null);
        setEm(sortDepartmental(data.em || []));
        setCreative(sortDepartmental(data.creative || []));
        setTraining(sortDepartmental(data.training || []));
        setHr(sortDepartmental(data.hr || []));
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeamMembers();
  }, []);

  const getImageSrc = (photo) => {
    if (!photo) return rudraBhai;
    if (photo.startsWith("http")) return photo;
    if (photo.startsWith("/")) return photo;
    return photo;
  };

  if (loading) {
    return (
      <div id="our-team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl md:text-5xl mb-4">Our Team</h2>
            <p className="text-gray-600 text-lg">
              Meet the dedicated leaders driving BUCHC forward
            </p>
          </div>
          <div className="text-center text-gray-600">Loading team members...</div>
        </div>
      </div>
    );
  }

  return (
    <div id="our-team" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl mb-4">Our Team</h2>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            Meet the dedicated leaders driving BUCHC forward
          </p>
        </div>

        {/* Governing Body */}
        <div className="mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-gray-900 text-2xl sm:text-3xl mb-2">Governing Body</h3>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto" />
          </div>

          {governingBody.length === 0 ? (
            <div className="text-center text-gray-600 py-8 text-sm sm:text-base">
              No governing body members...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {governingBody.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={getImageSrc(member.photo)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h4 className="text-gray-900 text-lg sm:text-xl mb-1">{member.name}</h4>
                    <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                    {member.mail && (
                      <div className="flex items-start justify-center gap-2 text-gray-600">
                        <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                        <a href={`mailto:${member.mail}`} className="text-xs sm:text-sm hover:text-blue-600 break-words text-center">
                          {member.mail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* General Co-ordinator */}
        {generalCoordinator && (
          <div className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-gray-900 text-2xl sm:text-3xl mb-2">General Co-ordinator</h3>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto" />
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow max-w-sm">
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={getImageSrc(generalCoordinator.photo)}
                    alt={generalCoordinator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-gray-900 text-lg sm:text-xl mb-1">{generalCoordinator.name}</h4>
                  <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{generalCoordinator.position}</p>
                  {generalCoordinator.mail && (
                    <div className="flex items-start justify-center gap-2 text-gray-600">
                      <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                      <a href={`mailto:${generalCoordinator.mail}`} className="text-xs sm:text-sm hover:text-blue-600 break-words text-center">
                        {generalCoordinator.mail}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Departmental Directors */}
        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-gray-900 text-2xl sm:text-3xl mb-2">Departmental Directors</h3>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto" />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {/* Event Management */}
            {em.length > 0 && (
              <div>
                <h4 className="text-gray-900 text-xl sm:text-2xl text-center mb-6 sm:mb-8">Event Management</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {em.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-200">
                        <img
                          src={getImageSrc(member.photo)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 text-center">
                        <h5 className="text-gray-900 text-lg sm:text-xl mb-1">{member.name}</h5>
                        <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                        {member.mail && (
                          <div className="flex items-start justify-center gap-2 text-gray-600">
                            <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                            <a
                              href={`mailto:${member.mail}`}
                              className="text-xs sm:text-sm hover:text-blue-600 break-words text-center"
                            >
                              {member.mail}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Creative & IT */}
            {creative.length > 0 && (
              <div>
                <h4 className="text-gray-900 text-xl sm:text-2xl text-center mb-6 sm:mb-8">Creative & IT</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {creative.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-200">
                        <img
                          src={getImageSrc(member.photo)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 text-center">
                        <h5 className="text-gray-900 text-lg sm:text-xl mb-1">{member.name}</h5>
                        <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                        {member.mail && (
                          <div className="flex items-start justify-center gap-2 text-gray-600">
                            <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                            <a
                              href={`mailto:${member.mail}`}
                              className="text-xs sm:text-sm hover:text-blue-600 break-words text-center"
                            >
                              {member.mail}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Training & Research */}
            {training.length > 0 && (
              <div>
                <h4 className="text-gray-900 text-xl sm:text-2xl text-center mb-6 sm:mb-8">Training & Research</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {training.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-200">
                        <img
                          src={getImageSrc(member.photo)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 text-center">
                        <h5 className="text-gray-900 text-lg sm:text-xl mb-1">{member.name}</h5>
                        <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                        {member.mail && (
                          <div className="flex items-start justify-center gap-2 text-gray-600">
                            <Mail size={16} className="flex-shrink-0 mt-0.5" />
                            <a
                              href={`mailto:${member.mail}`}
                              className="text-sm hover:text-blue-600 break-words text-center"
                            >
                              {member.mail}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Human Resource Management */}
            {hr.length > 0 && (
              <div>
                <h4 className="text-gray-900 text-2xl text-center mb-8">
                  Human Resource Management
                </h4>
                <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {hr.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-200">
                        <img
                          src={getImageSrc(member.photo)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 text-center">
                        <h5 className="text-gray-900 text-lg sm:text-xl mb-1">{member.name}</h5>
                        <p className="text-blue-600 mb-2 sm:mb-3 text-sm sm:text-base">{member.position}</p>
                        {member.mail && (
                          <div className="flex items-start justify-center gap-2 text-gray-600">
                            <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                            <a
                              href={`mailto:${member.mail}`}
                              className="text-xs sm:text-sm hover:text-blue-600 break-words text-center"
                            >
                              {member.mail}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show message if no departments have members */}
            {em.length === 0 && creative.length === 0 && training.length === 0 && hr.length === 0 && (
              <div className="text-center text-gray-600 py-8">
                No departmental directors...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
