# Hima Lifeline Bracelet (HLB) - Dashboard

A modern, premium medical emergency monitoring system dashboard built with Next.js, Tailwind CSS, and TypeScript.

## Features

- 🎨 Ultra-modern, minimal, premium UI design
- 🌓 Dark and Light mode support
- 📱 Fully responsive design
- 🗺️ Live map with GPS tracking visualization
- 📊 Real-time analytics and charts
- 🔔 Live alerts feed
- 📈 KPI dashboard with key metrics
- 🇸🇦 Saudi Vision 2030 inspired color palette

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (for analytics)
- **Lucide React** (icons)
- **next-themes** (theme management)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
him/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── header.tsx          # Top navigation bar
│   ├── sidebar.tsx         # Side navigation menu
│   ├── kpi-card.tsx        # KPI metric cards
│   ├── live-map.tsx        # Live map component
│   ├── alerts-feed.tsx     # Alerts feed panel
│   ├── analytics-charts.tsx # Analytics charts
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   ├── mock-data.ts        # Mock data for development
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Design Philosophy

The dashboard follows a premium, minimalistic design approach inspired by:
- Apple's design language
- Saudi Vision 2030 aesthetics
- Modern healthcare monitoring systems

### Color Palette

- **Primary Green**: `#00A859` (Saudi Vision 2030 green)
- **Mint**: `#7FD3B8` (Accent color)
- **Dark Slate**: `#1A1F2E`, `#2D3748` (Dark mode backgrounds)
- **Status Colors**: Red (Critical), Orange (Warning), Green (Normal)

## Features Overview

### Dashboard Sections

1. **KPI Cards**: Four key metrics at a glance
   - Active Bracelets
   - Critical Alerts Now
   - High-Risk Patients
   - Overcrowded Zones

2. **Live Map**: Real-time GPS visualization
   - Color-coded status markers
   - Interactive map view
   - Zone legend

3. **Alerts Feed**: Real-time monitoring feed
   - Severity-based color coding
   - Patient and bracelet information
   - Time-stamped alerts

4. **Analytics**: Data visualization
   - 24h Heart Rate Trend
   - 24h SpO₂ Trend
   - Alerts Per Hour
   - Alert Categories Distribution

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
saudi: {
  green: '#00A859',
  mint: '#7FD3B8',
  dark: '#1A1F2E',
  slate: '#2D3748',
}
```

### Mock Data

Update `lib/mock-data.ts` to modify the sample data used in the dashboard.

## Build for Production

```bash
npm run build
npm start
```

## License

This project is a prototype for the Hima Lifeline Bracelet system.

