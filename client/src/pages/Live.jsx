// src/pages/LiveClasses.jsx
import { useMemo } from "react";

const styles = {
  brandBlue: "#18457A",
  liveRed: "#D14343",
};

function LiveBadge() {
  return (
    <span className="pointer-events-none select-none inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] leading-none"
          style={{ borderColor: styles.liveRed, color: styles.liveRed }}>
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
      </svg>
      LIVE
    </span>
  );
}

function LiveCard({ title = "Advance Machine Learning", author = "John Doe" }) {
  return (
    <div className="relative">
      <div
        className="h-44 sm:h-48 w-full rounded-xl bg-slate-200 border"
        style={{ borderColor: styles.liveRed }}
      />
      <div className="absolute bottom-1.5 right-2">
        <LiveBadge />
      </div>

      <div className="mt-2">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">{title}</p>
        <p className="text-[11px] text-slate-600 -mt-0.5">Drive deep into machine learning</p>
        <p className="text-[11px] text-slate-500 mt-1">By {author}</p>
      </div>
    </div>
  );
}

export default function LiveClasses() {
  // Example data; replace with dynamic list later
  const items = useMemo(
    () => [
      { id: 1, title: "Advance Machine Learning", author: "John Doe" },
      { id: 2, title: "Advance Machine Learning", author: "John Doe" },
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: styles.brandBlue }}>
        Live Classes
      </h1>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
        {items.map((c) => (
          <LiveCard key={c.id} title={c.title} author={c.author} />
        ))}
      </div>
    </section>
  );
}
