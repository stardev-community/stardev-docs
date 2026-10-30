import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { SITE, pages } from "./seo-pages.mjs";

const ROOT = new URL("..", import.meta.url).pathname;

const css = `*{box-sizing:border-box}
body{margin:0;background:#060810;color:#e9eef7;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.65}
a{color:#f5b73d}
.wrap{max-width:800px;margin:0 auto;padding:52px 20px 80px}
.badge{display:inline-block;border:1px solid rgba(245,183,61,.35);background:rgba(245,183,61,.08);color:#f5b73d;border-radius:999px;padding:6px 13px;font-size:12px;letter-spacing:.14em;font-weight:700}
h1{font-size:clamp(28px,6vw,42px);line-height:1.14;letter-spacing:-.03em;margin:20px 0 14px}
h2{font-size:22px;margin:36px 0 8px;letter-spacing:-.02em}
h3{font-size:17px;margin:20px 0 6px}
p,li{color:#a9b8cc;font-size:16px}
.lead{font-size:19px;color:#c6d3e4}
pre{background:#0b1120;border:1px solid #1e293b;border-radius:12px;padding:14px;overflow:auto;font-size:13px;color:#cfe0f5}
code{background:#0d1522;border:1px solid #1e293b;padding:1px 6px;border-radius:6px;font-size:.9em}
.cta{display:flex;gap:10px;flex-wrap:wrap;margin:26px 0}
.btn{display:inline-block;padding:12px 18px;border-radius:12px;font-weight:700;text-decoration:none;font-size:15px}
.p{background:linear-gradient(135deg,#ffe0a3,#f5b73d);color:#1a1205}
.s{border:1px solid #26344a;color:#dbe6f5}
.note{font-size:13px;color:#7f8ea4}
table{width:100%;border-collapse:collapse;margin:14px 0;font-size:14px}
th,td{border:1px solid #1e293b;padding:9px;text-align:left;color:#b9c7da}
th{background:#0d1522;color:#e9eef7}
footer{margin-top:48px;border-top:1px solid #1e293b;padding-top:18px;font-size:13px;color:#7f8ea4}`;

const cta = (lang) =>
  lang === "id"
    ? `<div class="cta">
    <a class="btn p" href="../shop/">Lihat source &amp; harga (Rp 100.000)</a>
    <a class="btn s" href="../shop/demo/?demo=1">Coba demo panel admin</a>
  </div>
  <p class="note">Demo memakai data contoh dan tidak terhubung ke server. Source code, bukan sewa lisensi.</p>`
    : `<div class="cta">
    <a class="btn p" href="../shop/en/">See pricing — $6.50</a>
    <a class="btn s" href="../shop/demo/?demo=1">Try the admin panel</a>
  </div>
  <p class="note">Demo uses sample data and makes no server calls. Source code, not a subscription.</p>`;

const render = (p) => `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${SITE}/${p.slug}/">
<link rel="icon" href="${SITE}/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="StarDev licensing guides" href="${SITE}/feed.xml">
<meta property="og:type" content="article">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${SITE}/shop/og.png">
<meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
</head>
<body>
<main class="wrap">
  <span class="badge">${p.badge}</span>
  <h1>${p.h1}</h1>
  <p class="lead">${p.lead}</p>
  ${p.body.trim()}
  ${cta(p.lang)}
  <footer>StarDev · <a href="../panduan/">${p.lang === "id" ? "semua panduan" : "all guides"}</a> · <a href="../shop/${p.lang === "id" ? "" : "en/"}">store</a></footer>
  <div style="position:fixed;left:0;right:0;bottom:0;z-index:60;background:rgba(8,12,20,.94);border-top:1px solid #1e293b;padding:9px 14px;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;font-size:13px;backdrop-filter:blur(8px)">
    <span style="color:#8fa1b8">Source code · ${p.lang === "id" ? "Rp 100.000" : "$6.50"}</span>
    <a href="../shop/${p.lang === "id" ? "" : "en/"}" style="color:#1a1205;background:linear-gradient(135deg,#ffe0a3,#f5b73d);padding:7px 13px;border-radius:9px;font-weight:700;text-decoration:none">${p.lang === "id" ? "Beli" : "Buy"}</a>
    <a href="../shop/demo/?demo=1" style="color:#dbe6f5;border:1px solid #26344a;padding:7px 13px;border-radius:9px;font-weight:600;text-decoration:none">${p.lang === "id" ? "Demo" : "Demo"}</a>
  </div>
</main>
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: p.h1,
  description: p.desc,
  inLanguage: p.lang,
  author: { "@type": "Organization", name: "StarDev" },
  mainEntityOfPage: `${SITE}/${p.slug}/`
})}</script>
</body>
</html>
`;

for (const p of pages) {
  const dir = join(ROOT, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), render(p));
  console.log("wrote", p.slug);
}

const legacy = [
  { loc: "/", pr: "1.0", cf: "weekly" },
  { loc: "/shop/", pr: "0.9", cf: "weekly" },
  { loc: "/shop/en/", pr: "0.9", cf: "weekly" },
  { loc: "/shop/demo/", pr: "0.6", cf: "monthly" },
  { loc: "/panduan/", pr: "0.7", cf: "monthly" },
  { loc: "/jual-sistem-lisensi/", pr: "0.8", cf: "monthly" },
  { loc: "/key-system-roblox/", pr: "0.8", cf: "monthly" },
  { loc: "/self-hosted-license-system/", pr: "0.8", cf: "monthly" },
  { loc: "/keyauth-alternative/", pr: "0.8", cf: "monthly" },
  { loc: "/design/", pr: "0.5", cf: "monthly" }
];
const urls = [
  ...legacy,
  ...pages.map((p) => ({ loc: `/${p.slug}/`, pr: "0.7", cf: "monthly" }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${SITE}${u.loc}</loc><changefreq>${u.cf}</changefreq><priority>${u.pr}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(ROOT, "sitemap.xml"), sitemap);

const idx = pages.filter((p) => p.lang === "id");
const enx = pages.filter((p) => p.lang === "en");
const card = (p) =>
  `  <a class="card" href="../${p.slug}/"><b>${p.h1}</b><span>${p.lead.slice(0, 150)}</span></a>`;
const hub = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Panduan Sistem Lisensi &amp; Key System — StarDev</title>
<meta name="description" content="Kumpulan panduan sistem lisensi: key system Roblox, APK, API key, HWID, harga source code, dan demo panel admin.">
<link rel="canonical" href="${SITE}/panduan/">
<link rel="icon" href="${SITE}/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:title" content="Panduan sistem lisensi &amp; key system">
<meta property="og:image" content="${SITE}/shop/og.png">
<style>
*{box-sizing:border-box}
body{margin:0;background:#060810;color:#e9eef7;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.65}
a{color:#f5b73d;text-decoration:none}
.wrap{max-width:760px;margin:0 auto;padding:52px 20px 80px}
h1{font-size:clamp(27px,6vw,38px);letter-spacing:-.03em;line-height:1.15;margin:0 0 10px}
p{color:#a9b8cc}
.card{display:block;border:1px solid #1e293b;background:#0b1120;border-radius:14px;padding:16px 18px;margin:12px 0;transition:.15s}
.card:hover{border-color:#3b4b63;background:#0e1626}
.card b{display:block;font-size:16px;color:#e9eef7;margin-bottom:3px}
.card span{font-size:13.5px;color:#8fa1b8}
.lang{font-size:12px;color:#7f8ea4;letter-spacing:.12em;font-weight:700;margin:26px 0 6px;text-transform:uppercase}
footer{margin-top:44px;border-top:1px solid #1e293b;padding-top:18px;font-size:13px;color:#7f8ea4}
</style>
</head>
<body>
<main class="wrap">
  <h1>Panduan sistem lisensi</h1>
  <p>Penjelasan praktis sebelum membeli source code, tanpa klaim berlebihan.</p>

  <div class="lang">Indonesia</div>
  <a class="card" href="../key-system-roblox/"><b>Key system Roblox</b><span>Alur verifikasi, HWID, model biaya, dan lima kesalahan yang bikin sistem bocor.</span></a>
  <a class="card" href="../jual-sistem-lisensi/"><b>Beli source sistem lisensi</b><span>Apa yang didapat, harga, dan bedanya source code dengan sewa lisensi.</span></a>
${idx.map(card).join("\n")}
  <a class="card" href="../shop/demo/?demo=1"><b>Demo panel admin</b><span>Coba langsung dengan data contoh — tanpa server, tanpa daftar.</span></a>

  <div class="lang">English</div>
  <a class="card" href="../self-hosted-license-system/"><b>Self-hosted license system</b><span>Hosted vs self-hosted, apa yang perlu disiapkan, dan siapa yang sebaiknya tetap pakai layanan hosted.</span></a>
  <a class="card" href="../keyauth-alternative/"><b>KeyAuth alternative</b><span>Kapan pindah masuk akal, biaya tersembunyi, dan bentuk kontrak API yang membuat migrasi murah.</span></a>
${enx.map(card).join("\n")}

  <div class="lang">Toko</div>
  <a class="card" href="../shop/"><b>Harga &amp; pembelian (ID)</b><span>Rp 100.000 / Rp 200.000, QRIS, konfirmasi WhatsApp.</span></a>
  <a class="card" href="../shop/en/"><b>Pricing &amp; checkout (EN)</b><span>$6.50 / $12.50, Binance, Telegram.</span></a>

  <footer>StarDev · <a href="../">katalog</a></footer>
</main>
</body>
</html>
`;
writeFileSync(join(ROOT, "panduan/index.html"), hub);

const llms = `# StarDev Licence V4 (KeySystemV4)

> Self-hosted licensing system source code for Roblox scripts, mod APKs, APKs, web apps and bots. Vercel + Upstash Redis API, web admin panel, Android admin app, Telegram buyer bot, Discord admin bot, rebrandable storefront, Roblox Luau client (raw / aes / aes_sign). Source code, one brand per purchase. Not a hosted service.

## Product
- Price (ID/QRIS): Rp 100.000 (1 month updates), Rp 200.000 (lifetime)
- Price (international/Binance): $6.50 (1 month updates), $12.50 (lifetime)
- Currency note: USD amounts derived from Rp 16.200/USD, rounded up to $0.50
- Store (ID): ${SITE}/shop/
- Store (EN): ${SITE}/shop/en/
- Interactive demo (sample data, no server): ${SITE}/shop/demo/
- Contact ID (WhatsApp): https://wa.me/6285299526216
- Contact intl (Telegram): https://t.me/yt_lulu

## Guides
${pages.map((p) => `- [${p.h1}](${SITE}/${p.slug}/): ${p.desc}`).join("\n")}
- [Key system Roblox (ID)](${SITE}/key-system-roblox/)
- [Jual source sistem lisensi (ID)](${SITE}/jual-sistem-lisensi/)
- [Self-hosted license system (EN)](${SITE}/self-hosted-license-system/)
- [KeyAuth alternative (EN)](${SITE}/keyauth-alternative/)
- [All guides](${SITE}/panduan/)

## Facts
- Deliverable is source code; buyer deploys on their own Vercel + Upstash account.
- Includes Ed25519 key pair, AES-256 and HMAC transport modes, HWID device limits, rate limiting, security event log.
- Excludes hosting, bot tokens, domains, custom development.
- No claim of bypassing anti-cheat or platform protections, and no guarantee of sales.
`;
writeFileSync(join(ROOT, "llms.txt"), llms);

const now = new Date().toISOString();
const items = pages
  .map(
    (p) => `  <item>
    <title>${p.h1}</title>
    <link>${SITE}/${p.slug}/</link>
    <guid>${SITE}/${p.slug}/</guid>
    <description>${p.desc}</description>
    <pubDate>${now}</pubDate>
  </item>`
  )
  .join("\n");
writeFileSync(
  join(ROOT, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>StarDev — licensing guides</title>
  <link>${SITE}/panduan/</link>
  <description>Practical guides on license key systems, HWID, and self-hosted licensing.</description>
${items}
</channel></rss>
`
);

console.log("sitemap", urls.length, "urls; hub, llms.txt, feed.xml written");
