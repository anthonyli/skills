# Futuristic Tech Slides Design Patterns

This document defines the core design tokens and components for the `futuristic-tech-slides` skill.

## Design Tokens

- **Colors**:
  - Background: `#06080d`
  - Accent (Cyan): `#00ffcc`
  - Accent Secondary (Purple): `#bf00ff`
  - Text: `#e0e6ed`
- **Typography**:
  - Display: `Orbitron`, `MiSans`
  - Body: `Space Grotesk`, `Noto Sans SC`

## Core Components

### 1. Sci-Fi Card
Uses `clip-path` to create a chamfered corner aesthetic.
```html
<div class="card">
  <h3 class="title-small">Title</h3>
  <p class="text-body">Description</p>
</div>
