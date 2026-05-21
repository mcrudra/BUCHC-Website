import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck2, Lock, Send } from "lucide-react";
import { fetchAllSettings, submitRegistration } from "../services/api";
import RegistrationBanner from "./RegistrationBanner";

export default function RegistrationPage() {
  const [settings, setSettings] = useState({
    registration_open: "false",
    registration_page_title: "BUCHC Registration",
    registration_page_description: "",
    registration_semester_label: "Spring 26",
    registration_live_text: "Registration is live now",
  });
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    currentSemester: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings((current) => ({ ...current, ...data }));
      setLoading(false);
    };

    loadSettings();
  }, []);

  const isOpen = settings.registration_open === "true";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await submitRegistration(formData);
      setFormData({ name: "", studentId: "", currentSemester: "", email: "" });
      navigate("/registration-success");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Could not submit registration.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08111f] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_38%),linear-gradient(180deg,_#08111f_0%,_#0d1729_50%,_#07111d_100%)] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <RegistrationBanner compact showAction={false} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm">
              <CalendarCheck2 size={18} />
              <span>
                {isOpen ? "Registration window open" : "Registration closed"}
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {settings.registration_page_title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-7">
                {settings.registration_page_description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white">
                  Registration semester
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  This form is currently collecting registrations for{" "}
                  <span className="font-semibold text-blue-200">
                    {settings.registration_semester_label}
                  </span>
                  .
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white">
                  What to submit
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Name, student ID, current semester, and email are stored for
                  the active registration batch.
                </p>
              </div>
            </div>

            {!isOpen && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 sm:p-6 text-amber-50">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="mt-1 shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Registration is currently closed
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-amber-100/90">
                      Please check back later when the admin opens the
                      registration window.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-50">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-50">
                {errorMessage}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="border-b border-white/10 bg-white/5 px-5 py-4 sm:px-6">
              <h2 className="text-xl font-semibold">Registration Form</h2>
              <p className="text-sm text-slate-300 mt-1">
                {isOpen
                  ? "Fill in your details to join this registration batch."
                  : "Form submission is disabled while registration is closed."}
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {isOpen ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) =>
                        setFormData({ ...formData, studentId: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Current Semester *
                    </label>
                    <input
                      type="text"
                      value={formData.currentSemester}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentSemester: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                      placeholder="e.g. 3rd Semester"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
                    You are registering for Fresher's orientation of{" "}
                    <span className="font-semibold">
                      {settings.registration_semester_label}
                    </span>
                    .
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    {submitting ? "Submitting..." : "Submit Registration"}
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-slate-200 flex items-center gap-3">
                  <Lock size={20} className="shrink-0" />
                  <span>Registration is currently closed.</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
