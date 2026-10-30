import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(await readFile(join(here, "tokens.json"), "utf8"));

const vars = [];
const add = (name, value) => vars.push(`  --${name}: ${value};`);

for (const [k, v] of Object.entries(tokens.color || {})) add(`c-${k}`, v);
add("font-sans", tokens.type["font-sans"]);
add("font-mono", tokens.type["font-mono"]);
for (const [k, v] of Object.entries(tokens.type.size || {})) add(`fs-${k}`, v);
for (const [k, v] of Object.entries(tokens.type.weight || {})) add(`weight-${k}`, v);
for (const [k, v] of Object.entries(tokens.type.leading || {})) add(`leading-${k}`, v);
for (const [k, v] of Object.entries(tokens.type.tracking || {})) add(`tracking-${k}`, v);
for (const [k, v] of Object.entries(tokens.space || {})) add(`sp-${k}`, v);
for (const [k, v] of Object.entries(tokens.radius || {})) add(`r-${k}`, v);
for (const [k, v] of Object.entries(tokens.shadow || {})) add(`sh-${k}`, v);
for (const [k, v] of Object.entries(tokens.motion || {})) add(`motion-${k}`, v);

const css = `:root {\n${vars.join("\n")}\n}`;
const marker = /\/\*TOKENS:START\*\/[\s\S]*?\/\*TOKENS:END\*\//;

const targets = [
  { file: join(here, "index.html"), kind: "css" },
  { file: join(here, "..", "index.html"), kind: "both", optional: true },
  { file: join(here, "..", "shop", "index.html"), kind: "css", optional: true },
  { file: join(here, "..", "shop", "en", "index.html"), kind: "css", optional: true }
];

let changed = 0;
for (const t of targets) {
  let html;
  try {
    html = await readFile(t.file, "utf8");
  } catch {
    if (t.optional) continue;
    throw new Error(`file tidak ditemukan: ${t.file}`);
  }
  let out = html;
  if (marker.test(out)) {
    out = out.replace(marker, `/*TOKENS:START*/\n${css}\n/*TOKENS:END*/`);
  }
  const jsonMarker = /\/\*TOKENS-JSON:START\*\/[\s\S]*?\/\*TOKENS-JSON:END\*\//;
  if (jsonMarker.test(out)) {
    out = out.replace(jsonMarker, `/*TOKENS-JSON:START*/${JSON.stringify(tokens)}/*TOKENS-JSON:END*/`);
  }
  if (out !== html) {
    await writeFile(t.file, out);
    changed++;
    console.log(`tokens -> ${t.file.replace(here, "design")}`);
  }
}

console.log(`StarUI ${tokens.meta?.version ?? "?"}: ${vars.length} variabel, ${changed} file diperbarui.`);
