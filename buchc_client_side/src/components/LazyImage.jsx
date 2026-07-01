import { useState } from "react";

export default function LazyImage({ src, alt, className, imgClassName, fallbackSrc, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src) {
    return <div className={`relative bg-slate-800 ${className || ""}`} />;
  }

  return (
    <div className={`relative ${className || ""}`}>
      <div
        className={`absolute inset-0 z-10 img-skeleton pointer-events-none transition-opacity duration-500 ${loaded || error ? "opacity-0" : "opacity-100"}`}
      />
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={onClick}
          className={imgClassName || ""}
        />
      ) : fallbackSrc ? (
        <img src={fallbackSrc} alt={alt} className={imgClassName || ""} />
      ) : (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
          <span className="text-slate-500 text-xs">No image</span>
        </div>
      )}
    </div>
  );
}
