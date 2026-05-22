import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GiChessKing, GiChessQueen } from "react-icons/gi";
import galleryItems from "../assets/galleryItems";

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0f172a] text-white">
      {/* Chess Board Background */}
      <div className="fixed inset-0 z-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #1e293b 25%, transparent 25%),
              linear-gradient(-45deg, #1e293b 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #1e293b 75%),
              linear-gradient(-45deg, transparent 75%, #1e293b 75%)
            `,
            backgroundSize: "120px 120px",
            backgroundPosition: "0 0, 0 60px, 60px -60px, -60px 0px",
          }}
        />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black/80 via-[#0f172a]/70 to-blue-950/50" />

      {/* White King - Left */}
      <div className="pointer-events-none fixed left-[-3px] top-1/2 z-0 hidden -translate-y-1/2 lg:block">
        <GiChessKing className="text-white opacity-[0.08]" size={340} />
      </div>

      {/* Black Queen - Right */}
      <div className="pointer-events-none fixed right-[-3px] top-1/2 z-0 hidden -translate-y-1/2 lg:block">
        <GiChessQueen className="text-black opacity-20" size={340} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        {/* Heading */}
        <div className="mt-10 mb-8 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-blue-300">
            Chess Gallery
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
            Life at BRAC University Chess Club
          </h1>

          <div className="mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
        </div>

        {/* Gallery */}
        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/40"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-300 sm:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
