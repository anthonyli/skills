# Standalone HTML Skeleton

Use this skeleton as a compact starting point. Expand components and slide content according to the task.

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>教程标题</title>
<style>
:root{--bg:#080c19;--panel:#121a33;--panel2:#18264a;--text:#eef4ff;--muted:#aab7d6;--brand:#7dd3fc;--brand2:#a78bfa;--ok:#34d399;--warn:#fbbf24;--bad:#fb7185;--radius:32px;--shadow:0 30px 90px rgba(0,0,0,.42)}
*{box-sizing:border-box} html,body{height:100%;margin:0} body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",Arial,sans-serif;color:var(--text);background:radial-gradient(circle at 16% 8%,rgba(125,211,252,.20),transparent 30%),radial-gradient(circle at 82% 0%,rgba(167,139,250,.22),transparent 31%),linear-gradient(180deg,#080c19 0%,#0b1020 58%,#080c19 100%);overflow:hidden}.deck-shell{min-height:100vh;display:grid;place-items:center;padding:22px}.stage{width:min(96vw,1420px);aspect-ratio:16/9;position:relative;overflow:hidden;border-radius:34px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));box-shadow:var(--shadow)}.slide{position:absolute;inset:0;padding:54px 66px 74px;display:grid;grid-template-rows:auto 1fr;gap:24px;opacity:0;pointer-events:none;transform:translateX(20px) scale(.985);transition:opacity .38s ease,transform .38s ease}.slide.active{opacity:1;pointer-events:auto;transform:none;z-index:2}.kicker{display:inline-flex;align-items:center;border:1px solid rgba(125,211,252,.26);background:rgba(125,211,252,.08);border-radius:999px;padding:8px 13px;color:#d9f6ff;font-size:15px;font-weight:780;letter-spacing:.04em;margin-bottom:16px}h1{font-size:clamp(34px,4.8vw,72px);line-height:1.02;margin:0 0 12px;letter-spacing:-.055em;background:linear-gradient(90deg,#fff 0%,var(--brand) 48%,var(--brand2) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}.slide-header p{margin:0;color:var(--muted);font-size:clamp(17px,1.7vw,24px);line-height:1.55}.slide-visual{position:relative;display:grid;align-items:center}.card{background:rgba(8,17,38,.64);border:1px solid rgba(255,255,255,.11);border-radius:24px;box-shadow:0 18px 48px rgba(0,0,0,.22);padding:24px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.chip{display:inline-flex;align-items:center;gap:6px;min-height:42px;padding:9px 13px;border-radius:14px;background:linear-gradient(180deg,rgba(125,211,252,.20),rgba(167,139,250,.14));border:1px solid rgba(125,211,252,.26);color:#f7fbff;font-weight:850;opacity:0;transform:translateY(16px) scale(.92)}.slide.active .chip{animation:pop .58s cubic-bezier(.2,.9,.25,1) forwards;animation-delay:var(--d,0ms)}@keyframes pop{to{opacity:1;transform:translateY(0) scale(1)}}.controls{position:absolute;left:24px;right:24px;bottom:18px;z-index:10;display:flex;align-items:center;justify-content:space-between;color:#cbd7f6}.nav{appearance:none;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);color:var(--text);border-radius:14px;padding:10px 13px;cursor:pointer;font-weight:850}.progress{position:absolute;left:0;right:0;bottom:0;height:6px;background:rgba(255,255,255,.08);z-index:11}.progress span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--brand),var(--brand2));transition:width .28s ease}.notes-panel{position:fixed;right:18px;top:18px;width:min(480px,calc(100vw - 36px));max-height:calc(100vh - 36px);overflow:auto;z-index:30;background:rgba(8,17,38,.96);border:1px solid rgba(255,255,255,.14);border-radius:22px;box-shadow:0 20px 80px rgba(0,0,0,.45);padding:20px;display:none}.notes-panel.show{display:block}.notes-panel p{font-size:18px;line-height:1.75;color:#edf5ff;margin:0}@media(max-width:900px){body{overflow:auto}.deck-shell{padding:10px;min-height:auto}.stage{width:100vw;min-height:100vh;aspect-ratio:auto;border-radius:0}.slide{padding:42px 22px 82px;overflow:auto}.grid-3{grid-template-columns:1fr}}@media print{body{background:white;overflow:visible}.controls,.progress,.notes-panel{display:none!important}.deck-shell{display:block;padding:0}.stage{width:100%;aspect-ratio:auto;border:0;box-shadow:none;border-radius:0;background:white;overflow:visible}.slide{position:relative;display:block;opacity:1;transform:none;page-break-after:always;color:#111;background:#fff;min-height:100vh}h1{color:#111;background:none}.slide-header p{color:#333}}
</style>
</head>
<body>
<div class="deck-shell">
  <main class="stage" id="stage">
    <section class="slide active" data-script="可选逐字稿。">
      <div class="slide-header"><div class="kicker">01 · 开场</div><h1>教程标题</h1><p>一句话说明学习收益。</p></div>
      <div class="slide-visual"><div class="card"><span class="chip" style="--d:0ms">关键词</span><span class="chip" style="--d:120ms">概念</span><span class="chip" style="--d:240ms">例子</span></div></div>
    </section>
  </main>
  <div class="controls"><button class="nav" id="prev">← 上一页</button><span id="count">1 / 1</span><button class="nav" id="next">下一页 →</button></div>
  <div class="progress"><span id="bar"></span></div>
</div>
<aside class="notes-panel" id="notes"><h2>逐字稿</h2><p id="notesText"></p></aside>
<script>
const slides=[...document.querySelectorAll('.slide')];let current=0;const count=document.getElementById('count'),bar=document.getElementById('bar'),notes=document.getElementById('notes'),notesText=document.getElementById('notesText');function show(i){current=Math.max(0,Math.min(slides.length-1,i));slides.forEach((s,idx)=>s.classList.toggle('active',idx===current));count.textContent=`${current+1} / ${slides.length}`;bar.style.width=`${((current+1)/slides.length)*100}%`;if(notesText)notesText.textContent=slides[current].dataset.script||'本页暂无逐字稿。'}document.getElementById('prev').onclick=()=>show(current-1);document.getElementById('next').onclick=()=>show(current+1);document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);if(e.key.toLowerCase()==='s')notes?.classList.toggle('show');if(e.key.toLowerCase()==='f')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();});show(0);
</script>
</body>
</html>
```
