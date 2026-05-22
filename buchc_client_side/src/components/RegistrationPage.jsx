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
    gSuiteEmail: "",
    name: "",
    studentId: "",
    programAndDepartment: "",
    currentSemester: "",
    contactNumber: "",
    fideRating: "",
    interestReason: "",
    interestedDepartment: "",
    previousWorkExperience: "",
    otherDepartmentInterest: "",
    involvedInOtherClubs: "No",
    otherClubsDetails: "",
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
      // Map gSuiteEmail to email to remain compatible with backend
      const { gSuiteEmail, ...rest } = formData;
      const payload = { ...rest, email: gSuiteEmail };
      await submitRegistration(payload);
      setFormData({
        gSuiteEmail: "",
        name: "",
        studentId: "",
        programAndDepartment: "",
        currentSemester: "",
        contactNumber: "",
        fideRating: "",
        interestReason: "",
        interestedDepartment: "",
        previousWorkExperience: "",
        otherDepartmentInterest: "",
        involvedInOtherClubs: "No",
        otherClubsDetails: "",
      });
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
                  We collect your G-suite email, name, student ID, program &
                  department, current semester, contact number, rating (if any),
                  your interests and experience for club placement.
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
                <form
                  onSubmit={handleSubmit}
                  className="registration-form space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      G-suite Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.gSuiteEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gSuiteEmail: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

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
                      Program and Department
                    </label>
                    <input
                      type="text"
                      value={formData.programAndDepartment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          programAndDepartment: e.target.value,
                        })
                      }
                      placeholder="e.g. CSE, EEE, BIO, MNS"
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
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
                      placeholder="e.g. 1st/2nd"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      FIDE Rating or Online Rating
                    </label>
                    <input
                      type="text"
                      value={formData.fideRating}
                      onChange={(e) =>
                        setFormData({ ...formData, fideRating: e.target.value })
                      }
                      placeholder="If any"
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      What made you interested in joining BRAC University Chess
                      Club?
                    </label>
                    <textarea
                      value={formData.interestReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          interestReason: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Which department of BUCHC you're interested to join? *
                    </label>
                    <select
                      value={formData.interestedDepartment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          interestedDepartment: e.target.value,
                        })
                      }
                      className="w-full px-3 py-3 text-base rounded-md border border-white/10 bg-white/5 text-white"
                    >
                      <option value="">Select department</option>
                      <option value="Creative and IT">Creative and IT</option>
                      <option value="Human Resources Management">
                        Human Resources Management
                      </option>
                      <option value="Event Management">Event Management</option>
                      <option value="Training and Research">
                        Training and Research
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Do you have any previous work experience in event
                      organization or volunteering in events? *
                    </label>
                    <textarea
                      value={formData.previousWorkExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          previousWorkExperience: e.target.value,
                        })
                      }
                      placeholder="Write No if none"
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Any other department you're interested to join?
                    </label>
                    <input
                      type="text"
                      value={formData.otherDepartmentInterest}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          otherDepartmentInterest: e.target.value,
                        })
                      }
                      placeholder="eg. Creative and IT / Event Management / No"
                      className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-100">
                      Are you involved in any other clubs of BRAC University? *
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="involvedInOtherClubs"
                          checked={formData.involvedInOtherClubs === "Yes"}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              involvedInOtherClubs: "Yes",
                            })
                          }
                        />
                        <span className="text-sm ml-1">Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="involvedInOtherClubs"
                          checked={formData.involvedInOtherClubs === "No"}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              involvedInOtherClubs: "No",
                            })
                          }
                        />
                        <span className="text-sm ml-1">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.involvedInOtherClubs === "Yes" && (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-slate-100">
                        Write designation/department/club name *
                      </label>
                      <input
                        type="text"
                        value={formData.otherClubsDetails}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            otherClubsDetails: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                        required
                      />
                    </div>
                  )}

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
                  <div className="mt-4 text-sm text-slate-300">
                    <strong>Notice:</strong> Interview & Club Orientation
                    Details will be mailed to you after the recruitment deadline
                    is over!
                    <br />
                    Till then, Join our Discord Server for further queries:{" "}
                    <a
                      href={
                        settings.join_link ||
                        "https://discord.com/invite/KWyShyZaQz"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 underline"
                    >
                      {settings.join_link ? "Discord" : "Discord"}
                    </a>
                  </div>
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
