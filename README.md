# SXSW 2026 — Free Events Lookup

A fast, filterable event directory for free and low-cost events at SXSW 2026 in Austin, TX (March 12–18).

## Features

- Browse and search hundreds of free SXSW events
- Filter by category, access type, and RSVP requirement
- Click any card to open a detail modal with venue, time, and RSVP links
- Category pills for quick one-click filtering
- Fully responsive layout

## Categories

🎵 Music · 🍻 Food & Drink · 🧘 Wellness · 🤝 Networking · 🎨 Art & Design · 💡 Tech & Expo · 😂 Comedy · 🎬 Film · 📚 Education · ✨ Other

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- No external UI libraries — all styling is inline React

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
  components/
    EventCard.jsx   # Individual event card
    Modal.jsx       # Event detail modal
    PriceBadge.jsx  # Ticket price badge
  constants/
    theme.js        # Category config & color palette
  data/
    events.js       # Full event dataset
  App.jsx           # Root component with filters & layout
  main.jsx          # React entry point
```
