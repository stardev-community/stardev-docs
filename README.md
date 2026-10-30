# StarDev Project Catalog

Katalog satu halaman untuk seluruh proyek StarDev, Lulu, dan proyek pendukung
yang ada di penyimpanan Termux dan `/sdcard`.

- **Live:** https://stardev-community.github.io/stardev-docs/
- **Sumber tunggal:** [`index.html`](index.html) — HTML mandiri, tanpa build step,
  tanpa CDN, tanpa dependensi. Buka langsung dari file manager juga jalan.
- **Data:** array `DATA` di dalam `index.html` (49 entri), dikelompokkan per
  kategori: StarDev, Android, Lulu, Web, Video, AI & Bot, Roblox, Tooling,
  Akademik.

## Fitur

- Pencarian nama, deskripsi, teknologi, dan path (pintasan `/`).
- Filter kategori, urutkan berdasarkan nama / tanggal / ukuran / kategori.
- Tombol salin path, badge status (`aktif`, `arsip`, `duplikat`, `data`).
- Ringkasan statistik (jumlah proyek, aktif, kategori, total ukuran).
- Responsif untuk HP dan desktop, menghormati `prefers-reduced-motion`.

## Menambah atau memperbarui proyek

1. Buka `index.html`, cari `const DATA = [`.
2. Tambahkan objek:

   ```js
   {name:"Nama Proyek", cat:"android", type:"Android · Gradle", status:"aktif",
    date:"2026-10-30", mb:2, files:100,
    desc:"Deskripsi singkat.",
    path:"~/proyek/NamaProyek", repo:"https://github.com/..."}
   ```

3. `cat` harus salah satu dari: `stardev`, `android`, `lulu`, `web`, `video`,
   `ai`, `roblox`, `tool`, `akademik`.
4. Commit dan push; GitHub Pages memperbarui otomatis.

## Catatan verifikasi

Data dikumpulkan dengan pemindaian berkas lokal pada 30 Oktober 2026
(ukuran dari `du`, jumlah berkas dan tanggal modifikasi dari filesystem).
Ketersediaan dan isi proyek dapat berubah; jalankan ulang pemindaian sebelum
menambah entri baru.
