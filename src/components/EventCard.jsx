import { useState } from "react";
import { CAT, PK } from "../constants/theme";
import PriceBadge from "./PriceBadge";

export default function EventCard({ ev, onClick, starred, onStar }) {
  const cfg = CAT[ev.category] ?? CAT["Other"];
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    background: starred ? "#fffbf0" : "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    cursor: "pointer",
    border: `1.5px solid ${starred ? "#f59e0b" : hovered ? PK.hot : "#e5e7eb"}`,
    boxShadow: hovered
      ? "0 6px 20px rgba(236,72,153,0.13)"
      : starred
        ? "0 2px 8px rgba(245,158,11,0.12)"
        : "0 1px 3px rgba(0,0,0,0.05)",
    transform: hovered ? "translateY(-2px)" : "none",
    transition: "all 0.15s",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "relative",
  };

  const truncate = (str, max) =>
    str.length > max ? str.slice(0, max) + "…" : str;

  return (
    <div
      onClick={() => onClick(ev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle}
    >
      {/* Title + category badge + star */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a", lineHeight: 1.35, flex: 1 }}>
          {ev.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
            padding: "2px 8px", borderRadius: 20,
            whiteSpace: "nowrap",
          }}>
            {cfg.emoji} {ev.category}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onStar(ev.id); }}
            title={starred ? "Remove from My Events" : "Save to My Events"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 16, lineHeight: 1, padding: "2px 0",
              opacity: starred ? 1 : 0.35,
              transition: "opacity 0.15s, transform 0.15s",
              transform: starred ? "scale(1.15)" : "scale(1)",
            }}
          >
            {starred ? "⭐" : "☆"}
          </button>
        </div>
      </div>

      {/* Date / time / venue */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px", fontSize: 12, color: "#64748b" }}>
        <span>📅 {ev.date}</span>
        {ev.time && ev.time !== "TBD" && <span>⏰ {ev.time}</span>}
        {ev.venue && ev.venue !== "TBD" && (
          <span>📍 {truncate(ev.venue, 32)}</span>
        )}
      </div>

      {/* Description preview */}
      <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.5 }}>
        {truncate(ev.description, 110)}
      </p>

      {/* Price + RSVP status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PriceBadge price={ev.ticket_price} />
        <span style={{ fontSize: 11, fontWeight: 600, color: ev.rsvp_required === "Yes" ? PK.deep : "#15803d" }}>
          {ev.rsvp_required === "Yes" ? "⚡ RSVP Required" : "🚪 Walk-in OK"}
        </span>
      </div>
    </div>
  );
}
