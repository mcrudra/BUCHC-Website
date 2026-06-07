import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { GiChessKing, GiChessQueen } from "react-icons/gi";
import galleryItems from "../assets/galleryItems";
import { fetchGalleryItems } from "../services/api";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadGalleryItems = async () => {
      try {
        const data = await fetchGalleryItems();

        setItems(Array.isArray(data) ? data : galleryItems);
      } catch (error) {
        console.error("Error loading gallery items:", error);
        setItems(galleryItems);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryItems();
  }, []);

  const getItemImage = (item) => item.image || item.img;
  const getItemDescription = (item) => item.description || item.desc;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

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
          {loading ? (
            <div className="col-span-full text-center text-slate-300">
              Loading gallery...
            </div>
          ) : items.length === 0 ? (
            <div className="col-span-full text-center text-slate-300">
              No gallery items found.
            </div>
          ) : (
            items.map((item, index) => (
              <article
                key={item._id || `${item.title}-${index}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/40"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getItemImage(item)}
                    alt={item.title}
                    className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-110"
                    onClick={() => setSelectedItem(item)}
                  />
                </div>

                <div className="flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5 sm:p-6">
                  <h2 className="text-xl font-semibold text-white">
                    {item.title}
                  </h2>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="mt-4 inline-flex w-fit items-center rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200 hover:bg-cyan-500/20"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          <div
            className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 overflow-hidden flex items-center justify-center">
                <img
                  src={getItemImage(selectedItem)}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[50vh] lg:max-h-[85vh] object-contain block"
                />
              </div>
              <div className="lg:col-span-2 border-t border-white/10 bg-slate-900/95 p-5 lg:border-l lg:border-t-0 sm:p-6 lg:max-h-[85vh] overflow-y-auto">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Gallery Item
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {selectedItem.title}
                </h2>
                <div className="mt-4 pr-1">
                  <p className="text-sm leading-7 text-slate-300 sm:text-base">
                    {getItemDescription(selectedItem) ||
                      "No description added."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
