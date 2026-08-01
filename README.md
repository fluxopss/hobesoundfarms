# Hobe Sound Farms

Full-scale Flux Labs pitch site for [Hobe Sound Farms](https://hobesoundfarms.com/) — cinematic visit experience with GHL lead capture and Square ticket checkout.

## Stack

Next.js 16 · TypeScript · Tailwind CSS 4 · pnpm · PM2 port **3010**

## Local

```powershell
cd C:\Users\jonat\Projects\clients\hobesoundfarms
pnpm install
pnpm dev
```

Copy `.env.example` → `.env.local` and set `GHL_WEBHOOK_URL` / Square sandbox keys when ready.

## Deploy

Push `main` to `fluxopss/hobesoundfarms`. PM2 app name `hobesoundfarms` on port 3010.

---

Crafted by [Flux Labs](https://fluxlab.agency)
