# Skills Repository Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub-ready, multi-platform skills repository template with multilingual documentation and lightweight validation.

**Architecture:** Use a root registry for discovery, per-skill directories for portable skill packages, and locale JSON files for display text. Keep validation dependency-free so the template is easy to use after cloning.

**Tech Stack:** Markdown, JSON, Node.js built-ins, GitHub.

---

### Task 1: Repository Documentation

**Files:**

- Create: `README.md`
- Create: `README.en.md`
- Create: `README.ja.md`
- Create: `README.ko.md`
- Create: `LICENSE`

- [x] **Step 1: Add multilingual root README files**

  Create Chinese, English, Japanese, and Korean entry points that explain the repository purpose, layout, and quick-start workflow.

- [x] **Step 2: Add MIT license**

  Add the MIT license with copyright owner `Anthony Li`.

### Task 2: Metadata and Validation

**Files:**

- Create: `package.json`
- Create: `registry.json`
- Create: `schemas/skill.schema.json`
- Create: `scripts/validate-registry.mjs`

- [x] **Step 1: Add npm validation command**

  Add `npm run validate` that executes `node scripts/validate-registry.mjs`.

- [x] **Step 2: Add root registry**

  Add a repository-level `registry.json` with one example skill.

- [x] **Step 3: Add schema documentation**

  Add `schemas/skill.schema.json` to document registry fields.

- [x] **Step 4: Add dependency-free validator**

  Validate IDs, duplicate entries, required files, metadata ID matching, and all required locale files.

### Task 3: Skill Template and Example

**Files:**

- Create: `templates/skill-template/SKILL.md`
- Create: `templates/skill-template/skill.json`
- Create: `templates/skill-template/README.md`
- Create: `templates/skill-template/i18n/*.json`
- Create: `skills/<skill-id>/SKILL.md`
- Create: `skills/<skill-id>/skill.json`
- Create: `skills/<skill-id>/README.md`
- Create: `skills/<skill-id>/i18n/*.json`

- [x] **Step 1: Add reusable skill template**

  Provide placeholder instructions and metadata that authors can copy.

- [x] **Step 2: Add example skill**

  Add a concrete example that demonstrates the repository conventions.

### Task 4: Publishing Docs

**Files:**

- Create: `docs/publishing.md`
- Create: `docs/platforms.md`
- Create: `docs/i18n.md`

- [x] **Step 1: Document publishing workflow**

  Explain how to copy the template, edit metadata, update the registry, validate, and commit.

- [x] **Step 2: Document platform compatibility**

  Explain how the same structure can be consumed by Claude-style, Codex-style, Cursor-style, and generic agent platforms.

- [x] **Step 3: Document multilingual maintenance**

  Explain locale files and the update checklist.

### Task 5: Verification

**Files:**

- Verify: all files above

- [x] **Step 1: Run validation**

  Run:

  ```bash
  npm run validate
  ```

  Expected: `Registry validation passed.`

- [x] **Step 2: Inspect git status**

  Run:

  ```bash
  git status --short
  ```

  Expected: only the newly created template files are listed.
