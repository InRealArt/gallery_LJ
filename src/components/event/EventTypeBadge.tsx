export function EventTypeBadge({ type }: { type: "event" | "exhibition" }) {
  const label = type === "exhibition" ? "Exposition" : "Événement";
  return (
    <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-white border border-white/40 px-4 py-1.5">
      {label}
    </span>
  );
}
