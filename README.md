# StarDev Docs

Dokumentasi dan katalog untuk seluruh proyek StarDev Community — aplikasi,
server, video, bot, dan tooling.

- **Katalog (live):** https://stardev-community.github.io/stardev-docs/
- **Dokumentasi per proyek:** [`docs/`](docs/README.md)
- **Toko:** https://stardev-community.github.io/stardev-docs/shop/
- **Design system (StarUI):** https://stardev-community.github.io/stardev-docs/design/
- **Data mentah:** [`catalog.json`](catalog.json)

## Isi repo

| Path | Isi |
|---|---|
| `index.html` | Katalog satu halaman (HTML mandiri, tanpa CDN, tanpa build step) |
| `docs/` | 52 halaman dokumentasi per proyek + indeks per bidang |
| `data/projects.json` | Data proyek (sumber untuk generator) |
| `catalog.json` | Data proyek lengkap termasuk slug untuk API/pemakaian lain |
| `shop/` | Halaman jualan StarDev All (QRIS manual + order WhatsApp) |
| `design/` | StarUI: `tokens.json`, galeri referensi, `build.mjs` |
| `tools/gen-docs.mjs` | Generator `docs/` + `data/projects.json` dari katalog |

## Cakupan

52 proyek di 8 bidang:

| Bidang | Jumlah |
|---|---|
| StarDev Community (termasuk jajaran produk Lulu) | 22 |
| Android | 13 |
| Web | 1 |
| Video | 8 |
| AI & Bot | 3 |
| Roblox | 1 |
| Tooling | 2 |
| Akademik | 2 |

Data disusun dari pemindaian lokal Termux dan `/sdcard` per 30 Oktober 2026.
Ukuran dari `du`, jumlah berkas dan tanggal dari filesystem.

## Memperbarui

1. Ubah entri di array `DATA` pada `index.html`.
2. `node tools/gen-docs.mjs` — memperbarui `docs/`, `data/projects.json`,
   dan `catalog.json`.
3. `node design/build.mjs` — menyuntik token StarUI ke halaman.
4. Commit dan push; GitHub Pages memperbarui otomatis.

## Catatan

- Toko menjual **source code StarDev Licence** (`g3xstardev-licence`), bukan
  lisensi pemakaian aplikasi.
- Harga: source + update 1 bulan **Rp 100.000**, source + update lifetime
  **Rp 200.000** (1 brand/stack). QRIS atas nama **Service Lulu**
  (NMID `ID1026542074640`).
- Proyek pihak ketiga (tool PUBG/Frida, data executor Delta) tidak
  didokumentasikan di sini.
