# 🛒 বাজার দর — BazarDor

> বাংলাদেশের প্রতিদিনের বাজার দর এক নজরে | Bangladesh Daily Market Price Tracker

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-1.7-green)](https://better-auth.com/)

---

## 📖 Short Description

**বাজার দর (BazarDor)** is a real-time market price tracking application for Bangladesh. It displays daily prices of essential commodities like rice (চাল), lentils (ডাল), oil (তেল), vegetables (সবজি), fish (মাছ), meat (মাংস), and spices (মসলা) — sourced from markets across all divisions of Bangladesh.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Full-stack React framework, SSR, routing |
| **TypeScript 5** | Type safety across the entire codebase |
| **Tailwind CSS 4** | Utility-first CSS styling |
| **DaisyUI 5** | Component library built on Tailwind |
| **BetterAuth 1.7** | Authentication (email/password + Google + GitHub) |
| **SQLite (better-sqlite3)** | Local auth database |
| **React Hot Toast** | Toast notifications |
| **Lucide React** | Icon library |
| **Hind Siliguri (Google Fonts)** | Bengali typography |

---

## ✨ 5 Key Features

### 1. 📊 Live Price Ticker
An infinite-scrolling marquee strip below the navbar shows live prices for all products — including emoji, name, price in Bengali digits, and up/down percentage change. Pauses on hover.

### 2. 🏪 Market-Based Price Details (Protected Route)
Product detail pages (requiring login) show comprehensive data — price history (today/yesterday/last week/last month), min/max/average price summary, and per-market pricing grouped by division across Bangladesh.

### 3. 🔐 Full Authentication System
Complete auth with BetterAuth: email + password signup/login, Google OAuth, GitHub OAuth, user profile page, and profile name update. Toast notifications on all auth events.

### 4. ⚖️ Sorting & Filtering
Category pages feature a Bengali sort dropdown (ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম) that correctly sorts by numeric price value (not string), with skeleton loading states.

### 5. 📱 Fully Responsive Design
The entire app — navbar, ticker, hero, product grids, detail pages — is fully responsive across mobile, tablet, and desktop. The grid collapses from 4 columns to 2 on mobile, with proper touch targets.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd B14-A7-Bazar-Dor

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Submission

- **Live Link:** *(deploy and fill here)*
- **GitHub Repository Link:** https://github.com/ridwanoorrahmanrafi/B14-A7-Bazar-Dor

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page (risers, fallers, all products)
│   ├── product/[slug]/   # Product detail (protected route)
│   ├── category/[slug]/  # Category page with sort
│   ├── signin/           # Sign in page
│   ├── signup/           # Sign up page
│   ├── profile/          # User profile
│   └── profile/update/   # Update profile name
├── components/
│   ├── Navbar.tsx        # Navbar with ticker + auth
│   ├── PriceTicker.tsx   # Infinite scrolling price strip
│   ├── ProductCard.tsx   # Product card component
│   ├── ProductCardSkeleton.tsx
│   └── Footer.tsx
└── lib/
    ├── auth.ts           # BetterAuth server config
    ├── auth-client.ts    # BetterAuth client
    └── types.ts          # TypeScript types + API utilities
```
