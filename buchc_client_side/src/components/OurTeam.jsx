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
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold mb-2">Our Team</h2>
          <p className="text-gray-600 mb-10">
            Meet the dedicated leaders driving BUCHC forward
          </p>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="our-team" className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-2">Our Team</h2>
        <p className="text-gray-600 mb-10">
          Meet the dedicated leaders driving BUCHC forward
        </p>
      </div>
      {/* governing body */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-gray-800 mb-2">Governing Body</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full "></div>
        </div>
        {governingBody.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            No governing body members. Add team members from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {governingBody.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className=" w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                  <img
                    src={getImageSrc(member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-gray-800">{member.name}</h4>
                <p className="text-blue-600 font-medium text-sm mb-3">
                  {member.position}
                </p>
                {member.mail && (
                  <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                    <Mail color="#007bff" size={14} />
                    <span>{member.mail}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* General Co-ordinator */}
      {generalCoordinator && (
        <div className="max-w-6xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-800 mb-2">General Co-ordinator</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={getImageSrc(generalCoordinator.photo)}
                  alt={generalCoordinator.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-bold text-gray-800">{generalCoordinator.name}</h4>
              <p className="text-blue-600 font-medium text-sm mb-3">
                {generalCoordinator.position}
              </p>
              {generalCoordinator.mail && (
                <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                  <Mail color="#007bff" size={14} />
                  <span>{generalCoordinator.mail}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Departmental Directors */}
      <div className="text-center mb-5 mt-20">
        <h2 className="text-3xl text-gray-800 mb-2">Departmental Directors</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
      {/* Event */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">Event Management</h4>
        </div>
        {em.length === 0 ? (
          <div className="text-center text-gray-600 py-4">
            No Event Management directors. Add team members from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
            {em.map((member, index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                  <img
                    src={getImageSrc(member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h4 className="font-bold text-gray-800">{member.name}</h4>

                <p className="text-blue-600 font-medium text-sm mb-3">
                  {member.position}
                </p>

                {member.mail && (
                  <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                    <Mail color="#007bff" size={14} />
                    <span>{member.mail}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Creative & IT */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">Creative & IT</h4>
        </div>
        {creative.length === 0 ? (
          <div className="text-center text-gray-600 py-4">
            No Creative & IT directors. Add team members from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
            {creative.map((member, index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                  <img
                    src={getImageSrc(member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h4 className="font-bold text-gray-800">{member.name}</h4>

                <p className="text-blue-600 font-medium text-sm mb-3">
                  {member.position}
                </p>

                {member.mail && (
                  <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                    <Mail color="#007bff" size={14} />
                    <span>{member.mail}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Training & Research */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">Training & Research</h4>
        </div>
        {training.length === 0 ? (
          <div className="text-center text-gray-600 py-4">
            No Training & Research directors. Add team members from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
            {training.map((member, index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                  <img
                    src={getImageSrc(member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h4 className="font-bold text-gray-800">{member.name}</h4>

                <p className="text-blue-600 font-medium text-sm mb-3">
                  {member.position}
                </p>

                {member.mail && (
                  <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                    <Mail color="#007bff" size={14} />
                    <span>{member.mail}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HR */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">
            Human Resource Management
          </h4>
        </div>
        {hr.length === 0 ? (
          <div className="text-center text-gray-600 py-4">
            No HR directors. Add team members from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
            {hr.map((member, index) => (
              <div
                key={index}
                className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                  <img
                    src={getImageSrc(member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h4 className="font-bold text-gray-800">{member.name}</h4>

                <p className="text-blue-600 font-medium text-sm mb-3">
                  {member.position}
                </p>

                {member.mail && (
                  <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                    <Mail color="#007bff" size={14} />
                    <span>{member.mail}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
