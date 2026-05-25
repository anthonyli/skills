import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "registry.json");
const requiredLocales = ["zh-CN", "en", "ja", "ko"];

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exitCode = 1;
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(root, filePath)} is not valid JSON: ${error.message}`);
    return null;
  }
}

const registry = readJson(registryPath);

if (registry) {
  if (!registry.repository) {
    fail("registry.repository is required");
  }

  if (!Array.isArray(registry.skills)) {
    fail("registry.skills must be an array");
  }

  const ids = new Set();

  for (const skill of registry.skills ?? []) {
    if (!skill.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.id)) {
      fail(`skill id must be kebab-case: ${skill.id ?? "(missing)"}`);
      continue;
    }

    if (ids.has(skill.id)) {
      fail(`duplicate skill id: ${skill.id}`);
    }
    ids.add(skill.id);

    const skillDir = path.join(root, skill.path ?? "");
    const entryPath = path.join(skillDir, skill.entry ?? "SKILL.md");
    const metadataPath = path.join(skillDir, skill.metadata ?? "skill.json");

    if (!existsSync(skillDir)) {
      fail(`${skill.id}: directory does not exist: ${skill.path}`);
      continue;
    }

    if (!existsSync(entryPath)) {
      fail(`${skill.id}: missing ${skill.entry}`);
    }

    if (!existsSync(metadataPath)) {
      fail(`${skill.id}: missing ${skill.metadata}`);
      continue;
    }

    const metadata = readJson(metadataPath);
    if (!metadata) {
      continue;
    }

    if (metadata.id !== skill.id) {
      fail(`${skill.id}: skill.json id must match registry id`);
    }

    for (const locale of requiredLocales) {
      const localePath = path.join(skillDir, "i18n", `${locale}.json`);
      if (!existsSync(localePath)) {
        fail(`${skill.id}: missing i18n/${locale}.json`);
        continue;
      }

      const localeData = readJson(localePath);
      if (!localeData?.name || !localeData?.summary) {
        fail(`${skill.id}: i18n/${locale}.json must include name and summary`);
      }
    }
  }
}

if (process.exitCode) {
  process.exit();
}

console.log("Registry validation passed.");
