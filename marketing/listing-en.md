# Listing copy — English

## Title options (pick per platform)

1. `StarDev Licence V4 — Self-Hosted Licensing System for Roblox, APKs & Apps`
2. `KeySystemV4 Source Code — Licensing Backend + Admin Panel + Bots`
3. `License Key System Source Code (Vercel + Redis) — Any App, Any Platform`

Short title (Gumroad/Payhip, max ~60 chars):
`KeySystemV4 — Licensing System Source Code`

## Short description (≤160 chars)

Self-hosted licensing system source code: Vercel + Redis API, web admin panel, Android admin app, Telegram & Discord bots. For Roblox, APKs, web.

## Long description

**Stop renting someone else's key system.**

StarDev Licence V4 (KeySystemV4) is a complete, self-hosted licensing stack you
deploy once and own. It ships as a monorepo: the API, the admin panel, an Android
admin app, a buyer-facing Telegram bot, an admin Discord bot, and a rebrandable
storefront.

One purchase = one isolated stack. Your Vercel project, your Redis, your keys,
your brand. No shared multi-tenant server, no rate-limit collisions with other
sellers.

### What you can license with it

- Roblox scripts (Luau client with AES-256 / HMAC / Ed25519 support)
- Mod APKs
- Standalone Android APKs
- Web apps and dashboards
- Discord / Telegram bots
- Desktop tools and CLIs

Anything that can send an HTTP request can be gated by this system.

### What's included

- `POST /api/verify` — key + HWID validation, expiry, device limits
- `POST /api/admin` — create / edit / delete keys
- `/api/hwid` — block and unblock hardware IDs
- `/api/security` — tamper and abuse reports
- Web admin panel: totals, search, key editor, HWID blocking, security events
- Android admin app (build it with your own applicationId)
- Telegram bot for buyers (redeem, check key)
- Discord admin bot: `/addkey /listkeys /editkey /delkey /blockhwid /unblockhwid`
- Storefront pages driven by a single `data.js`
- Client templates for Roblox + integration notes for Android/web
- Deployment guide (Vercel, Upstash Redis, Ed25519 keys, webhooks)

### Security model

- Three protocol modes: `raw`, `aes` (AES-256-CBC), `aes_sign` (AES + HMAC +
  Ed25519 signed responses)
- Anti-replay timestamp window (300s) in encrypted modes
- HWID limits per key, automatic temporary blocks after repeated failures,
  permanent manual blocks, rate limiting (5 checks/hour per HWID)

### What you need

- A Vercel account (free tier works to start)
- An Upstash Redis database (free tier works)
- Basic ability to paste environment variables
- Optional: Telegram bot token, Discord application, Android Studio for the app

### Not included

- Hosting, domain, Vercel/Upstash accounts and their limits
- Telegram/Discord tokens or server setup done for you (available as an add-on)
- Any game, cheat, or app that uses the license — you bring your own product

### License terms

- 1 brand / stack per purchase
- Modify it freely for your own product
- Do not resell or redistribute the source
- Updates: 1 month or lifetime depending on the plan

### Pricing

| Plan | Price | Includes |
|---|---|---|
| Starter | **$6.50** | Source + 1 month of updates |
| Lifetime | **$12.50** | Source + lifetime updates |

Extra brand/stack: ask for a quote. Launch offer for the first three buyers:
**$5.00** on the Starter plan.

### Delivery

After payment (Binance Pay or USDT): private repo invite or a source archive,
plus the deployment guide. Typical delivery within a few hours; message first to
confirm availability.

### Contact

Telegram: [@yt_lulu](https://t.me/yt_lulu)

---

## Marketplace-specific variants

### SellMyCode / code marketplaces

Use the long description above. Set license type to **Regular** (single end
product) — do not offer Extended resale rights. Attach `og.png` and the admin
panel screenshot.

### Discord promo post (short)

```
Self-hosted licensing system — source code, not a subscription.

• Vercel + Redis API (/verify, /admin, /hwid, /security)
• Web admin panel + Android admin app
• Telegram buyer bot + Discord admin bot
• Works for Roblox scripts, mod APKs, standalone APKs, web apps, bots
• AES-256 / HMAC / Ed25519, HWID limits, anti-replay

$6.50 (1 month updates) · $12.50 lifetime · 1 brand per license
Pay with Binance. Details + demo screenshot: <link>
```

### Fiverr gig

Title: `I will build a self-hosted license key system for your app or script`

Packages:
- Basic $35 — deploy + 1 client integration
- Standard $70 — deploy + Roblox + Android integration
- Premium $120 — everything + custom branding + 30 days support

Description: reuse "What's included" and "What you need". Fiverr buyers want the
work done, not the repo — the source is your delivery artifact.

### Cold DM (one-liner)

```
Hey — you run <product>. I sell the source of a licensing backend (Vercel +
Redis, admin panel, HWID, Telegram/Discord bots) that people use for exactly
that. $6.50 trial / $12.50 lifetime, 1 brand. Want the demo link?
```
