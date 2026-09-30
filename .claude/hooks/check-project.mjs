// PostToolUse hook: HTML/CSS/JS/MJS düzenlemesinden sonra basit proje kontrolü yapar.
// Salt okunurdur; hiçbir dosyayı değiştirmez. Sorun varsa stderr'e yazıp exit 2 ile çıkar.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

let filePath = "";
try {
  const input = JSON.parse(fs.readFileSync(0, "utf8"));
  filePath = input?.tool_input?.file_path ?? "";
} catch {
  process.exit(0);
}

// Yalnızca proje içindeki HTML/CSS/JS/MJS dosyaları için çalış.
const rel = path.relative(root, path.resolve(root, filePath));
const insideProject = rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
if (!insideProject || ![".html", ".css", ".js", ".mjs"].includes(path.extname(filePath).toLowerCase())) {
  process.exit(0);
}

const problems = [];
const full = (p) => path.join(root, p);
const read = (p) => (fs.existsSync(full(p)) ? fs.readFileSync(full(p), "utf8") : "");

for (const f of ["index.html", "style.css", "script.js", "netlify/functions/site-env.mjs"]) {
  if (!fs.existsSync(full(f))) problems.push(`Dosya eksik: ${f}`);
}

const html = read("index.html");
for (const id of ["yolculuk", "moduller", "komutlar", "promptlar", "projeler"]) {
  if (html && !html.includes(`id="${id}"`)) problems.push(`index.html içinde id="${id}" yok`);
}

const script = read("script.js");
if (script && !script.includes("/.netlify/functions/site-env")) {
  problems.push("script.js içinde /.netlify/functions/site-env adresi yok");
}

for (const f of ["script.js", "netlify/functions/site-env.mjs"]) {
  if (!fs.existsSync(full(f))) continue;
  const r = spawnSync(process.execPath, ["--check", full(f)], { encoding: "utf8" });
  if (r.status !== 0) problems.push(`Sözdizimi hatası (${f}): ${(r.stderr || "").trim()}`);
}

if (problems.length > 0) {
  console.error("Proje kontrolü başarısız:\n- " + problems.join("\n- "));
  process.exit(2);
}
