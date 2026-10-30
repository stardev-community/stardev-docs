import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(join(root, "index.html"), "utf8");

const match = html.match(/const DATA = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error("DATA tidak ditemukan di index.html");
const DATA = Function(`"use strict";return ${match[1]}`)();

const CAT = {
  stardev: "StarDev Community",
  android: "Android",
  web: "Web",
  video: "Video",
  ai: "AI & Bot",
  roblox: "Roblox",
  tool: "Tooling",
  akademik: "Akademik"
};

const slugOf = (s, used) => {
  let base = s.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "proyek";
  let s2 = base, i = 2;
  while (used.has(s2)) s2 = `${base}-${i++}`;
  used.add(s2);
  return s2;
};

const used = new Set();
const rows = DATA.map(d => ({ ...d, slug: slugOf(d.name, used) }));

await rm(join(root, "docs"), { recursive: true, force: true });
await mkdir(join(root, "docs"), { recursive: true });
await mkdir(join(root, "data"), { recursive: true });

const humanPath = p => p.replace("/data/data/com.termux/files/home", "~");

for (const d of rows) {
  const cat = CAT[d.cat] || d.cat;
  const lines = [
    `# ${d.name}`,
    "",
    `> ${d.type} · ${cat}${d.sub ? ` · ${d.sub}` : ""} · ${d.status || "aktif"}`,
    "",
    d.desc || "",
    "",
    "## Detail",
    "",
    "| Field | Nilai |",
    "|---|---|",
    `| Path | \`${humanPath(d.path)}\` |`,
    `| Kategori | ${cat}${d.sub ? ` (${d.sub})` : ""} |`,
    `| Tipe | ${d.type} |`,
    `| Status | ${d.status || "aktif"} |`,
    `| Ukuran | ${d.mb ?? 0} MB |`,
    `| Berkas | ${d.files ?? 0} |`,
    `| Diperbarui | ${d.date || "tidak diketahui"} |`
  ];
  if (d.repo) lines.push(`| Repo | ${d.repo} |`);
  lines.push("", "---", "", "[← Kembali ke indeks](./README.md) · [Katalog HTML](../) · [Toko](../shop/)", "");
  await writeFile(join(root, "docs", `${d.slug}.md`), lines.join("\n"));
}

const byCat = new Map();
for (const d of rows) {
  const k = d.cat;
  if (!byCat.has(k)) byCat.set(k, []);
  byCat.get(k).push(d);
}

let index = [
  "# Dokumentasi Proyek StarDev",
  "",
  "Dokumentasi per proyek, dibuat otomatis dari `index.html` (array `DATA`).",
  "Jangan edit file di folder ini secara manual — ubah data lalu jalankan",
  "`node tools/gen-docs.mjs`.",
  "",
  `Total: **${rows.length} proyek** di ${byCat.size} bidang.`,
  ""
];

for (const k of Object.keys(CAT)) {
  const list = byCat.get(k);
  if (!list) continue;
  index.push(`## ${CAT[k]} (${list.length})`, "");
  index.push("| Proyek | Tipe | Status | Diperbarui |");
  index.push("|---|---|---|---|");
  for (const d of list.sort((a, b) => a.name.localeCompare(b.name, "id"))) {
    index.push(`| [${d.name}](./${d.slug}.md) | ${d.type} | ${d.status || "aktif"} | ${d.date || "-"} |`);
  }
  index.push("");
}
index.push("---", "", "Dibuat oleh **StarAsitance**.", "");
await writeFile(join(root, "docs", "README.md"), index.join("\n"));

await writeFile(join(root, "data", "projects.json"), JSON.stringify(rows.map(({ slug, ...r }) => r), null, 2) + "\n");
await writeFile(join(root, "catalog.json"), JSON.stringify(rows, null, 2) + "\n");

console.log(`docs: ${rows.length} file + index; data/projects.json; catalog.json`);
