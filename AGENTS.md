# Premium Site — Agent Guide

Next.js client website template for Flux Ops / Flux Hub. **Read skill `flux-premium-site-template` or `flux-hub-workstation` for full infra context.**

## Quick facts

- **Repo**: fluxopss/premium-site
- **Preview**: http://2.25.206.39:3001
- **Stack**: Next.js 16, TypeScript, Tailwind 4, pnpm
- **Deploy**: GitHub Actions → VPS PM2 (port 3001) → Caddy SSL

## Integrations

- Leads → `GHL_WEBHOOK_URL` via `src/lib/ghl.ts`
- Payments → Square via `src/lib/square.ts`
- Secrets in `.env.local` only (see `.env.example`)

## Common tasks

| Task | Command / file |
|------|----------------|
| Local dev | `pnpm dev` |
| Build | `pnpm build` |
| Edit landing | `src/app/page.tsx` |
| Edit contact form | `src/components/contact-form.tsx` |
| PM2 config | `ecosystem.config.cjs` |
| CI deploy | `.github/workflows/deploy.yml` |
| Caddy domain | `deploy/vps-bootstrap.sh` |

## Clone for client

Copy to `C:\Users\jonat\Projects\clients\<name>`, re-init git, create `fluxopss/<name>` repo, set env vars, deploy.

See [README.md](README.md) for client handoff checklist.
