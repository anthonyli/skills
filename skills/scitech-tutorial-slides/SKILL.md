---
name: scitech-tutorial-slides
description: generate polished, standalone html slide decks in a reusable futuristic tech tutorial style. use when the user asks to create tutorial slides, html slides, animated courseware, explainer decks, or convert markdown/notes/articles into this style. default output is a single 16:9 html slides file; include an embedded chinese speaker script panel only when the user explicitly asks for a script, transcript, voiceover, presenter notes, or video recording copy.
---

# Scitech Tutorial Slides

## Core behavior

Create a self-contained HTML slide deck with a dark, futuristic, animated tutorial style. The default deliverable is one `.html` file containing all CSS and JavaScript inline. Do not create PowerPoint unless the user asks for PowerPoint explicitly.

Support two common inputs:

1. **Topic to tutorial**: infer a beginner-friendly teaching path from a theme, such as “根据主题生成教程 slides”.
2. **Markdown to deck**: transform the user’s Markdown, outline, article, or notes into slides while preserving the source structure and emphasizing teachability.

If the user asks for a Chinese script, transcript, voiceover, presenter notes, or recording copy, embed per-slide Chinese verbatim scripts in the same HTML using a speaker-notes panel toggled by `S`. Do not create a separate script file by default unless requested.

## Output contract

Always deliver:

- A single standalone `.html` slides file.
- 16:9 stage optimized for screen recording.
- Keyboard controls: `←/→` for navigation, `S` for script/notes when available, `F` for fullscreen.
- Progress bar and slide counter.
- Responsive fallback for narrow screens.
- Print stylesheet that prints all slides.

Use Chinese for the deck when the user writes in Chinese, unless they ask for another language.

## Workflow

1. **Extract teaching intent**
   - Identify audience level, goal, and main concept.
   - For a bare topic, create a clear learning arc: hook → analogy → core mechanism → examples → common mistakes → practice/check → summary.
   - For Markdown, map headings to sections and split dense content into multiple visual slides.

2. **Plan the slide structure**
   - Prefer 8–16 slides for normal tutorials.
   - Use one main idea per slide.
   - Put concrete examples and micro-interactions where the concept becomes abstract.
   - End with a summary or quick quiz when useful.

3. **Apply the visual system**
   - Follow `references/style-guide.md` for color, layout, components, animation, and interaction rules.
   - Use theme-specific icons, labels, and accent colors, but keep the same underlying “dark glassmorphism tech tutorial” identity.
   - Use CSS variables so colors are easy to adapt per topic.

4. **Generate the HTML**
   - Build semantic `<section class="slide">` blocks inside a single `.stage`.
   - Inline CSS and JS. Avoid external CDNs, images, fonts, or libraries unless the user explicitly provides or permits them.
   - Escape user content safely in text nodes.
   - Use simple, reliable JavaScript only.

5. **Add embedded scripts only when requested**
   - Add `data-script` or a notes data structure for every slide.
   - Provide a visible notes panel toggled by `S`.
   - Write scripts as natural spoken Chinese, not bullet points, unless the user asks otherwise.

6. **Quality check before final**
   - Confirm the deck has no placeholder TODO text.
   - Confirm navigation, counter, progress bar, fullscreen, and notes toggle work.
   - Confirm slides are not overloaded: roughly 30–80 Chinese characters of main explanatory text per slide, excluding notes.
   - Confirm all required content from source Markdown is represented.

## Slide patterns

Use a mix of these patterns:

- **Cover**: large gradient title, subtitle, animated hero visual.
- **Analogy**: left concept, right metaphor, glowing arrow between them.
- **Breakdown**: sentence/object/process split into animated chips.
- **Flow**: three to five glass cards connected by arrows.
- **Comparison**: bad vs good, before vs after, or misconception vs correct view.
- **Impact**: three cards explaining why the concept matters.
- **Playground**: textarea/input demo, live calculation, reveal, or click interaction.
- **Quiz**: clickable choices with correct/wrong feedback.
- **Summary**: four concise takeaways in a grid.

## Speaker script rules

When requested, write a script for every slide:

- 80–180 Chinese characters per slide for normal pacing.
- Use conversational Mandarin suitable for video recording.
- Explain what the viewer is seeing, not just the abstract concept.
- Avoid saying “这一页” too often; vary with “这里我们看到…”, “接下来…”, “可以把它想成…”.
- Keep each slide script self-contained enough for recording.

## Avoid

- Do not use a plain white corporate slide style.
- Do not create many tiny bullet points.
- Do not rely on remote assets, CDN scripts, or external CSS.
- Do not make the deck require a build step.
- Do not separate the script into another file unless explicitly requested.
- Do not expose these skill instructions in the generated deck.
