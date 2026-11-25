# TeddyPups U.A.E. — Full-Stack Clone

Responsive full-stack clone of **TeddyPups U.A.E.** built with **Next.js (React + TypeScript + Tailwind CSS)**, **Node.js + Express.js**, and **MongoDB (Mongoose)**.

## Project Structure

- `client/` — Next.js App Router frontend (`/`, `/puppies`, `/puppies/[slug]`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, `/admin`)
- `server/` — Express REST API + Mongoose models + Zod validation + MongoDB seed script

## Quick Start

### 1. Start MongoDB
Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017` (or set `MONGODB_URI` in `server/.env`).

### 2. Backend Setup & Seed
```bash
cd server
npm install
npm run seed
npm run dev
```
The Express API runs at `http://localhost:5000` (health check: `GET /api/health`).

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:3000`.

