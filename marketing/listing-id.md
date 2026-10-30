# Teks jualan — Indonesia

## Judul

1. `Source Code StarDev Licence V4 — Sistem Lisensi untuk Roblox, APK & Web`
2. `KeySystemV4 — Source Code Sistem Key + Panel Admin + Bot`

## Deskripsi singkat

Source code sistem lisensi milik sendiri: API Vercel + Redis, panel admin web,
app admin Android, bot Telegram & Discord. Untuk Roblox script, mod APK, APK
mandiri, web, dan bot.

## Deskripsi panjang

**Berhenti menyewa sistem key orang lain.**

StarDev Licence V4 (KeySystemV4) adalah paket lisensi lengkap yang kamu deploy
sendiri dan kamu miliki. Isinya satu monorepo: API, panel admin web, app admin
Android, bot Telegram untuk pembeli, bot Discord untuk admin, dan storefront
yang bisa di-rebranding.

Satu pembelian = satu stack terpisah. Vercel kamu, Redis kamu, key kamu, brand
kamu. Tidak numpuk rate limit dengan penjual lain.

### Bisa dipakai untuk lisensi apa saja

- Roblox script (klien Luau dengan AES-256 / HMAC / Ed25519)
- Mod APK
- APK mandiri
- Aplikasi web / dashboard
- Bot Discord & Telegram
- Tool desktop / CLI

Selama klien bisa kirim HTTP request, sistem ini bisa dipakai.

### Yang didapat

- `POST /api/verify` — validasi key + HWID, masa aktif, batas perangkat
- `POST /api/admin` — buat / ubah / hapus key
- `/api/hwid` — blokir dan buka blokir HWID
- `/api/security` — laporan tamper / penyalahgunaan
- Panel admin web: statistik, pencarian, editor key, blokir HWID, event keamanan
- App admin Android (build dengan applicationId sendiri)
- Bot Telegram pembeli (redeem, cek key)
- Bot Discord admin: `/addkey /listkeys /editkey /delkey /blockhwid /unblockhwid`
- Storefront (index/katalog/produk/panduan) dari satu `data.js`
- Template klien Roblox + catatan integrasi Android/web
- Panduan deploy (Vercel, Upstash Redis, Ed25519, webhook)

### Keamanan

- Tiga mode: `raw`, `aes` (AES-256-CBC), `aes_sign` (AES + HMAC + Ed25519)
- Anti-replay 300 detik pada mode terenkripsi
- Batas HWID per key, blokir otomatis sementara, blokir manual permanen,
  rate limit 5x/jam per HWID

### Yang perlu disiapkan

- Akun Vercel (free tier cukup)
- Database Upstash Redis (free tier cukup)
- Bisa menempel environment variable
- Opsional: token bot Telegram, aplikasi Discord, Android Studio

### Tidak termasuk

- Hosting, domain, akun Vercel/Upstash
- Token Telegram/Discord atau jasa setup (tersedia sebagai add-on)
- Produk yang dilisensikan — kamu bawa produk sendiri

### Ketentuan

- 1 brand / stack per pembelian
- Bebas dimodifikasi untuk produk sendiri
- Tidak untuk dijual atau dibagikan ulang sebagai source
- Update: 1 bulan atau selamanya sesuai paket

### Harga

| Paket | Harga | Isi |
|---|---|---|
| Starter | **Rp 100.000** | Source + update 1 bulan |
| Lifetime | **Rp 200.000** | Source + update selamanya |

Brand/stack tambahan: tanya admin. Promo 3 pembeli pertama: **Rp 80.000**.

### Pengiriman

Setelah pembayaran (QRIS / Binance): undangan repo privat atau arsip source,
plus panduan deploy. Biasanya beberapa jam; konfirmasi ketersediaan dulu.

### Kontak

WhatsApp: 0852-9952-6216 · Telegram: [@yt_lulu](https://t.me/yt_lulu)
Toko: https://stardev-community.github.io/stardev-docs/shop/

## Posting grup FB / Telegram (pendek)

```
Jual SOURCE CODE sistem lisensi (bukan lisensi pemakaian).

• API Vercel + Redis: /verify /admin /hwid /security
• Panel admin web + app admin Android
• Bot Telegram pembeli + bot Discord admin
• Cocok untuk Roblox script, mod APK, APK mandiri, web, bot
• AES-256 / HMAC / Ed25519, batas HWID, anti-replay

Rp 100.000 (update 1 bulan) · Rp 200.000 lifetime · 1 brand
QRIS / Binance. Screenshot panel: <link>
```
