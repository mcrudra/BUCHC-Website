import { Link } from "react-router-dom";

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_38%),linear-gradient(180deg,_#08111f_0%,_#0d1729_50%,_#07111d_100%)] text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          You have successfully completed your registration.
        </h1>
        <p className="text-lg text-slate-300 mb-6">
          Thanks for staying with Brac University Chess Club
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
