export default function PriceBadge({ price }) {
  if (!price) return null;

  const isPublic = price.includes("Public");
  const isFancy  = price.includes("Invite") || price.includes("tiered") || price.includes("$");

  const [color, bg, border] = isFancy
    ? ["#c2410c", "#fff7ed", "#fed7aa"]
    : isPublic
    ? ["#15803d", "#f0fdf4", "#86efac"]
    : ["#1d4ed8", "#eff6ff", "#93c5fd"];

  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      color,
      background: bg,
      border: `1px solid ${border}`,
    }}>
      {price}
    </span>
  );
}
