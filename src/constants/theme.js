/** Category display config: emoji, text color, background, border */
export const CAT = {
  "Music":        { emoji: "🎵", color: "#16a34a", bg: "#dcfce7", border: "#86efac" },
  "Food & Drink": { emoji: "🍻", color: "#ea580c", bg: "#ffedd5", border: "#fdba74" },
  "Wellness":     { emoji: "🧘", color: "#0891b2", bg: "#cffafe", border: "#67e8f9" },
  "Networking":   { emoji: "🤝", color: "#ca8a04", bg: "#fef9c3", border: "#fde047" },
  "Art & Design": { emoji: "🎨", color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" },
  "Tech & Expo":  { emoji: "💡", color: "#2563eb", bg: "#dbeafe", border: "#93c5fd" },
  "Comedy":       { emoji: "😂", color: "#7c3aed", bg: "#ede9fe", border: "#c4b5fd" },
  "Film":         { emoji: "🎬", color: "#b45309", bg: "#fef3c7", border: "#fcd34d" },
  "Education":    { emoji: "📚", color: "#0f766e", bg: "#ccfbf1", border: "#5eead4" },
  "Other":        { emoji: "✨", color: "#6b7280", bg: "#f3f4f6", border: "#d1d5db" },
};

/** Pink accent palette used throughout the UI */
export const PK = {
  deep:  "#9d174d",  // RSVP text, pro-tip text, header gradient end
  mid:   "#be185d",  // subheading / label text in modal
  hot:   "#ec4899",  // clear button, RSVP button border, card hover border
  light: "#fbcfe8",  // pill strip border, dropdown borders, search border
  pale:  "#fdf2f8",  // page bg, modal info cell bg
  soft:  "#fce7f3",  // pro-tip bg, inactive pill bg
  faint: "#fff0f7",  // category pill strip bg
};

/** Ticket-price tiers available in the filter dropdown */
export const PRICE_OPTIONS = [
  "Free (Public)",
  "Free (RSVP)",
  "Free (Guest Pass)",
  "Free (Invite Only)",
  "Free–$25 (tiered)",
];
