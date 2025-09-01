// src/pages/RecordingClasses.jsx
const styles = {
  brandBlue: "#18457A",
};

function RecordingCard({
  title = "Advance Machine Learning",
  subtitle = "Drive deep into machine learning",
  author = "John Doe",
}) {
  return (
    <div>
      {/* Thumbnail placeholder with rounded corners */}
      <div className="h-44 sm:h-48 w-full rounded-xl bg-slate-200" />
      <div className="mt-2">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">{title}</p>
        <p className="text-[11px] text-slate-600 -mt-0.5">{subtitle}</p>
        <p className="text-[11px] text-slate-500 mt-1">By {author}</p>
      </div>
    </div>
  );
}

export default function RecordingClasses() {
  const items = [
    { id: 1, title: "Advance Machine Learning", author: "John Doe" },
    { id: 2, title: "Advance Machine Learning", author: "John Doe" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: styles.brandBlue }}>
        Recording Classes
      </h1>

      {/* Two-column grid like the mock */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
        {items.map((c) => (
          <RecordingCard key={c.id} title={c.title} author={c.author} />
        ))}
      </div>
    </section>
  );
}
