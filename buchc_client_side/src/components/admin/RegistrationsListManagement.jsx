import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Search, Filter } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { exportRegistrations, getRegistrations } from "../../services/adminApi";

export default function RegistrationsListManagement() {
  const [registrations, setRegistrations] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getRegistrations("");
        setRegistrations(response.data.registrations || []);
        setSemesters(response.data.semesters || []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const loadRegistrations = async (semester = selectedSemester) => {
    setLoading(true);
    try {
      const response = await getRegistrations(semester);
      setRegistrations(response.data.registrations || []);
      setSemesters(response.data.semesters || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return registrations;

    return registrations.filter((registration) => {
      const values = [
        registration.name,
        registration.studentId,
        registration.currentSemester,
        registration.email,
        registration.programAndDepartment,
        registration.interestedDepartment,
        registration.contactNumber,
        registration.fideRating,
        registration.otherDepartmentInterest,
        registration.involvedInOtherClubs,
        registration.otherClubsDetails,
        registration.registrationSemester,
      ]
        .join(" ")
        .toLowerCase();

      return values.includes(query);
    });
  }, [registrations, search]);

  const stats = useMemo(() => {
    return {
      total: filteredRegistrations.length,
      semesters: semesters.length,
    };
  }, [filteredRegistrations, semesters.length]);

  const handleSemesterChange = async (value) => {
    setSelectedSemester(value);
    await loadRegistrations(value);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await exportRegistrations(selectedSemester);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = selectedSemester
        ? `registrations-${selectedSemester}.xlsx`
        : "registrations-all.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert(err.response?.data?.message || "Error exporting registrations");
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Registrations
            </h1>
            <p className="text-black mt-1 text-sm sm:text-base">
              Browse submitted registrations, filter by semester, and export to
              Excel.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/registration")}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
            >
              Registration Settings
            </button>
            <button
              onClick={handleExport}
              disabled={
                exporting || loading || filteredRegistrations.length === 0
              }
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Download size={16} />
              {exporting ? "Exporting..." : "Download Excel"}
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="text-sm text-black">Visible rows</div>
            <div className="mt-1 text-2xl font-semibold text-black">
              {stats.total}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="text-sm text-black">Available semesters</div>
            <div className="mt-1 text-2xl font-semibold text-black">
              {stats.semesters}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="text-sm text-black">Active filter</div>
            <div className="mt-1 text-lg font-semibold text-black">
              {selectedSemester || "All semesters"}
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-4 shadow">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <Search size={18} className="text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-sm text-black"
                placeholder="Search name, ID, semester, email"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <Filter size={18} className="text-black" />
              <select
                value={selectedSemester}
                onChange={(e) => handleSemesterChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm text-black"
              >
                <option value="">All semesters</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-black shadow">
            Loading registrations...
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-black shadow">
            No registrations found
          </div>
        ) : (
          <div className="space-y-4">
            <div className="hidden lg:block rounded-2xl bg-white shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Student ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Current Semester
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Program / Dept
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Interested Dept
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        FIDE/Online Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Other Dept Interest
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        In Other Clubs
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Other Clubs Details
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Registration Semester
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Submitted
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-black">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.studentId}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.currentSemester}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.programAndDepartment}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.interestedDepartment}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.contactNumber}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.fideRating}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.otherDepartmentInterest}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.involvedInOtherClubs}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.otherClubsDetails}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {registration.registrationSemester}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          {new Date(registration.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-black">
                          <button
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setDetailsOpen(true);
                            }}
                            className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 lg:hidden">
              {filteredRegistrations.map((registration) => (
                <article
                  key={registration._id}
                  className="rounded-2xl bg-white p-4 shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {registration.name}
                      </h2>
                      <p className="text-sm text-black">
                        {registration.studentId}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {registration.registrationSemester}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-black">
                    <div>
                      <span className="font-medium text-black">
                        Current Semester:
                      </span>{" "}
                      {registration.currentSemester}
                    </div>
                    <div>
                      <span className="font-medium text-black">Program:</span>{" "}
                      {registration.programAndDepartment}
                    </div>
                    <div>
                      <span className="font-medium text-black">
                        Interested Dept:
                      </span>{" "}
                      {registration.interestedDepartment}
                    </div>
                    <div>
                      <span className="font-medium text-black">
                        FIDE/Rating:
                      </span>{" "}
                      {registration.fideRating || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-black">
                        Other Dept Interest:
                      </span>{" "}
                      {registration.otherDepartmentInterest || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-black">
                        In Other Clubs:
                      </span>{" "}
                      {registration.involvedInOtherClubs || "No"}
                    </div>
                    {registration.involvedInOtherClubs === "Yes" && (
                      <div>
                        <span className="font-medium text-black">
                          Other Clubs Details:
                        </span>{" "}
                        {registration.otherClubsDetails || "—"}
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-black">Email:</span>{" "}
                      {registration.email}
                    </div>
                    <div>
                      <span className="font-medium text-black">Contact:</span>{" "}
                      {registration.contactNumber}
                    </div>
                    <div>
                      <span className="font-medium text-black">Submitted:</span>{" "}
                      {new Date(registration.createdAt).toLocaleString()}
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          setSelectedRegistration(registration);
                          setDetailsOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {detailsOpen && selectedRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => {
                setDetailsOpen(false);
                setSelectedRegistration(null);
              }}
            />

            <div className="relative max-w-2xl w-full rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-black">
                  Registration Details
                </h3>
                <button
                  onClick={() => {
                    setDetailsOpen(false);
                    setSelectedRegistration(null);
                  }}
                  className="text-black hover:text-black"
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-black">
                {Object.entries(selectedRegistration).map(([key, value]) => {
                  // Skip internal or large fields
                  if (key === "__v" || key === "_id") return null;
                  return (
                    <div key={key} className="flex gap-2">
                      <div className="w-48 font-medium text-black">{key}</div>
                      <div className="flex-1 break-words">
                        {String(value ?? "—")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
