import { CAT, PK } from "../constants/theme";

const INFO_FIELDS = [
  ["📅 Date",   (ev) => ev.date],
  ["⏰ Time",   (ev) => ev.time],
  ["📍 Venue",  (ev) => ev.venue],
  ["🎟 Ticket", (ev) => ev.ticket_price],
  ["⚡ RSVP",   (ev) => (ev.rsvp_required === "Yes" ? "Required" : "Walk-in OK")],
];

export default function Modal({ ev, onClose }) {
  if (!ev) return null;

  const cfg = CAT[ev.category] ?? CAT["Other"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(157,23,77,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 999, padding: 16, backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16,
          maxWidth: 540, width: "100%", maxHeight: "88vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(157,23,77,0.18), 0 4px 16px rgba(0,0,0,0.08)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 22px 16px", borderBottom: `3px solid ${cfg.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
              padding: "3px 10px", borderRadius: 20,
            }}>
              {cfg.emoji} {ev.category}
            </span>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}
            >
              ✕
            </button>
          </div>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, fontFamily: "inherit" }}>
            {ev.name}
          </h2>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {INFO_FIELDS.map(([label, getValue]) => {
              const value = getValue(ev);
              if (!value || value === "TBD") return null;
              return (
                <div key={label} style={{ background: PK.pale, borderRadius: 8, padding: "9px 11px" }}>
                  <div style={{ fontSize: 10, color: PK.mid, fontWeight: 700, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{value}</div>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div>
            <div style={{ fontSize: 10, color: PK.mid, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
              DESCRIPTION
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#334155", lineHeight: 1.65, fontFamily: "inherit" }}>{ev.description}</p>
          </div>

          {/* Pro tip */}
          {ev.notes && (
            <div style={{
              background: PK.soft, border: `1px solid ${PK.light}`,
              borderRadius: 8, padding: "10px 12px",
            }}>
              <div style={{ fontSize: 10, color: PK.deep, fontWeight: 800, marginBottom: 4 }}>💡 PRO TIP</div>
              <p style={{ margin: 0, fontSize: 13, color: PK.deep, lineHeight: 1.5, fontFamily: "inherit" }}>{ev.notes}</p>
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {ev.info_url && (
              <a
                href={ev.info_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, display: "block", textAlign: "center",
                  background: cfg.color, color: "#fff",
                  padding: "11px", borderRadius: 9,
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                }}
              >
                🔗 Event Info
              </a>
            )}
            {ev.rsvp_url && (
              <a
                href={ev.rsvp_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, display: "block", textAlign: "center",
                  background: PK.soft, color: PK.deep,
                  border: `2px solid ${PK.hot}`,
                  padding: "10px", borderRadius: 9,
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                }}
              >
                📋 RSVP / Register
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
