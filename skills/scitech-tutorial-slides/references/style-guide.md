# Futuristic Tech Tutorial HTML Slides Style Guide

Use this guide when creating standalone HTML slides in the scitech tutorial style.

## Visual identity

Overall feel: dark glassmorphism, luminous gradients, soft depth, modular UI cards, and gentle educational animations. It should feel like a premium AI/product explainer rather than a corporate presentation.

Default CSS variables:

```css
:root{
  --bg:#080c19;
  --panel:#121a33;
  --panel2:#18264a;
  --text:#eef4ff;
  --muted:#aab7d6;
  --brand:#7dd3fc;
  --brand2:#a78bfa;
  --ok:#34d399;
  --warn:#fbbf24;
  --bad:#fb7185;
  --radius:32px;
  --shadow:0 30px 90px rgba(0,0,0,.42);
}
```

Topic adaptations:

- AI/data/cloud: cyan + violet.
- Security/risk: cyan + red/pink accents used sparingly.
- Finance/business: cyan + emerald/gold accents.
- Creativity/design: violet + pink with cyan highlights.
- Developer topics: cyan + green with terminal-like cards.

## Page shell

Use a single fixed stage centered on the viewport:

```css
body{
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",Arial,sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at 16% 8%, rgba(125,211,252,.20), transparent 30%),
    radial-gradient(circle at 82% 0%, rgba(167,139,250,.22), transparent 31%),
    linear-gradient(180deg,#080c19 0%,#0b1020 58%,#080c19 100%);
  overflow:hidden;
}
.stage{
  width:min(96vw,1420px);
  aspect-ratio:16/9;
  position:relative;
  overflow:hidden;
  border-radius:34px;
  border:1px solid rgba(255,255,255,.12);
  background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));
  box-shadow:var(--shadow);
}
.slide{
  position:absolute;
  inset:0;
  padding:54px 66px 74px;
  display:grid;
  grid-template-rows:auto 1fr;
  gap:24px;
  opacity:0;
  pointer-events:none;
  transform:translateX(20px) scale(.985);
  transition:opacity .38s ease, transform .38s ease;
}
.slide.active{opacity:1;pointer-events:auto;transform:none;z-index:2;}
```

Add a subtle grain overlay with inline SVG data URL if desired. Keep opacity low.

## Typography

- H1: huge gradient text, tight letter spacing.
- Kicker: small capsule label such as `03 · 核心机制`.
- Body: muted blue-gray, 1.5–1.7 line height.
- Keep visible text short; use notes for detailed narration.

Useful base:

```css
.kicker{display:inline-flex;align-items:center;border:1px solid rgba(125,211,252,.26);background:rgba(125,211,252,.08);border-radius:999px;padding:8px 13px;color:#d9f6ff;font-size:15px;font-weight:780;letter-spacing:.04em;margin-bottom:16px}
h1{font-size:clamp(34px,4.8vw,72px);line-height:1.02;margin:0 0 12px;letter-spacing:-.055em;background:linear-gradient(90deg,#fff 0%,var(--brand) 48%,var(--brand2) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.slide-header p{margin:0;color:var(--muted);font-size:clamp(17px,1.7vw,24px);line-height:1.55}
```

## Components

### Glass card

```css
.card{
  background:rgba(8,17,38,.64);
  border:1px solid rgba(255,255,255,.11);
  border-radius:24px;
  box-shadow:0 18px 48px rgba(0,0,0,.22);
  padding:24px;
}
```

### Token/chip

Use for split concepts, tags, steps, keywords, and animated fragments.

```css
.chip{
  display:inline-flex;align-items:center;gap:6px;min-height:42px;padding:9px 13px;border-radius:14px;
  background:linear-gradient(180deg,rgba(125,211,252,.20),rgba(167,139,250,.14));
  border:1px solid rgba(125,211,252,.26);color:#f7fbff;font-weight:850;
  opacity:0;transform:translateY(16px) scale(.92);
}
.slide.active .chip{animation:pop .58s cubic-bezier(.2,.9,.25,1) forwards;animation-delay:var(--d,0ms)}
@keyframes pop{to{opacity:1;transform:translateY(0) scale(1)}}
```

### Flow cards

Use a grid with cards and arrows. For 3 cards: `grid-template-columns:1fr auto 1fr auto 1fr`.

### Window card

For demos, create a fake app/browser window with three colored dots at top. Use this for prompts, code, model input/output, or a live playground.

### Quiz card

Clickable options should add `.correct` or `.wrong`, and a feedback line should explain the answer.

## Animation rules

Use animation to reveal meaning, not decoration.

Recommended animations:

- chips pop in with staggered delays using `style="--d:120ms"`.
- bars fill when active.
- arrows gently bob.
- coins/icons float subtly.
- active slide transitions fade/slide in.

Keep animations short and loop only when the loop communicates state. Avoid distracting continuous motion on text-heavy slides.

## Interaction rules

Always include:

- `←` and `→` navigation.
- `S` notes toggle when scripts exist.
- `F` fullscreen toggle.
- Clickable nav buttons.
- Slide count and progress bar.

Minimal JavaScript behavior:

```js
const slides=[...document.querySelectorAll('.slide')];
let current=0;
function show(i){
  current=Math.max(0,Math.min(slides.length-1,i));
  slides.forEach((s,idx)=>s.classList.toggle('active',idx===current));
  document.getElementById('count').textContent=`${current+1} / ${slides.length}`;
  document.getElementById('bar').style.width=`${((current+1)/slides.length)*100}%`;
  const notes=document.getElementById('notesText');
  if(notes) notes.textContent=slides[current].dataset.script||'本页暂无逐字稿。';
}
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight') show(current+1);
  if(e.key==='ArrowLeft') show(current-1);
  if(e.key.toLowerCase()==='s') document.getElementById('notes')?.classList.toggle('show');
  if(e.key.toLowerCase()==='f') document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
});
```

## Recommended deck structure

For a generated tutorial, use this structure unless the user supplies a different outline:

1. Cover: topic and promise.
2. Why it matters: pain point or motivation.
3. Analogy: a simple mental model.
4. Definition: concise explanation.
5. Mechanism: what happens step by step.
6. Example: concrete input/output or scenario.
7. Deepening: one important detail or hidden layer.
8. Common mistake: misconception or bad practice.
9. Better pattern: how to do it well.
10. Playground/demo: small interaction or visual simulation.
11. Quiz/check: reinforce learning.
12. Summary: key takeaways.

For dense Markdown, increase slides to 14–18 and preserve major headings.

## Content style

- Use vivid analogies: “积木”, “传送带”, “背包”, “雷达”, “仪表盘”.
- Prefer concrete verbs: split, pack, count, route, score, compare, predict.
- Use short Chinese titles: 4–12 Chinese characters when possible.
- Avoid long paragraphs on the visible slide. Move details into speaker script if requested.
