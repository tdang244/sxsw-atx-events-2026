import { useState, useMemo, useEffect } from "react";
import { EVENTS } from "./data/events";
import { CAT, PK, PRICE_OPTIONS } from "./constants/theme";
import EventCard from "./components/EventCard";
import Modal from "./components/Modal";

const STORAGE_KEY = "sxsw_starred_events";

function useStarred() {
  const [starred, setStarred] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...starred]));
  }, [starred]);

  function toggle(id) {
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return { starred, toggle };
}

const dropdownStyle = {
  padding: "0 36px 0 16px",
  height: 40,
  minWidth: 180,
  borderRadius: 8,
  border: `1.5px solid ${PK.light}`,
  fontSize: 13,
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  cursor: "pointer",
  fontFamily: "inherit",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23e9d5ff' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
};

function useFilters() {
  const [query,  setQuery]  = useState("");
  const [cat,    setCat]    = useState("All");
  const [access, setAccess] = useState("All");
  const [rsvp,   setRsvp]   = useState("All");

  const isFiltered = query || cat !== "All" || access !== "All" || rsvp !== "All";

  function clearAll() {
    setQuery(""); setCat("All"); setAccess("All"); setRsvp("All");
  }

  const filtered = useMemo(() => EVENTS.filter((ev) => {
    if (cat    !== "All" && ev.category     !== cat)    return false;
    if (access !== "All" && ev.ticket_price !== access) return false;
    if (rsvp === "Walk-in OK"    && ev.rsvp_required === "Yes") return false;
    if (rsvp === "RSVP Required" && ev.rsvp_required !== "Yes") return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        ev.name.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        (ev.venue  ?? "").toLowerCase().includes(q) ||
        (ev.notes  ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  }), [query, cat, access, rsvp]);

  return { query, setQuery, cat, setCat, access, setAccess, rsvp, setRsvp, isFiltered, clearAll, filtered };
}

function Header({ filters }) {
  const { query, setQuery, cat, setCat, access, setAccess, rsvp, setRsvp, isFiltered, clearAll, filtered } = filters;

  return (
    <div style={{
      background: `linear-gradient(135deg, #1e293b 0%, ${PK.deep} 100%)`,
      padding: "28px 20px 22px",
      color: "#fff",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, margin: 0 }}>
          SXSW 2026
        </h1>
        <div style={{ fontSize: 14, color: PK.light, marginTop: 4 }}>
          Free Events Lookup · Austin, TX · March 12–18
        </div>
        <p style={{ fontSize: 12, color: "#fda4af", margin: "4px 0 18px" }}>
          {EVENTS.length} events · Click any card for details &amp; RSVP
        </p>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: PK.light }}>
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, venues, artists..."
            style={{
              width: "100%", padding: "10px 12px 10px 36px",
              borderRadius: 10, border: `1px solid ${PK.light}`,
              fontSize: 14, background: "rgba(255,255,255,0.12)", color: "#fff",
              outline: "none", boxSizing: "border-box", fontFamily: "inherit",
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <select value={cat} onChange={(e) => setCat(e.target.value)} style={dropdownStyle}>
            <option value="All">All Categories</option>
            {Object.keys(CAT).map((c) => (
              <option key={c} value={c}>{CAT[c].emoji} {c}</option>
            ))}
          </select>

          <select value={access} onChange={(e) => setAccess(e.target.value)} style={dropdownStyle}>
            <option value="All">All Access Types</option>
            {PRICE_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select value={rsvp} onChange={(e) => setRsvp(e.target.value)} style={dropdownStyle}>
            <option value="All">Any RSVP</option>
            <option value="Walk-in OK">🚪 Walk-in OK</option>
            <option value="RSVP Required">⚡ RSVP Required</option>
          </select>

          {isFiltered && (
            <button
              onClick={clearAll}
              style={{ ...dropdownStyle, background: PK.hot, border: "none", fontWeight: 700 }}
            >
              ✕ Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryPills({ filtered, activeCat, onCatChange }) {
  const counts = useMemo(() => {
    const c = {};
    filtered.forEach((ev) => { c[ev.category] = (c[ev.category] ?? 0) + 1; });
    return c;
  }, [filtered]);

  return (
    <div style={{ background: PK.faint, borderBottom: `2px solid ${PK.light}`, overflowX: "auto" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "10px 20px", display: "flex", gap: 6, minWidth: "max-content" }}>
        {Object.entries(CAT).map(([name, cfg]) => {
          const count  = counts[name] ?? 0;
          const active = activeCat === name;
          return (
            <button
              key={name}
              onClick={() => onCatChange(active ? "All" : name)}
              style={{
                padding: "4px 12px", borderRadius: 20,
                border: `1.5px solid ${active ? cfg.color : PK.light}`,
                background: active ? cfg.bg : "#fff",
                color: active ? cfg.color : PK.mid,
                fontSize: 12, fontWeight: active ? 700 : 500,
                cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.12s", opacity: count === 0 ? 0.35 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {cfg.emoji} {name} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Parse "Mar 7", "Mar 12–18", "Mar TBD" → sort key (day number, TBD → 999)
function parseSortDay(dateStr) {
  if (!dateStr) return 999;
  const match = dateStr.match(/Mar\s+(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function MyEventsTab({ starredIds, onStar, onOpen }) {
  const starredEvents = useMemo(() => {
    return EVENTS
      .filter((ev) => starredIds.has(ev.id))
      .slice()
      .sort((a, b) => parseSortDay(a.date) - parseSortDay(b.date));
  }, [starredIds]);

  if (starredEvents.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", color: PK.mid }}>
        <div style={{ fontSize: 44 }}>⭐</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, color: PK.deep }}>No saved events yet</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>Star events from the All Events tab to save them here</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 20px 40px" }}>
      <p style={{ fontSize: 12.5, color: PK.mid, margin: "0 0 14px" }}>
        <strong style={{ color: PK.deep }}>{starredEvents.length}</strong> saved event{starredEvents.length !== 1 ? "s" : ""} · sorted by date
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {starredEvents.map((ev) => (
          <EventCard
            key={ev.id}
            ev={ev}
            onClick={onOpen}
            starred={true}
            onStar={onStar}
          />
        ))}
      </div>
    </div>
  );
}

function TabBar({ activeTab, onTabChange, starredCount }) {
  const tabs = [
    { id: "all",   label: "All Events", count: null },
    { id: "saved", label: "My Events",  count: starredCount },
  ];

  return (
    <div style={{
      background: "#fff",
      borderBottom: `2px solid ${PK.light}`,
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", display: "flex", gap: 4 }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: "12px 18px",
                border: "none",
                borderBottom: active ? `3px solid ${PK.hot}` : "3px solid transparent",
                background: "none",
                color: active ? PK.deep : "#64748b",
                fontWeight: active ? 800 : 500,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: -2,
                transition: "color 0.15s",
              }}
            >
              {tab.id === "saved" ? "⭐" : "📋"} {tab.label}
              {tab.count != null && (
                <span style={{
                  background: tab.count > 0 ? "#f59e0b" : "#e5e7eb",
                  color: tab.count > 0 ? "#fff" : "#94a3b8",
                  fontSize: 11, fontWeight: 700,
                  borderRadius: 20, padding: "1px 7px",
                  minWidth: 18, textAlign: "center",
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const filters = useFilters();
  const [selected, setSelected] = useState(null);
  const { starred, toggle } = useStarred();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: PK.pale, minHeight: "100vh" }}>

        <Header filters={filters} />

        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          starredCount={starred.size}
        />

        {activeTab === "all" && (
          <>
            <CategoryPills
              filtered={filters.filtered}
              activeCat={filters.cat}
              onCatChange={filters.setCat}
            />

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 20px 40px" }}>
              <p style={{ fontSize: 12.5, color: PK.mid, margin: "0 0 14px" }}>
                Showing <strong style={{ color: PK.deep }}>{filters.filtered.length}</strong> of {EVENTS.length} events
              </p>

              {filters.filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 24px", color: PK.mid }}>
                  <div style={{ fontSize: 44 }}>🔍</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, color: PK.deep }}>No events found</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Try clearing some filters</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {filters.filtered.map((ev) => (
                    <EventCard
                      key={ev.id}
                      ev={ev}
                      onClick={setSelected}
                      starred={starred.has(ev.id)}
                      onStar={toggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "saved" && (
          <MyEventsTab
            starredIds={starred}
            onStar={toggle}
            onOpen={setSelected}
          />
        )}
      </div>

      <Modal
        ev={selected}
        onClose={() => setSelected(null)}
        starred={selected ? starred.has(selected.id) : false}
        onStar={toggle}
      />
    </>
  );
}
