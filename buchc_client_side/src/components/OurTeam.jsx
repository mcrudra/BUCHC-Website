import { Mail } from "lucide-react";
import rudraBhai from "../assets/governingBody/rudraBhai.jpg";
export default function OurTeam() {
  // governing
  const GoverningBody = [
    {
      position: "President",
      name: "Monish Chandra Rudra",
      photo: rudraBhai,
      mail: "president@buccclub",
    },
    {
      position: "Vice President",
      name: "Kamrul Hasan",
      photo: "/assets/governingBody/rudraBhai.jpg",
      mail: "vp@buccclub",
    },
    {
      position: "General Secretary",
      name: "Nusrat Jahan",
      photo: "/images/members/nusrat-jahan.jpg",
      mail: "secretary@buccclub",
    },
    {
      position: "Treasurer",
      name: "Fatima Akter",
      photo: "/images/members/fatima-akter.jpg",
      mail: "treasurer@buccclub",
    },
  ];

  //Event Management
  const em = [
    {
      position: "President",
      name: "Monish Chandra Rudra",
      photo: rudraBhai,
      mail: "president@buccclub",
    },
    {
      position: "Vice President",
      name: "Kamrul Hasan",
      photo: "/assets/governingBody/rudraBhai.jpg",
      mail: "vp@buccclub",
    },
  ];

  //Creative & IT
  const creative = [
    {
      position: "President",
      name: "Monish Chandra Rudra",
      photo: rudraBhai,
      mail: "president@buccclub",
    },
    {
      position: "Vice President",
      name: "Kamrul Hasan",
      photo: "/assets/governingBody/rudraBhai.jpg",
      mail: "vp@buccclub",
    },
  ];

  //Training & Research
  const training = [
    {
      position: "President",
      name: "Monish Chandra Rudra",
      photo: rudraBhai,
      mail: "president@buccclub",
    },
    {
      position: "Vice President",
      name: "Kamrul Hasan",
      photo: "/assets/governingBody/rudraBhai.jpg",
      mail: "vp@buccclub",
    },
  ];

  //Human Resource Management
  const hr = [
    {
      position: "President",
      name: "Monish Chandra Rudra",
      photo: rudraBhai,
      mail: "president@buccclub",
    },
    {
      position: "Vice President",
      name: "Kamrul Hasan",
      photo: "/assets/governingBody/rudraBhai.jpg",
      mail: "vp@buccclub",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-2">Our Team</h2>
        <p className="text-gray-600 mb-10">
          Meet the dedicated leaders driving BUCC forward
        </p>
      </div>
      {/* governing body */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-gray-800 mb-2">Governing Body</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full "></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GoverningBody.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              {" "}
              <div className=" w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-bold text-gray-800">{member.name}</h4>
              <p className="text-blue-600 font-medium text-sm mb-3">
                {member.position}
              </p>
              <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                <Mail color="#007bff" size={14} />
                <span>{member.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
          {em.map((member, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-bold text-gray-800">{member.name}</h4>

              <p className="text-blue-600 font-medium text-sm mb-3">
                {member.position}
              </p>

              <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                <Mail color="#007bff" size={14} />
                <span>{member.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creative & IT */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">Creative & IT</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
          {creative.map((member, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-bold text-gray-800">{member.name}</h4>

              <p className="text-blue-600 font-medium text-sm mb-3">
                {member.position}
              </p>

              <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                <Mail color="#007bff" size={14} />
                <span>{member.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training & Research */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">Training & Research</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
          {training.map((member, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-bold text-gray-800">{member.name}</h4>

              <p className="text-blue-600 font-medium text-sm mb-3">
                {member.position}
              </p>

              <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                <Mail color="#007bff" size={14} />
                <span>{member.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HR */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h4 className="text-xl text-gray-800 mb-2">
            Human Resource Management
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
          {hr.map((member, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-xl text-center hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-full h-62 overflow-hidden mb-2 rounded-t-xl group">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-bold text-gray-800">{member.name}</h4>

              <p className="text-blue-600 font-medium text-sm mb-3">
                {member.position}
              </p>

              <div className="flex items-center justify-center gap-3 mb-4 text-gray-600 text-sm">
                <Mail color="#007bff" size={14} />
                <span>{member.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
