export const SITE = "https://stardev-community.github.io/stardev-docs";

export const pages = [
  {
    slug: "sistem-lisensi-apk",
    lang: "id",
    badge: "PANDUAN · APK",
    title: "Sistem Lisensi APK: Verifikasi Key + HWID Tanpa Server Sendiri",
    desc: "Cara kerja lisensi untuk mod APK dan APK mandiri: HWID dari ANDROID_ID, cache offline, fail-closed, dan contoh panggilan HTTP. Plus opsi source code siap deploy.",
    h1: "Sistem lisensi untuk APK dan mod APK",
    lead: "APK tidak punya server sendiri, jadi verifikasi harus keluar ke satu endpoint HTTPS. Yang menentukan kualitas sistemnya bukan API-nya, tapi bagaimana aplikasi bersikap saat jaringan mati atau HWID berubah.",
    body: `
<h2>HWID yang stabil di Android</h2>
<p>Kombinasi paling aman: <code>Settings.Secure.ANDROID_ID</code> + nama model + paket aplikasi, lalu di-hash. Jangan pakai IMEI (butuh izin dan diblokir di Android 10+), dan jangan pakai nilai yang berubah setiap instal ulang.</p>
<pre>val raw = Secure.getString(contentResolver, Secure.ANDROID_ID) +
          Build.MANUFACTURER + Build.MODEL + packageName
val hwid = MessageDigest.getInstance("SHA-256")
    .digest(raw.toByteArray()).joinToString("") { "%02x".format(it) }</pre>

<h2>Kontrak endpoint</h2>
<p>Satu request, satu jawaban JSON. Simpan hanya field yang benar-benar dipakai aplikasi: <code>valid</code>, <code>expiresAt</code>, dan pesan error.</p>
<pre>POST /api/verify
{"key":"XXXX-XXXX","hwid":"a1b2...","app":"my-mod"}

200 {"valid":true,"expiresAt":1767225600,"plan":"user"}
200 {"valid":false,"message":"HWID limit reached (1/1)"}</pre>

<h2>Tiga keputusan yang sering salah</h2>
<table>
<tr><th>Keputusan</th><th>Salah</th><th>Benar</th></tr>
<tr><td>Saat offline</td><td>Langsung buka akses</td><td>Beri grace period singkat dari cache, lalu tutup</td></tr>
<tr><td>Menyimpan key</td><td>Plaintext di SharedPreferences</td><td>Simpan token sesi, bukan key mentah</td></tr>
<tr><td>HWID berubah</td><td>Otomatis reset</td><td>Batas 1–2 reset, sisanya manual oleh admin</td></tr>
</table>

<h2>Kapan butuh sistem sendiri</h2>
<p>Kalau kamu menjual banyak key dan sering menangani permintaan reset perangkat, panel admin sendiri menghemat waktu. Kalau hanya beberapa pembeli, layanan hosted sudah cukup.</p>
<p>StarDev Licence V4 menyertakan endpoint verifikasi, panel admin web, app admin Android, bot Telegram pembeli, dan bot Discord admin — sebagai source code yang kamu deploy di Vercel + Upstash.</p>`
  },
  {
    slug: "jasa-key-system",
    lang: "id",
    badge: "JASA · KEY SYSTEM",
    title: "Jasa Pembuatan Key System: Pemasangan, Integrasi, dan Batasnya",
    desc: "Jasa pasang sistem lisensi: deploy backend, integrasi ke script/APK/bot, uji verifikasi, dan serah terima. Ruang lingkup, estimasi waktu, dan hal yang tidak dikerjakan.",
    h1: "Jasa pembuatan key system — apa yang dikerjakan",
    lead: "Banyak orang tidak butuh jasa menulis sistem lisensi dari nol; mereka butuh sistem yang sudah terbukti dipasang dan dihubungkan ke produk mereka dalam hitungan hari, bukan bulan.",
    body: `
<h2>Ruang lingkup yang jelas</h2>
<ol>
<li><strong>Deploy</strong> — proyek, database Redis, pasangan kunci, variabel lingkungan.</li>
<li><strong>Integrasi</strong> — satu titik masuk di produkmu: script Luau, APK, web, atau bot.</li>
<li><strong>Uji</strong> — key valid, key kedaluwarsa, HWID salah, dan percobaan berulang.</li>
<li><strong>Serah terima</strong> — akses akun, dokumen singkat, dan cara membuat key pertama.</li>
</ol>

<h2>Yang tidak termasuk</h2>
<ul>
<li>Biaya hosting, domain, dan token bot (akun pembeli).</li>
<li>Fitur di luar daftar, misalnya dashboard baru atau integrasi pembayaran otomatis.</li>
<li>Membantu melewati proteksi platform lain — di luar cakupan.</li>
</ul>

<h2>Estimasi</h2>
<table>
<tr><th>Pekerjaan</th><th>Waktu</th></tr>
<tr><td>Deploy + key pertama jalan</td><td>1 hari</td></tr>
<tr><td>Integrasi satu produk</td><td>1–2 hari</td></tr>
<tr><td>Bot Telegram/Discord</td><td>+1 hari</td></tr>
</table>

<h2>Alternatif tanpa jasa</h2>
<p>Kalau kamu nyaman dengan Vercel dan Redis, source code StarDev Licence V4 sudah cukup: ada panduan deploy dan contoh integrasi. Jasa hanya untuk yang ingin langsung jalan tanpa membaca.</p>`
  },
  {
    slug: "alternatif-keyauth",
    lang: "id",
    badge: "PERBANDINGAN",
    title: "Alternatif KeyAuth untuk Produk Kecil dan Menengah",
    desc: "Kapan layanan key hosted masih masuk akal, kapan pindah ke sistem sendiri lebih murah, dan apa yang harus disiapkan sebelum migrasi.",
    h1: "Alternatif KeyAuth: kapan pindah, kapan tetap",
    lead: "KeyAuth bukan pilihan buruk. Masalahnya baru muncul ketika kuota, harga, atau kebutuhan kustom mulai bertabrakan dengan paket yang kamu bayar.",
    body: `
<h2>Tetap hosted kalau…</h2>
<ul>
<li>Produkmu satu dan kecil, dan kamu tidak ingin mengurus infrastruktur.</li>
<li>Kebutuhanmu sudah tercakup dashboard.</li>
<li>Kamu lebih suka biaya bulanan yang kecil daripada pekerjaan deploy.</li>
</ul>

<h2>Pindah kalau…</h2>
<ul>
<li>Reset HWID pelanggan menumpuk dan harus antre ke vendor.</li>
<li>Butuh aturan kedaluwarsa atau metadata yang tidak tersedia di dashboard.</li>
<li>Total biaya setahun lebih besar daripada sekali beli source.</li>
<li>Pembeli bertanya di mana data key mereka disimpan.</li>
</ul>

<h2>Yang membuat migrasi murah</h2>
<p>Jaga bentuk respons API tetap sama. Kalau klien hanya membaca <code>valid</code> dan <code>expiresAt</code>, pindah backend tidak menyentuh kode produk.</p>
<pre>POST /api/verify
{"key":"XXXX","hwid":"ab12...","app":"my-app"}

200 {"valid":true,"expiresAt":1767225600}</pre>
<p>Sebaliknya, kalau logika verifikasi tersebar di banyak tempat, migrasi jadi proyek besar. Itu alasan teknis, bukan alasan pemasaran.</p>

<h2>Yang perlu disiapkan</h2>
<ul>
<li>Ekspor key dan riwayat HWID dari sistem lama.</li>
<li>Akun Vercel + database Redis.</li>
<li>Rencana rollback: dua endpoint aktif berdampingan selama sepekan.</li>
</ul>`
  },
  {
    slug: "license-system-for-roblox",
    lang: "en",
    badge: "GUIDE · ROBLOX",
    title: "License System for Roblox Scripts Without a Monthly Vendor",
    desc: "How key + HWID verification works for Roblox scripts, what Roblox allows over HTTP, and how to run the licensing backend yourself.",
    h1: "License system for Roblox scripts",
    lead: "A Roblox script cannot keep a secret. So the check cannot live in the script — it has to live on a server you control, and the script only gets a yes or no.",
    body: `
<h2>Where the check belongs</h2>
<p>Roblox allows <code>HttpService</code> requests from server scripts only, to hosts you permit. That is the right place for verification: a server script asks your API, then hands the result to the rest of the system. A LocalScript cannot be trusted with a key or a secret.</p>
<pre>local res = HttpService:RequestAsync({
    Url = "https://your-app.vercel.app/api/verify",
    Method = "POST",
    Headers = { ["Content-Type"] = "application/json" },
    Body = HttpService:JSONEncode({ key = key, hwid = hwid, app = "my-script" })
})
local ok = res.Success and HttpService:JSONDecode(res.Body).valid</pre>

<h2>What "HWID" means in Roblox</h2>
<p>There is no hardware id. Use a stable per-player value tied to the place and a server-side record — for example the player's <code>UserId</code> plus a value stored in your own database. Treat it as a slot counter, not a fingerprint: the goal is limiting sharing, not identifying a device.</p>

<h2>Failure modes worth designing for</h2>
<table>
<tr><th>Situation</th><th>Bad behaviour</th><th>Better</th></tr>
<tr><td>API unreachable</td><td>Script runs anyway</td><td>Fail closed, with a short cached grace window</td></tr>
<tr><td>Key shared</td><td>Unlimited players</td><td>Slot limit + rate limit per key</td></tr>
<tr><td>Key leaked publicly</td><td>Nothing you can do</td><td>Revoke, block slots, log the attempt</td></tr>
</table>

<h2>Running it yourself</h2>
<p>StarDev Licence V4 ships the verify endpoint, admin panel, Android admin app, Telegram buyer bot, Discord admin bot, and a Luau client in raw, AES, or AES+HMAC mode, with a self-test that checks the Lua crypto against the server.</p>`
  },
  {
    slug: "apk-license-system",
    lang: "en",
    badge: "GUIDE · ANDROID",
    title: "APK License System: Key + HWID Checks That Survive Offline Use",
    desc: "How to license a mod APK or standalone Android app: stable HWID, offline grace period, fail-closed defaults, and an endpoint contract that stays simple.",
    h1: "APK license system that survives real users",
    lead: "Mobile licensing fails in the boring cases: no signal on a train, a reinstall, a cheap device with a reset ID. Design for those three and the rest is bookkeeping.",
    body: `
<h2>A HWID that does not change weekly</h2>
<p>Hash a combination of <code>ANDROID_ID</code>, manufacturer, model, and package name. Avoid IMEI — restricted since Android 10 — and avoid values regenerated per install.</p>
<pre>String raw = Settings.Secure.getString(cr, Settings.Secure.ANDROID_ID)
           + Build.MANUFACTURER + Build.MODEL + getPackageName();
String hwid = sha256(raw);</pre>

<h2>Offline behaviour</h2>
<p>Never let "no network" mean "full access forever". Cache the last successful response with its expiry, allow a bounded grace window (hours, not weeks), then close.</p>

<h2>Endpoint contract</h2>
<pre>POST /api/verify
{"key":"XXXX-XXXX","hwid":"a1b2...","app":"my-app"}

200 {"valid":true,"expiresAt":1767225600,"plan":"user"}
200 {"valid":false,"message":"Key expired"}</pre>
<p>Two fields are enough for the client. Everything else — plans, notes, device history — stays server-side.</p>

<h2>Reset policy</h2>
<p>Give each key one or two self-service resets, then require admin approval. Unlimited resets turn a device limit into decoration.</p>

<h2>Build vs buy</h2>
<p>If you already have Vercel and Redis, a self-hosted source is a weekend. If not, a hosted service will be cheaper than your time. StarDev Licence V4 is the source-code option: verify API, admin panel, Android admin app, Telegram and Discord bots.</p>`
  },
  {
    slug: "license-key-api",
    lang: "en",
    badge: "REFERENCE",
    title: "License Key API: A Minimal Contract That Scales",
    desc: "Design a license key API that stays stable: verify, admin, and HWID endpoints, error shapes, rate limits, and idempotent key creation.",
    h1: "Designing a license key API that does not need rewrites",
    lead: "Most licensing rewrites happen because the API leaked implementation details too early. Four endpoints and three rules avoid that.",
    body: `
<h2>The four endpoints</h2>
<table>
<tr><th>Endpoint</th><th>Purpose</th><th>Auth</th></tr>
<tr><td><code>POST /api/verify</code></td><td>Validate key + HWID, return expiry</td><td>App secret</td></tr>
<tr><td><code>/api/admin</code></td><td>Create, edit, delete keys</td><td>Admin secret</td></tr>
<tr><td><code>/api/hwid</code></td><td>Block or unblock device ids</td><td>Admin secret</td></tr>
<tr><td><code>/api/security</code></td><td>Read failure events</td><td>Admin secret</td></tr>
</table>

<h2>Three rules</h2>
<ol>
<li><strong>Verify is read-mostly.</strong> It may register a HWID slot, but it must not silently extend expiry.</li>
<li><strong>Errors are data, not HTTP codes.</strong> Return <code>200</code> with <code>valid:false</code> and a machine-readable <code>code</code>; reserve 4xx/5xx for transport and auth.</li>
<li><strong>Creation is idempotent.</strong> Accept a client-generated request id so a retried POST does not mint duplicate keys.</li>
</ol>

<h2>Idempotent creation</h2>
<pre>POST /api/admin
{"op":"create","count":10,"days":30,"requestId":"7f3c..."}
→ {"created":["K1","K2"],"requestId":"7f3c..."}
→ retry with same requestId returns the same list</pre>

<h2>Rate limits that do not punish buyers</h2>
<p>Limit per HWID and per key, not per IP: mobile carriers share IPs, and shared NAT would lock out legitimate users. Five attempts per hour is generous for a real client.</p>

<h2>Implementation</h2>
<p>StarDev Licence V4 implements exactly this contract on Vercel + Upstash Redis, with AES/HMAC transport options and an Ed25519 key pair for envelope signing.</p>`
  },
  {
    slug: "hwid-licensing",
    lang: "en",
    badge: "EXPLAINER",
    title: "HWID Licensing: Limits, Resets, and the Privacy Trade",
    desc: "What a HWID check can and cannot do, how many devices to allow, when to auto-reset, and how to store device identifiers without collecting more than needed.",
    h1: "HWID licensing, without the fantasy",
    lead: "A HWID check stops casual sharing. It does not stop a determined attacker, and it should never be treated as proof of identity.",
    body: `
<h2>What it actually buys you</h2>
<ul>
<li>One key, N devices — the most common commercial rule.</li>
<li>Visible history: which devices used a key and when.</li>
<li>A reason to revoke a key that is being passed around.</li>
</ul>
<p>What it does not buy: protection against someone patching your client, or against a leaked key used on one device at a time.</p>

<h2>How many devices</h2>
<table>
<tr><th>Product</th><th>Reasonable default</th></tr>
<tr><td>Roblox script</td><td>1–2 slots</td></tr>
<tr><td>Mobile app</td><td>2 slots (phone + tablet)</td></tr>
<tr><td>Desktop tool</td><td>1–2 slots</td></tr>
<tr><td>Reseller stock</td><td>1 slot until first activation</td></tr>
</table>

<h2>Reset policy</h2>
<p>Self-service reset once per 30 days, second reset on request, third and beyond manual. Log every reset with the old and new identifier — that log is what lets you spot a key being resold.</p>

<h2>Privacy</h2>
<p>Store a salted hash, not the raw identifier, and delete device history when a key is deleted. You need to recognise a returning device, not to know who owns it.</p>

<h2>Where this is implemented</h2>
<p>StarDev Licence V4 keeps HWID slots, blocks, and security events in one Redis store, with admin actions from the web panel or the Android app. Source code, one brand per purchase.</p>`
  }

  ,
  {
    slug: "harga-key-system",
    lang: "id",
    badge: "HARGA",
    title: "Harga Key System 2026: Hosted Bulanan vs Source Sekali Bayar",
    desc: "Rincian biaya key system: layanan hosted, biaya infrastruktur Vercel/Upstash, dan source code sekali bayar. Hitungan untuk 10 dan 100 pembeli.",
    h1: "Berapa harga key system sebenarnya",
    lead: "Harga yang terlihat biasanya hanya langganan. Biaya sebenarnya muncul dari jumlah pembeli, reset HWID manual, dan waktu yang habis untuk urusan admin.",
    body: `
<h2>Tiga komponen biaya</h2>
<table>
<tr><th>Komponen</th><th>Hosted</th><th>Source sendiri</th></tr>
<tr><td>Lisensi perangkat lunak</td><td>Bulanan/tahunan</td><td>Sekali (Rp 100.000 / Rp 200.000)</td></tr>
<tr><td>Infrastruktur</td><td>Termasuk</td><td>Vercel + Upstash, ada kuota gratis</td></tr>
<tr><td>Waktu admin</td><td>Antre ke vendor</td><td>Kamu tangani sendiri</td></tr>
</table>

<h2>Hitungan kasar</h2>
<p>Kalau produkmu menjual 10 key seharga Rp 15.000, pendapatan Rp 150.000. Langganan hosted setahun bisa lebih besar dari itu. Dengan source sekali bayar Rp 100.000, titik impas tercapai di penjualan pertama bila kamu tidak menghitung waktumu.</p>

<h2>Biaya yang sering dilupakan</h2>
<ul>
<li>Domain (opsional, Rp 150.000–200.000/tahun).</li>
<li>Token bot Telegram/Discord: gratis.</li>
<li>Waktu integrasi: 1–3 hari untuk pertama kali.</li>
<li>Backup database: gratis di kuota kecil, tapi harus dijadwalkan.</li>
</ul>

<h2>Kapan langganan tetap lebih murah</h2>
<p>Kalau kamu hanya butuh key untuk satu produk kecil dan tidak mau menyentuh server, biaya bulanan yang kecil masih lebih murah daripada waktu belajarmu. Itu keputusan yang jujur, bukan kegagalan.</p>`
  },
  {
    slug: "cara-jual-script-roblox",
    lang: "id",
    badge: "PANDUAN · JUALAN",
    title: "Cara Jual Script Roblox Tanpa Kehilangan File ke Pembeli",
    desc: "Alur menjual script Roblox: harga, pengiriman, loader, key system, dan penanganan pembeli yang minta refund atau membagikan ulang.",
    h1: "Cara jual script Roblox dengan aman",
    lead: "Menjual script bukan soal menulis kode, tapi soal pengiriman: bagaimana pembeli bisa memakai tanpa memiliki file sumbernya, dan bagaimana kamu tahu siapa yang membocorkan.",
    body: `
<h2>Empat model pengiriman</h2>
<table>
<tr><th>Model</th><th>Kelebihan</th><th>Kekurangan</th></tr>
<tr><td>File langsung</td><td>Simpel</td><td>Bisa disebar ulang dalam hitungan menit</td></tr>
<tr><td>Loader + key</td><td>Kontrol akses</td><td>Loader tetap bisa dianalisis</td></tr>
<tr><td>Script di-host, dijalankan per sesi</td><td>Tidak ada file</td><td>Bergantung uptime</td></tr>
<tr><td>Key system + HWID</td><td>Batasi perangkat, bisa cabut</td><td>Butuh backend</td></tr>
</table>

<h2>Alur minimum yang layak</h2>
<ol>
<li>Tentukan harga dan masa aktif (7/30 hari/lifetime).</li>
<li>Buat stok key, kirim setelah pembayaran terkonfirmasi.</li>
<li>Script memverifikasi key + slot perangkat sebelum berjalan.</li>
<li>Catat percobaan gagal; blokir yang mencurigakan.</li>
</ol>

<h2>Menangani permintaan yang bikin rugi</h2>
<p>Refund setelah key dipakai adalah permintaan paling umum. Solusi paling murah: nyatakan kebijakan sebelum bayar, dan sediakan satu reset perangkat gratis supaya pembeli tidak langsung minta uang kembali.</p>

<h2>Jangan mengklaim yang tidak benar</h2>
<p>Sistem lisensi tidak membuat script "anti-bocor" atau "anti-ban". Yang bisa dijanjikan: pembatasan perangkat, pencabutan key, dan catatan penggunaan.</p>`
  },
  {
    slug: "lisensi-aplikasi-android",
    lang: "id",
    badge: "PANDUAN · ANDROID",
    title: "Lisensi Aplikasi Android: Pilihan untuk Developer Indie",
    desc: "Opsi lisensi untuk aplikasi Android: Play Billing, lisensi sendiri dengan key + HWID, atau layanan pihak ketiga. Plus hal yang harus dihindari.",
    h1: "Lisensi aplikasi Android untuk developer indie",
    lead: "Kalau aplikasimu dijual di luar Play Store — mod, tools, atau APK langsung — kamu tidak punya pembayaran bawaan. Di situ lisensi buatan sendiri masuk.",
    body: `
<h2>Empat jalur</h2>
<table>
<tr><th>Jalur</th><th>Cocok untuk</th><th>Catatan</th></tr>
<tr><td>Play Billing</td><td>Aplikasi di Play Store</td><td>Paling patuh, tapi potongan platform</td></tr>
<tr><td>Key manual (tanpa server)</td><td>Beberapa pembeli</td><td>Cepat, tapi tidak bisa dicabut</td></tr>
<tr><td>Key + HWID dengan backend sendiri</td><td>Penjualan berulang</td><td>Kontrol penuh, perlu deploy</td></tr>
<tr><td>Layanan lisensi pihak ketiga</td><td>Ingin cepat</td><td>Biaya berulang, data di vendor</td></tr>
</table>

<h2>Yang wajib ada di klien</h2>
<ul>
<li>Grace period offline yang terbatas, bukan akses penuh.</li>
<li>Penyimpanan token, bukan key mentah.</li>
<li>Pesan error yang jelas: kedaluwarsa, salah perangkat, atau server down.</li>
<li>Versi aplikasi dikirim saat verifikasi agar kamu bisa memaksa update.</li>
</ul>

<h2>Distribusi APK</h2>
<p>Setiap APK bisa dibongkar; yang tidak bisa dibongkar adalah validasi di server. Karena itu jangan menaruh rahasia di APK, dan jangan mengandalkan obfuscation sebagai satu-satunya perlindungan.</p>

<h2>Kapan pakai source siap pakai</h2>
<p>Kalau kamu butuh panel admin, pembatasan perangkat, bot pembeli, dan pencatatan percobaan gagal tanpa menulis backend dari nol, source code lebih cepat daripada membangun sendiri.</p>`
  },
  {
    slug: "sell-roblox-scripts",
    lang: "en",
    badge: "GUIDE · SELLING",
    title: "How to Sell Roblox Scripts Without Handing Over the File",
    desc: "Delivery models for selling Roblox scripts, what a key system actually protects, refund policy that survives abuse, and how to set device limits.",
    h1: "Selling Roblox scripts without losing the file",
    lead: "The hard part of selling a script is delivery: the buyer needs it to run, and you need to be able to cut access off. A key check is the cheapest way to get both.",
    body: `
<h2>Delivery models</h2>
<table>
<tr><th>Model</th><th>Pros</th><th>Cons</th></tr>
<tr><td>Send the file</td><td>Simple</td><td>Redistributed in minutes</td></tr>
<tr><td>Loader + key</td><td>Access control</td><td>Loader can still be analysed</td></tr>
<tr><td>Hosted script, per-session</td><td>No file at all</td><td>Depends on uptime</td></tr>
<tr><td>Key + HWID backend</td><td>Device limits, revocation</td><td>You run a backend</td></tr>
</table>

<h2>A minimum viable flow</h2>
<ol>
<li>Pick price and duration (7 days, 30 days, lifetime).</li>
<li>Generate keys in a batch; deliver after payment clears.</li>
<li>Verify key plus a device slot before the script initialises.</li>
<li>Log failures, block repeat offenders.</li>
</ol>

<h2>Refunds without losing money</h2>
<p>State the policy before payment and offer one free slot reset. Most refund requests come from a device change, not from a broken product.</p>

<h2>What not to promise</h2>
<p>A license check does not make a script undetectable, and it does not stop a determined reverse engineer. Claim device limits, revocation, and usage logs — nothing more.</p>`
  },
  {
    slug: "software-licensing-indie",
    lang: "en",
    badge: "GUIDE · INDIE",
    title: "Software Licensing for Indie Developers: Build, Buy, or Skip",
    desc: "When indie software needs licensing at all, the three realistic options, hidden costs of each, and a decision checklist before you write a line of code.",
    h1: "Software licensing for indie developers",
    lead: "Most indie products do not need licensing — they need a payment link. Licensing starts to matter when the product can be copied, resold, or shared, and when support costs grow with every copy.",
    body: `
<h2>Do you need it?</h2>
<ul>
<li>Sold as a download or script? Yes, probably.</li>
<li>SaaS where the value is server-side? No — accounts already gate it.</li>
<li>Free with donations? No.</li>
</ul>

<h2>Three options</h2>
<table>
<tr><th>Option</th><th>Cost</th><th>Time</th></tr>
<tr><td>Hosted licensing service</td><td>Monthly</td><td>Hours</td></tr>
<tr><td>Self-hosted source</td><td>One-time + infra</td><td>A weekend</td></tr>
<tr><td>Build it yourself</td><td>Infra only</td><td>Weeks, plus maintenance</td></tr>
</table>

<h2>Hidden costs</h2>
<p><strong>Hosted:</strong> plan ceilings, price changes, and a queue for edge cases. <strong>Self-hosted:</strong> backups, key rotation, and deploy discipline. <strong>Build:</strong> the same maintenance, plus the bugs you have not hit yet.</p>

<h2>A decision checklist</h2>
<ol>
<li>How many customers in 12 months? Under 50, keep it manual.</li>
<li>Will customers ask for device resets? If yes, self-service matters.</li>
<li>Does anyone ask where key data lives? Then hosting matters.</li>
<li>What is one hour of your time worth? Multiply by setup and support.</li>
</ol>

<h2>If you go self-hosted</h2>
<p>Keep the client contract to two fields — valid and expiry — and everything else on the server. That single decision is what makes migration or a rewrite cheap later.</p>`
  }
];
