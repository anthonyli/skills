---
name: futuristic-tech-slides
description: Generate high-end, animation-rich HTML presentations with a futuristic/hard-tech aesthetic. Features neon accents, glitch effects, 3D tilt interactions, and particle backgrounds. Use when the user requests a technical, cyberpunk, or futuristic style for their slides, especially for tech deep-dives, product launches, or developer-focused content.
---

# Futuristic Tech Slides

This skill enables AnyGen to create visually striking, technical presentations inspired by sci-fi and modern tech aesthetics.

## Quick Start

1. **Read the Template**: Start by reading `assets/template.html`. This file contains the complete CSS, JS, and layout framework.
2. **Apply Design Tokens**: Follow the patterns in `references/tech-patterns.md` for consistent styling.
3. **Populate Content**: Replace placeholders in the template with user-specific content. Ensure all text leaf nodes have `contenteditable="true"`.

## Core Features

- **Futuristic Aesthetic**: Dark canvas (`#06080d`) with cyan (`#00ffcc`) and purple (`#bf00ff`) neon accents.
- **Dynamic Effects**:
    - **Glitch Text**: Animated title effects for high impact.
    - **3D Tilt Cards**: Interactive content containers that react to mouse movement.
    - **Particle Backgrounds**: Subtle floating nodes to add depth.
- **Smart Scaling**: Includes a `ScaleController` that ensures the 1280x720 canvas fits perfectly in any viewport (including mobile waterfall mode).
- **Editability**: Every slide is ready for the user to click and edit content directly in the browser.

## Layout Guidelines

- **Title Slides**: Center-aligned, massive glitch titles, particle background.
- **Content Slides**: Use `.grid-2` or `.grid-3` for multi-column data.
- **Feature Highlights**: Use `.card` components with `reveal-scale` animations.
- **Technical Specs**: Use `.list-tech` for bulleted technical details.

## Workflow

1.  **Analyze Request**: Identify the core message and structure of the presentation.
2.  **Initialize HTML**: Use the code from `assets/template.html` as the base.
3.  **Generate Slides**: For each section, choose an appropriate layout (Cover, Split, Grid, or Card focus).
4.  **Inject Animations**: Use `.reveal`, `.reveal-left`, and `.reveal-scale` with staggered delays (`d-1`, `d-2`, etc.).
5.  **Verify Overflow**: Use a Playwright script to ensure no content exceeds the 1280x720 canvas.

## Resources

- **`assets/template.html`**: The primary boilerplate for all presentations.
- **`references/tech-patterns.md`**: CSS and HTML patterns for specific sci-fi components.
