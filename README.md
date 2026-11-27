# TeddyPups U.A.E. — Full-Stack Web Application

**Live Demo:** [https://teddy-pups-web.vercel.app/](https://teddy-pups-web.vercel.app/)

A full-stack clone of **TeddyPups U.A.E.** built with **Next.js 15 (App Router, React 19, TypeScript, Tailwind CSS v4)**, **Node.js + Express.js**, and **MongoDB (Mongoose)**, featuring custom storybook typography, interactive SVG mascot animations, scroll-driven paw trails, page transition curtains, and automatic fallback data for zero-config Vercel deployment.

---

## Features

- **Interactive Homepage**
  - Arched breed showcase hero with animated center mascot puppy and scalloped/quilted SVG dividers
  - Horizontal-scroll *Meet the Pups* showcase with illustrated wooden door cards
  - Scroll-driven *Puppy Scroll Journey* with spline-interpolated mascot movement, paw-print trail, and sleeping basket finale
  - *Two Ways to Meet Your Puppy*, *Your Puppy Journey*, *Trust Passport*, *Happy Families* polaroid wall, *FAQ Preview*, and *Final CTA*
- **Global Micro-Interactions & Animations**
  - Custom SVG paw cursor with interactive pointer states across all pages
  - Global fading paw-footprint cursor trail (`CursorPawTrail`)
  - Quilted-diamond page transition curtain with walking mascot puppy (`PageTransitionCurtain`)
- **Full Multi-Page Experience**
  - `/` — Homepage
  - `/puppies` — Filterable catalog (origin, breed, gender, search)
  - `/puppies/[slug]` — Individual puppy profile, gallery, and WhatsApp enquiry
  - `/happy-families` — Client stories and polaroid wall
  - `/how-it-works` — Local Dubai showroom & Korean teacup import process
  - `/faq` — Interactive FAQ accordion board
  - `/contact` — Visit & contact inquiry form
  - `/admin` — Admin inquiry management view
- **Vercel-Ready Fallback Data**
  - All 46 default puppy and family images are bundled under `client/public/images/`.
  - When `NEXT_PUBLIC_API_URL` is not configured (such as standalone frontend deployment on Vercel), `client/src/lib/api.ts` automatically falls back to `FALLBACK_PUPPIES`, `FALLBACK_FAMILIES`, and `FALLBACK_FAQS`.

---

## Tech Stack

- **Frontend (`client/`):** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React
- **Typography:** Fraunces (`SOFT` / `WONK` / `opsz` variable display font), Figtree, Shantell Sans
- **Backend (`server/`):** Node.js, Express.js, TypeScript, MongoDB, Mongoose, Zod, Helmet, CORS, Express Rate Limit

---

## Project Structure

```text
.
├── client/
│   ├── public/images/          # Bundled puppy & family photos
│   ├── src/
│   │   ├── app/                # Next.js App Router pages & globals.css
│   │   ├── components/
│   │   │   ├── faq/            # FAQ accordion client component
│   │   │   ├── families/       # Happy families polaroid & gallery components
│   │   │   ├── forms/          # Contact inquiry form
│   │   │   ├── home/           # Homepage sections & PuppyScrollJourney
│   │   │   ├── illustrations/  # Custom SVG mascot & flight/passport art
│   │   │   ├── layout/         # Navbar, Footer, CursorPawTrail, PageTransitionCurtain
│   │   │   └── puppies/        # Catalog, detail view, and illustrated door cards
│   │   └── lib/                # API client, fallbackData, types, WhatsApp helper
│   └── next.config.ts
├── server/
│   └── src/                    # Express API, Mongoose models, seed script
└── README.md
```

---

## Local Development

### 1. Frontend Only (Quick Start)
The frontend works standalone using built-in fallback data:

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 2. Full-Stack Setup (Frontend + Express + MongoDB)

1. Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017` (or configure `MONGODB_URI` in `server/.env`).
2. Start and seed the backend API:

```bash
cd server
npm install
npm run seed
npm run dev
```

The Express API runs at `http://localhost:5000` (health check: `GET /api/health`).

3. Start the frontend:

```bash
cd client
npm install
npm run dev
```

---

## Deploying to Vercel

1. Import the repository into Vercel.
2. Set **Root Directory** to `client` (Framework Preset: **Next.js**).
3. *(Optional)* If you host the Express backend separately, add `NEXT_PUBLIC_API_URL` in Vercel Environment Variables pointing to your deployed API URL (e.g. `https://your-api-domain.com/api`). Otherwise, the site runs directly with the built-in fallback data and bundled images.
4. Deploy — live at [https://teddy-pups-web.vercel.app/](https://teddy-pups-web.vercel.app/).

---

## Scripts

### `client/`
- `npm run dev` — Start Next.js development server
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run lint` — Run Next.js linter

### `server/`
- `npm run dev` — Start Express server with `tsx watch`
- `npm run seed` — Seed MongoDB with initial puppies, families, and FAQs
- `npm run build` — Compile TypeScript to `dist/`
- `npm run start` — Run compiled production server
