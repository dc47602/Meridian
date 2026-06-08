import { useState, useEffect, useRef } from "react";
import { POSTS, DESTINATIONS, PHOTOS, SOCIAL_POSTS, ROUTES, QUICK_PROMPTS } from "./data/blogdata.js";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

  :root {
    --void: #080a09; --deep: #0f1210; --surface: #161a17; --raised: #1d2220;
    --border: rgba(255,255,255,0.07); --border-bright: rgba(255,255,255,0.15);
    --text: #e8e4dc; --muted: #8a9088; --ghost: #4a504d;
    --accent: #d4a853; --accent-dim: rgba(212,168,83,0.15);
    --pine: #4a8c6a; --pine-dim: rgba(74,140,106,0.15);
    --rust: #c45230; --sky: #3a7ca5;
    --ig: #e1306c; --tw: #1da1f2; --yt: #ff0000;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--void); color: var(--text); font-family: 'Cormorant Garamond', serif; font-size: 18px; line-height: 1.7; cursor: none; overflow-x: hidden; }

  .cursor { position: fixed; width: 10px; height: 10px; background: var(--accent); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); transition: width .2s, height .2s, opacity .2s; mix-blend-mode: difference; }
  .cursor-ring { position: fixed; border: 1px solid rgba(212,168,83,0.4); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: width .3s, height .3s; }
  body::before { content:''; position:fixed; inset:0; z-index:9990; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"); opacity:.025; pointer-events:none; }

  /* ── TOPBAR ── */
  .topbar { position:fixed; top:0; left:0; right:0; z-index:1000; height:60px; background:rgba(8,10,9,.93); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 3rem; }
  .logo { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:300; letter-spacing:.18em; text-transform:uppercase; color:var(--text); cursor:pointer; }
  .logo span { color:var(--accent); font-style:italic; font-weight:600; }
  .topbar-nav { display:flex; gap:2rem; align-items:center; }
  .nav-link { font-family:'Syne',sans-serif; font-size:.65rem; font-weight:500; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); background:none; border:none; cursor:pointer; transition:color .2s; padding:0; }
  .nav-link:hover,.nav-link.active { color:var(--text); }
  .nav-write-btn { font-family:'Syne',sans-serif; font-size:.65rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; background:var(--accent); color:var(--void); border:none; padding:.45rem 1.1rem; border-radius:1px; cursor:pointer; transition:all .2s; }
  .nav-write-btn:hover { background:#e0b860; transform:translateY(-1px); }

  .page { animation:fadeIn .4s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  /* ── SHARED ── */
  .section { padding:6rem 3rem; }
  .section-rule { display:flex; align-items:center; gap:1.5rem; margin-bottom:3.5rem; }
  .section-label { font-family:'Syne',sans-serif; font-size:.65rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); white-space:nowrap; }
  .section-line { flex:1; height:1px; background:var(--border); }
  .section-count { font-family:'JetBrains Mono',monospace; font-size:.6rem; color:var(--ghost); white-space:nowrap; }
  .btn-gold { font-family:'Syne',sans-serif; font-size:.7rem; font-weight:600; letter-spacing:.15em; text-transform:uppercase; background:var(--accent); color:var(--void); border:none; padding:.8rem 2rem; border-radius:1px; cursor:pointer; transition:all .25s; }
  .btn-gold:hover { background:#e0b860; transform:translateY(-2px); box-shadow:0 8px 24px rgba(212,168,83,.25); }
  .btn-ghost { font-family:'Syne',sans-serif; font-size:.7rem; font-weight:500; letter-spacing:.12em; text-transform:uppercase; background:none; color:var(--muted); border:1px solid var(--border-bright); padding:.8rem 1.6rem; border-radius:1px; cursor:pointer; transition:all .25s; }
  .btn-ghost:hover { color:var(--text); border-color:var(--text); }

  /* ── HERO ── */
  .hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; padding-top:60px; overflow:hidden; }
  .hero-left { padding:8rem 3rem 6rem; display:flex; flex-direction:column; justify-content:center; border-right:1px solid var(--border); }
  .hero-issue { font-family:'JetBrains Mono',monospace; font-size:.65rem; letter-spacing:.2em; color:var(--accent); text-transform:uppercase; margin-bottom:2rem; display:flex; align-items:center; gap:.8rem; }
  .hero-issue::before { content:''; display:block; width:24px; height:1px; background:var(--accent); }
  .hero-headline { font-family:'Cormorant Garamond',serif; font-size:clamp(3.5rem,6vw,5.5rem); font-weight:300; line-height:1.05; margin-bottom:2rem; }
  .hero-headline em { font-style:italic; color:var(--accent); }
  .hero-sub { font-size:1.05rem; font-weight:300; color:var(--muted); max-width:38ch; line-height:1.8; margin-bottom:3rem; }
  .hero-cta { display:flex; gap:1.2rem; align-items:center; }
  .hero-right { display:flex; flex-direction:column; justify-content:flex-end; position:relative; overflow:hidden; }
  .hero-featured-img { position:absolute; inset:0; background:linear-gradient(135deg,#1a2420,#0d1510 50%,#080a09); }
  .hero-geo { position:absolute; inset:0; overflow:hidden; }
  .hero-geo svg { width:100%; height:100%; opacity:.12; }
  .hero-featured-card { position:relative; z-index:2; padding:2.5rem; background:linear-gradient(to top,rgba(8,10,9,.98) 0%,rgba(8,10,9,.7) 60%,transparent); cursor:pointer; }
  .hero-tag { font-family:'JetBrains Mono',monospace; font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); margin-bottom:.6rem; }
  .hero-card-title { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; line-height:1.15; margin-bottom:.8rem; }
  .hero-card-meta { font-family:'JetBrains Mono',monospace; font-size:.6rem; color:var(--ghost); letter-spacing:.1em; display:flex; gap:1.2rem; }

  /* ── POST GRID ── */
  .posts-grid { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:auto auto; gap:1px; background:var(--border); }
  .post-cell { background:var(--void); cursor:pointer; transition:background .25s; position:relative; overflow:hidden; }
  .post-cell:hover { background:var(--deep); }
  .post-cell.featured { grid-row:span 2; }
  .post-cell-inner { padding:2rem; height:100%; display:flex; flex-direction:column; justify-content:flex-end; }
  .post-cell.featured .post-cell-inner { padding:2.5rem; min-height:520px; }
  .post-cell-bg { position:absolute; inset:0; opacity:.18; transition:opacity .3s,transform .5s; }
  .post-cell:hover .post-cell-bg { opacity:.28; transform:scale(1.03); }
  .cell-tag { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); margin-bottom:.5rem; position:relative; z-index:1; }
  .cell-title { font-family:'Cormorant Garamond',serif; position:relative; z-index:1; line-height:1.2; }
  .post-cell.featured .cell-title { font-size:2rem; font-weight:600; margin-bottom:.8rem; }
  .post-cell:not(.featured) .cell-title { font-size:1.15rem; font-weight:600; margin-bottom:.5rem; }
  .cell-excerpt { font-size:.88rem; color:var(--muted); line-height:1.6; position:relative; z-index:1; margin-bottom:1rem; }
  .post-cell:not(.featured) .cell-excerpt { display:none; }
  .cell-meta { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); letter-spacing:.08em; display:flex; gap:1rem; position:relative; z-index:1; }
  .cell-read-more { font-family:'Syne',sans-serif; font-size:.62rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:.4rem; margin-top:1.2rem; position:relative; z-index:1; transition:gap .2s; }
  .post-cell:hover .cell-read-more { gap:.8rem; }
  .articles-cols { display:grid; grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--border); }
  .article-col { padding:2.5rem 2rem; border-right:1px solid var(--border); cursor:pointer; transition:background .2s; }
  .article-col:last-child { border-right:none; }
  .article-col:hover { background:var(--deep); }
  .article-num { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); letter-spacing:.12em; margin-bottom:1.2rem; display:flex; align-items:center; gap:.6rem; }
  .article-num::after { content:''; flex:1; height:1px; background:var(--border); }
  .article-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:600; line-height:1.2; margin-bottom:.8rem; }
  .article-desc { font-size:.85rem; color:var(--muted); line-height:1.7; margin-bottom:1.2rem; }
  .article-tag { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); }

  /* ── POST DETAIL ── */
  .post-detail-hero { min-height:60vh; display:flex; align-items:flex-end; padding:6rem 4rem 4rem; border-bottom:1px solid var(--border); position:relative; overflow:hidden; }
  .post-detail-content { max-width:820px; margin:0 auto; padding:5rem 2rem; }
  .post-detail-tag { font-family:'JetBrains Mono',monospace; font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); margin-bottom:1rem; }
  .post-detail-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,5vw,4rem); font-weight:300; line-height:1.1; margin-bottom:2rem; }
  .post-detail-meta { display:flex; gap:2rem; padding:1.2rem 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); margin-bottom:3rem; font-family:'JetBrains Mono',monospace; font-size:.6rem; color:var(--ghost); letter-spacing:.1em; }
  .post-body { font-size:1.1rem; font-weight:300; line-height:1.9; }
  .post-body p { margin-bottom:1.8rem; }
  .post-body h2 { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; margin:3rem 0 1rem; }
  .post-body blockquote { border-left:2px solid var(--accent); padding-left:1.5rem; margin:2.5rem 0; font-style:italic; font-size:1.25rem; color:var(--muted); line-height:1.7; }
  .back-btn { font-family:'Syne',sans-serif; font-size:.65rem; font-weight:600; letter-spacing:.15em; text-transform:uppercase; background:none; border:none; color:var(--muted); cursor:pointer; display:flex; align-items:center; gap:.5rem; padding:0; transition:color .2s; margin-bottom:2rem; }
  .back-btn:hover { color:var(--text); }

  /* ── PHOTO JOURNAL ── */
  .journal-page { padding-top:60px; }
  .journal-hero { padding:5rem 3rem 3rem; border-bottom:1px solid var(--border); }
  .journal-filters { display:flex; gap:.6rem; flex-wrap:wrap; margin-top:1.8rem; }
  .filter-chip { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.12em; text-transform:uppercase; background:var(--surface); color:var(--muted); border:1px solid var(--border); padding:.4rem 1rem; border-radius:2px; cursor:pointer; transition:all .2s; }
  .filter-chip:hover { color:var(--text); border-color:var(--border-bright); }
  .filter-chip.active { background:var(--accent-dim); color:var(--accent); border-color:rgba(212,168,83,.35); }
  .journal-grid { columns:3; gap:3px; padding:3px; background:var(--void); }
  .journal-item { break-inside:avoid; margin-bottom:3px; position:relative; overflow:hidden; cursor:pointer; display:block; }
  .journal-item:hover .journal-overlay { opacity:1; }
  .journal-item:hover .journal-img-el { transform:scale(1.04); }
  .journal-img-el { width:100%; display:block; transition:transform .5s ease; }
  .journal-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(8,10,9,.92) 0%,rgba(8,10,9,.3) 50%,transparent); opacity:0; transition:opacity .3s; display:flex; flex-direction:column; justify-content:flex-end; padding:1.5rem; }
  .journal-overlay-tag { font-family:'JetBrains Mono',monospace; font-size:.55rem; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); margin-bottom:.4rem; }
  .journal-overlay-title { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:600; line-height:1.2; margin-bottom:.5rem; }
  .journal-overlay-meta { font-family:'JetBrains Mono',monospace; font-size:.55rem; color:var(--ghost); letter-spacing:.08em; display:flex; gap:.8rem; }

  /* LIGHTBOX */
  .lightbox { position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,.95); display:flex; align-items:center; justify-content:center; animation:fadeIn .25s ease; }
  .lightbox-inner { max-width:900px; width:90%; position:relative; }
  .lightbox-close { position:absolute; top:-2.5rem; right:0; background:none; border:none; color:var(--muted); cursor:pointer; font-size:1.2rem; font-family:'Syne',sans-serif; letter-spacing:.1em; transition:color .2s; }
  .lightbox-close:hover { color:var(--text); }
  .lightbox-meta { margin-top:1.2rem; display:flex; justify-content:space-between; align-items:flex-end; }
  .lightbox-title { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; }
  .lightbox-info { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); letter-spacing:.1em; text-align:right; line-height:1.8; }
  .lightbox-nav { display:flex; gap:.6rem; margin-top:1rem; justify-content:center; }
  .lnav-btn { background:var(--surface); border:1px solid var(--border); color:var(--muted); cursor:pointer; padding:.5rem 1.2rem; font-family:'Syne',sans-serif; font-size:.62rem; letter-spacing:.12em; text-transform:uppercase; border-radius:1px; transition:all .2s; }
  .lnav-btn:hover { color:var(--text); border-color:var(--border-bright); }

  /* ── SOCIAL ── */
  .social-page { padding-top:60px; }
  .social-hero { padding:5rem 3rem 3rem; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:flex-end; gap:2rem; flex-wrap:wrap; }
  .social-platform-tabs { display:flex; border:1px solid var(--border); border-radius:2px; overflow:hidden; }
  .platform-tab { font-family:'Syne',sans-serif; font-size:.62rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; background:transparent; color:var(--ghost); border:none; padding:.6rem 1.2rem; cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:.5rem; }
  .platform-tab:hover:not(.active) { background:var(--raised); color:var(--muted); }
  .platform-tab.active.ig { background:var(--ig); color:white; }
  .platform-tab.active.tw { background:var(--tw); color:white; }
  .platform-tab.active.yt { background:var(--yt); color:white; }
  .platform-tab.active.all { background:var(--accent); color:var(--void); }
  .social-stats-bar { display:flex; border-bottom:1px solid var(--border); background:var(--deep); }
  .social-stat { padding:1.5rem 2.5rem; border-right:1px solid var(--border); display:flex; align-items:center; gap:1rem; }
  .social-stat:last-child { border-right:none; }
  .social-stat-icon { font-size:1.2rem; }
  .social-stat-val { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:300; line-height:1; }
  .social-stat-label { font-family:'JetBrains Mono',monospace; font-size:.55rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ghost); margin-top:.15rem; }
  .social-feed { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--border); }
  .social-card { background:var(--void); cursor:pointer; transition:background .2s; overflow:hidden; }
  .social-card:hover { background:var(--deep); }
  .social-card:hover .sc-media { transform:scale(1.03); }
  .sc-media-wrap { aspect-ratio:1; overflow:hidden; position:relative; }
  .sc-media { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:3rem; transition:transform .4s; }
  .sc-platform-badge { position:absolute; top:.8rem; left:.8rem; z-index:2; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:700; }
  .sc-platform-badge.ig { background:var(--ig); }
  .sc-platform-badge.tw { background:var(--tw); }
  .sc-platform-badge.yt { background:var(--yt); }
  .sc-body { padding:1.5rem; border-top:1px solid var(--border); }
  .sc-handle { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; margin-bottom:.6rem; display:flex; align-items:center; gap:.5rem; }
  .sc-handle.ig { color:var(--ig); } .sc-handle.tw { color:var(--tw); } .sc-handle.yt { color:var(--yt); }
  .sc-text { font-family:'Cormorant Garamond',serif; font-size:.95rem; line-height:1.65; color:var(--muted); margin-bottom:1rem; }
  .sc-hashtags { display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:.9rem; }
  .sc-hashtag { font-family:'JetBrains Mono',monospace; font-size:.55rem; letter-spacing:.08em; color:var(--ghost); background:var(--surface); border:1px solid var(--border); padding:2px 7px; border-radius:2px; }
  .sc-footer { display:flex; justify-content:space-between; align-items:center; padding-top:.8rem; border-top:1px solid var(--border); }
  .sc-engagement { display:flex; gap:1.2rem; font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); }
  .sc-date { font-family:'JetBrains Mono',monospace; font-size:.55rem; color:var(--ghost); }
  .sc-blog-link { font-family:'Syne',sans-serif; font-size:.58rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); background:var(--accent-dim); border:1px solid rgba(212,168,83,.25); padding:3px 10px; border-radius:1px; cursor:pointer; transition:all .2s; white-space:nowrap; }
  .sc-blog-link:hover { background:rgba(212,168,83,.25); }
  .social-featured { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid var(--border); background:var(--deep); }
  .sf-visual { padding:3rem; display:flex; align-items:center; justify-content:center; border-right:1px solid var(--border); font-size:6rem; background:linear-gradient(135deg,#1a2420,#080a09); position:relative; overflow:hidden; }
  .sf-content { padding:3rem; display:flex; flex-direction:column; justify-content:center; }
  .sf-badge { display:inline-flex; align-items:center; gap:.5rem; font-family:'JetBrains Mono',monospace; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; margin-bottom:1.2rem; }
  .sf-title { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600; line-height:1.2; margin-bottom:1rem; }
  .sf-text { font-size:.95rem; color:var(--muted); line-height:1.75; margin-bottom:1.5rem; font-family:'Cormorant Garamond',serif; }
  .sf-numbers { display:flex; gap:2rem; margin-bottom:1.5rem; }
  .sf-num-item { font-family:'JetBrains Mono',monospace; font-size:.6rem; color:var(--ghost); }
  .sf-num-item strong { display:block; font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; color:var(--text); }

  /* ── ABOUT ── */
  .about-hero { padding-top:60px; display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid var(--border); min-height:70vh; }
  .about-hero-left { padding:7rem 4rem 5rem; display:flex; flex-direction:column; justify-content:center; border-right:1px solid var(--border); }
  .about-hero-right { position:relative; overflow:hidden; background:linear-gradient(135deg,#101a14,#080a09); display:flex; align-items:center; justify-content:center; }
  .about-geo-bg { position:absolute; inset:0; color:var(--accent); opacity:.06; }
  .about-avatar-ring { width:260px; height:260px; border-radius:50%; border:1px solid var(--border-bright); display:flex; align-items:center; justify-content:center; position:relative; z-index:2; }
  .about-avatar-inner { width:220px; height:220px; border-radius:50%; background:linear-gradient(135deg,#1d2e28,#0d1a14); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:5rem; }
  .about-eyebrow { font-family:'JetBrains Mono',monospace; font-size:.62rem; letter-spacing:.22em; text-transform:uppercase; color:var(--accent); margin-bottom:1.2rem; display:flex; align-items:center; gap:.8rem; }
  .about-eyebrow::before { content:''; display:block; width:20px; height:1px; background:var(--accent); }
  .about-name { font-family:'Cormorant Garamond',serif; font-size:clamp(2.8rem,5vw,4.2rem); font-weight:300; line-height:1.05; margin-bottom:.4rem; }
  .about-name em { font-style:italic; color:var(--accent); }
  .about-role { font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); margin-bottom:2rem; }
  .about-bio { font-size:1rem; font-weight:300; color:var(--muted); line-height:1.85; max-width:42ch; margin-bottom:2.5rem; }
  .about-socials { display:flex; gap:1rem; }
  .social-pill { font-family:'JetBrains Mono',monospace; font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; background:var(--surface); color:var(--muted); border:1px solid var(--border); padding:.4rem 1rem; border-radius:20px; cursor:pointer; transition:all .2s; }
  .social-pill:hover { color:var(--accent); border-color:rgba(212,168,83,.3); }
  .about-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--deep); }
  .about-stat { padding:2rem 2.5rem; border-right:1px solid var(--border); }
  .about-stat:last-child { border-right:none; }
  .about-stat-num { font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:300; color:var(--text); line-height:1; margin-bottom:.3rem; }
  .about-stat-label { font-family:'JetBrains Mono',monospace; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ghost); }
  .about-body { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid var(--border); }
  .about-col { padding:4rem 3rem; border-right:1px solid var(--border); }
  .about-col:last-child { border-right:none; }
  .about-col-title { font-family:'Syne',sans-serif; font-size:.65rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); margin-bottom:2rem; }
  .philosophy-text { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:300; color:var(--muted); line-height:1.85; }
  .philosophy-text p { margin-bottom:1.4rem; }
  .philosophy-quote { font-style:italic; font-size:1.2rem; color:var(--text); border-left:2px solid var(--accent); padding-left:1.2rem; margin:2rem 0; line-height:1.6; }
  .gear-item { display:flex; justify-content:space-between; align-items:flex-start; padding:1rem 0; border-bottom:1px solid var(--border); gap:1rem; }
  .gear-item:last-child { border-bottom:none; }
  .gear-name { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; margin-bottom:.15rem; }
  .gear-desc { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); }
  .gear-cat { font-family:'JetBrains Mono',monospace; font-size:.56rem; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); background:var(--accent-dim); border:1px solid rgba(212,168,83,.2); padding:2px 8px; border-radius:2px; white-space:nowrap; }
  .places-list { display:grid; grid-template-columns:1fr 1fr; }
  .place-row { padding:.85rem 0; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:.8rem; }
  .place-flag { font-size:1.1rem; }
  .place-name { font-family:'Cormorant Garamond',serif; font-size:.95rem; font-weight:600; }
  .place-year { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); margin-left:auto; }

  /* ── ROUTES ── */
  .routes-page { padding-top:60px; }
  .routes-hero { padding:5rem 3rem 3rem; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:flex-end; gap:2rem; flex-wrap:wrap; }
  .route-table-header { display:grid; grid-template-columns:60px 1fr 180px 130px 130px 110px; background:var(--deep); border-bottom:1px solid var(--border); }
  .route-th { padding:.8rem 1.5rem; font-family:'Syne',sans-serif; font-size:.58rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--ghost); border-right:1px solid var(--border); }
  .route-th:last-child { border-right:none; }
  .route-row { display:grid; grid-template-columns:60px 1fr 180px 130px 130px 110px; align-items:center; border-bottom:1px solid var(--border); cursor:pointer; transition:background .2s; }
  .route-row:hover { background:var(--deep); }
  .route-row.active-row { background:var(--surface); border-left:2px solid var(--accent); }
  .route-row-num { padding:1.8rem 1.5rem; font-family:'JetBrains Mono',monospace; font-size:.62rem; color:var(--ghost); border-right:1px solid var(--border); text-align:center; }
  .route-row-main { padding:1.8rem 2rem; border-right:1px solid var(--border); }
  .route-row-title { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:600; margin-bottom:.25rem; }
  .route-row-sub { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); }
  .route-row-cell { padding:1.8rem 1.5rem; border-right:1px solid var(--border); font-family:'JetBrains Mono',monospace; font-size:.68rem; color:var(--muted); }
  .route-row-cell:last-child { border-right:none; }
  .route-live-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--pine); margin-right:.4rem; animation:livepulse 2s infinite; vertical-align:middle; }
  @keyframes livepulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  .route-detail-panel { border-top:2px solid var(--accent); background:var(--deep); animation:fadeIn .3s ease; }
  .route-detail-inner { display:grid; grid-template-columns:360px 1fr; min-height:580px; }
  .route-info-pane { border-right:1px solid var(--border); display:flex; flex-direction:column; overflow-y:auto; max-height:580px; }
  .route-info-pane::-webkit-scrollbar { width:4px; }
  .route-info-pane::-webkit-scrollbar-thumb { background:var(--ghost); border-radius:2px; }
  .route-info-header { padding:1.8rem 2rem; border-bottom:1px solid var(--border); background:var(--surface); position:sticky; top:0; z-index:5; }
  .route-mode-toggle { display:flex; border:1px solid var(--border); border-radius:2px; overflow:hidden; }
  .toggle-opt { flex:1; padding:.55rem .6rem; text-align:center; font-family:'Syne',sans-serif; font-size:.6rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; border:none; cursor:pointer; transition:all .2s; background:transparent; color:var(--ghost); }
  .toggle-opt.taken.active { background:var(--pine); color:white; }
  .toggle-opt.best.active { background:var(--accent); color:var(--void); }
  .toggle-opt.both.active { background:var(--sky); color:white; }
  .toggle-opt:hover:not(.active) { background:var(--raised); color:var(--muted); }
  .route-stats-grid { display:grid; grid-template-columns:1fr 1fr; }
  .rstat { padding:1.2rem 1.5rem; border-right:1px solid var(--border); border-bottom:1px solid var(--border); }
  .rstat:nth-child(2n) { border-right:none; }
  .rstat:nth-last-child(-n+2) { border-bottom:none; }
  .rstat-label { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ghost); margin-bottom:.3rem; }
  .rstat-val { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; line-height:1; }
  .rstat-delta { font-family:'JetBrains Mono',monospace; font-size:.58rem; margin-top:.2rem; }
  .rstat-delta.better { color:var(--pine); } .rstat-delta.worse { color:var(--rust); }
  .route-diff-banner { margin:1.2rem 1.5rem; background:rgba(74,140,106,.08); border-left:2px solid var(--pine); padding:.9rem 1rem; border-radius:0 2px 2px 0; }
  .route-diff-banner.negative { background:rgba(196,82,48,.08); border-left-color:var(--rust); }
  .route-diff-title { font-family:'Syne',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--pine); margin-bottom:.4rem; }
  .route-diff-banner.negative .route-diff-title { color:var(--rust); }
  .route-diff-text { font-size:.85rem; color:var(--muted); line-height:1.55; font-family:'Cormorant Garamond',serif; }
  .route-conditions { padding:1.5rem; border-top:1px solid var(--border); }
  .cond-title { font-family:'Syne',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ghost); margin-bottom:1rem; }
  .cond-item { display:flex; align-items:flex-start; gap:.7rem; margin-bottom:.8rem; font-size:.82rem; color:var(--muted); line-height:1.45; font-family:'Cormorant Garamond',serif; }
  .cond-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; margin-top:5px; }
  .waypoints-list { padding:1.5rem; border-top:1px solid var(--border); flex:1; }
  .wp-title { font-family:'Syne',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--ghost); margin-bottom:1rem; }
  .wp-item { display:flex; gap:.8rem; align-items:center; margin-bottom:.6rem; }
  .wp-badge { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:.55rem; font-weight:500; flex-shrink:0; }
  .wp-name { font-size:.88rem; font-family:'Cormorant Garamond',serif; }
  .wp-connector { width:1px; height:14px; background:var(--border); margin-left:10px; }
  .route-map-pane { position:relative; background:#090c0a; overflow:hidden; }
  .map-legend { position:absolute; bottom:1.5rem; left:1.5rem; z-index:10; background:rgba(8,10,9,.9); border:1px solid var(--border); padding:.8rem 1rem; border-radius:2px; backdrop-filter:blur(10px); }
  .legend-row { display:flex; align-items:center; gap:.7rem; margin-bottom:.5rem; font-family:'JetBrains Mono',monospace; font-size:.6rem; color:var(--muted); }
  .legend-row:last-child { margin-bottom:0; }
  .legend-swatch { width:28px; height:2px; border-radius:1px; }
  .map-savings-badge { position:absolute; top:1.5rem; right:1.5rem; z-index:10; background:rgba(8,10,9,.9); border:1px solid rgba(74,140,106,.3); padding:.7rem 1rem; border-radius:2px; backdrop-filter:blur(10px); font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); }
  .map-savings-val { font-size:1rem; color:var(--pine); margin-top:.15rem; font-weight:500; }

  /* ── DESTINATIONS ── */
  .destinations-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--border); }
  .dest-card { background:var(--void); padding:2rem 1.8rem; cursor:pointer; transition:background .2s; position:relative; overflow:hidden; min-height:220px; display:flex; flex-direction:column; justify-content:flex-end; }
  .dest-card:hover { background:var(--deep); }
  .dest-card-num { position:absolute; top:1.5rem; right:1.8rem; font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:300; color:var(--border-bright); line-height:1; }
  .dest-region { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); margin-bottom:.4rem; }
  .dest-name { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:600; margin-bottom:.4rem; line-height:1.2; }
  .dest-count { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); }

  /* ── WRITER ── */
  .writer-page { padding-top:60px; min-height:100vh; display:flex; flex-direction:column; }
  .writer-header { padding:3rem; border-bottom:1px solid var(--border); background:var(--deep); }
  .writer-label { font-family:'JetBrains Mono',monospace; font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); margin-bottom:.8rem; display:flex; align-items:center; gap:.8rem; }
  .ai-badge { background:var(--accent-dim); color:var(--accent); border:1px solid rgba(212,168,83,.25); border-radius:2px; padding:1px 8px; font-size:.58rem; letter-spacing:.1em; }
  .writer-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:300; }
  .writer-body { flex:1; display:grid; grid-template-columns:1fr 400px; overflow:hidden; height:calc(100vh - 180px); }
  .editor-pane { padding:3rem; border-right:1px solid var(--border); display:flex; flex-direction:column; gap:1.5rem; overflow-y:auto; }
  .editor-field-label { font-family:'Syne',sans-serif; font-size:.62rem; font-weight:600; letter-spacing:.15em; text-transform:uppercase; color:var(--ghost); margin-bottom:.5rem; }
  .editor-input { width:100%; background:var(--surface); border:1px solid var(--border); color:var(--text); font-family:'Cormorant Garamond',serif; border-radius:2px; padding:.8rem 1rem; font-size:1.1rem; transition:border-color .2s; outline:none; resize:none; }
  .editor-input:focus { border-color:var(--border-bright); }
  .editor-input.title { font-size:1.6rem; font-weight:600; }
  .editor-textarea { width:100%; background:var(--surface); border:1px solid var(--border); color:var(--text); font-family:'Cormorant Garamond',serif; border-radius:2px; padding:1rem; font-size:1rem; line-height:1.8; transition:border-color .2s; outline:none; resize:none; min-height:320px; }
  .editor-textarea:focus { border-color:var(--border-bright); }
  .editor-actions { display:flex; gap:1rem; }
  .btn-publish { font-family:'Syne',sans-serif; font-size:.7rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; background:var(--accent); color:var(--void); border:none; padding:.75rem 2rem; border-radius:1px; cursor:pointer; transition:all .2s; }
  .btn-publish:hover { background:#e0b860; }
  .btn-save { font-family:'Syne',sans-serif; font-size:.68rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; background:none; color:var(--muted); border:1px solid var(--border); padding:.75rem 1.5rem; border-radius:1px; cursor:pointer; transition:all .2s; }
  .btn-save:hover { color:var(--text); border-color:var(--border-bright); }
  .tag-row { display:flex; gap:.5rem; flex-wrap:wrap; }
  .tag-chip { font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; background:var(--raised); color:var(--muted); border:1px solid var(--border); padding:3px 10px; border-radius:2px; cursor:pointer; transition:all .2s; }
  .tag-chip.selected { background:var(--accent-dim); color:var(--accent); border-color:rgba(212,168,83,.3); }
  .ai-pane { display:flex; flex-direction:column; background:var(--deep); overflow:hidden; }
  .ai-pane-header { padding:1.5rem 2rem; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .ai-pane-title { font-family:'Syne',sans-serif; font-size:.7rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--text); display:flex; align-items:center; gap:.6rem; }
  .ai-status-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
  .ai-messages { flex:1; overflow-y:auto; padding:1.5rem; display:flex; flex-direction:column; gap:1.2rem; }
  .ai-messages::-webkit-scrollbar { width:4px; }
  .ai-messages::-webkit-scrollbar-thumb { background:var(--ghost); border-radius:2px; }
  .msg { display:flex; gap:.8rem; align-items:flex-start; }
  .msg.user { flex-direction:row-reverse; }
  .msg-avatar { width:28px; height:28px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.65rem; font-family:'JetBrains Mono',monospace; }
  .msg-avatar.ai { background:var(--accent-dim); color:var(--accent); border:1px solid rgba(212,168,83,.2); }
  .msg-avatar.user { background:var(--raised); color:var(--muted); border:1px solid var(--border); }
  .msg-bubble { max-width:82%; padding:.85rem 1rem; border-radius:2px; font-size:.88rem; line-height:1.65; }
  .msg.ai .msg-bubble { background:var(--surface); border:1px solid var(--border); color:var(--text); font-family:'Cormorant Garamond',serif; }
  .msg.user .msg-bubble { background:var(--accent-dim); border:1px solid rgba(212,168,83,.2); color:var(--text); font-family:'Cormorant Garamond',serif; }
  .msg-bubble strong { color:var(--accent); }
  .insert-btn { margin-top:.6rem; font-family:'Syne',sans-serif; font-size:.6rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; background:none; color:var(--accent); border:1px solid rgba(212,168,83,.3); padding:3px 10px; border-radius:1px; cursor:pointer; transition:all .2s; }
  .insert-btn:hover { background:var(--accent-dim); }
  .ai-typing { display:flex; gap:4px; padding:.85rem 1rem; background:var(--surface); border:1px solid var(--border); border-radius:2px; width:fit-content; }
  .ai-typing span { width:5px; height:5px; border-radius:50%; background:var(--accent); animation:typing-dot 1.2s infinite; }
  .ai-typing span:nth-child(2) { animation-delay:.2s; }
  .ai-typing span:nth-child(3) { animation-delay:.4s; }
  @keyframes typing-dot { 0%,60%,100%{opacity:.2;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }
  .ai-prompts { padding:1rem 1.5rem; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:.5rem; }
  .ai-prompts-label { font-family:'Syne',sans-serif; font-size:.58rem; font-weight:600; letter-spacing:.15em; text-transform:uppercase; color:var(--ghost); margin-bottom:.3rem; }
  .quick-prompt { font-family:'Cormorant Garamond',serif; font-size:.85rem; color:var(--muted); background:var(--surface); border:1px solid var(--border); padding:.5rem .9rem; border-radius:2px; cursor:pointer; text-align:left; transition:all .2s; }
  .quick-prompt:hover { color:var(--text); border-color:var(--border-bright); background:var(--raised); }
  .ai-input-row { padding:1.2rem 1.5rem; border-top:1px solid var(--border); display:flex; gap:.6rem; align-items:flex-end; background:var(--void); }
  .ai-input { flex:1; background:var(--surface); border:1px solid var(--border); color:var(--text); font-family:'Cormorant Garamond',serif; border-radius:2px; padding:.7rem .9rem; font-size:.95rem; outline:none; resize:none; max-height:120px; transition:border-color .2s; line-height:1.5; }
  .ai-input:focus { border-color:var(--border-bright); }
  .ai-send-btn { width:36px; height:36px; background:var(--accent); border:none; border-radius:1px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0; }
  .ai-send-btn:hover { background:#e0b860; }
  .ai-send-btn:disabled { background:var(--ghost); cursor:not-allowed; }

  /* ── FOOTER ── */
  .footer { border-top:1px solid var(--border); padding:3rem; display:grid; grid-template-columns:1fr 1fr 1fr; gap:2rem; background:var(--deep); }
  .footer-brand { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:300; letter-spacing:.1em; color:var(--text); margin-bottom:.5rem; }
  .footer-tagline { font-size:.82rem; color:var(--ghost); max-width:28ch; line-height:1.6; }
  .footer-col-title { font-family:'Syne',sans-serif; font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--ghost); margin-bottom:1rem; }
  .footer-link { font-size:.88rem; color:var(--muted); display:block; margin-bottom:.5rem; cursor:pointer; transition:color .2s; }
  .footer-link:hover { color:var(--text); }
  .footer-bottom { border-top:1px solid var(--border); padding:1.5rem 3rem; display:flex; justify-content:space-between; background:var(--deep); }
  .footer-copy { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--ghost); letter-spacing:.1em; }

  @media(max-width:900px){
    .hero,.about-hero,.about-body,.social-featured,.route-detail-inner { grid-template-columns:1fr; }
    .hero-right,.about-hero-right { display:none; }
    .posts-grid { grid-template-columns:1fr; }
    .writer-body { grid-template-columns:1fr; }
    .ai-pane { display:none; }
    .destinations-grid,.about-stats-bar,.social-feed { grid-template-columns:1fr 1fr; }
    .journal-grid { columns:2; }
    .topbar { padding:0 1.5rem; }
    .topbar-nav { gap:1rem; }
    .route-table-header,.route-row { grid-template-columns:40px 1fr 110px; }
    .route-th:nth-child(n+4),.route-row-cell:nth-child(n+4) { display:none; }
  }
`;

// ─── GEO SVG ──────────────────────────────────────────────────────────────────
function GeoSVG() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <circle cx="300" cy="300" r="110" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      <line x1="50" y1="300" x2="550" y2="300" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="300" y1="50" x2="300" y2="550" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="120" y1="120" x2="480" y2="480" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="480" y1="120" x2="120" y2="480" stroke="currentColor" strokeWidth="0.5"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const r = a * Math.PI / 180;
        return <line key={a} x1={300+250*Math.cos(r)} y1={300+250*Math.sin(r)} x2={300+180*Math.cos(r)} y2={300+180*Math.sin(r)} stroke="currentColor" strokeWidth="0.5"/>;
      })}
      <polygon points="300,80 520,420 80,420" stroke="currentColor" strokeWidth="0.5" fill="none"/>
    </svg>
  );
}

// ─── ROUTE MAP SVG ────────────────────────────────────────────────────────────
function RouteMapSVG({ route, mode }) {
  const showTaken = mode === "taken" || mode === "both";
  const showBest  = mode === "best"  || mode === "both";
  return (
    <svg viewBox="0 0 380 420" style={{width:"100%",height:"100%",background:"#090c0a"}}>
      {[80,160,240,320].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>)}
      {[80,160,240,320,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>)}
      <path d="M 0 400 C 60 380 100 350 150 300 C 190 260 230 210 280 160 C 320 118 355 80 380 50 L 380 420 Z" fill="rgba(255,255,255,0.015)"/>
      {showTaken && <>
        <path d={route.paths.taken} stroke="rgba(74,140,106,0.2)" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d={route.paths.taken} stroke="#4a8c6a" strokeWidth={mode==="both"?2.5:3} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={mode==="both"?0.65:0.9}/>
      </>}
      {showBest && <>
        <path d={route.paths.best} stroke="rgba(212,168,83,0.18)" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d={route.paths.best} stroke="#d4a853" strokeWidth={mode==="both"?2.5:3} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={mode==="both"?0.85:0.95}/>
      </>}
      {route.pois.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="12" fill={p.type==="start"?"rgba(74,140,106,0.12)":p.type==="peak"?"rgba(212,168,83,0.12)":"rgba(255,255,255,0.04)"}/>
          <circle cx={p.x} cy={p.y} r={p.type==="start"||p.type==="peak"?5:3.5} fill={p.type==="start"?"#4a8c6a":p.type==="peak"?"#d4a853":"#4a504d"} stroke="#090c0a" strokeWidth="1.5"/>
          <text x={p.x+9} y={p.y+4} fontSize="7" fontFamily="JetBrains Mono,monospace" fill="rgba(232,228,220,0.65)" style={{userSelect:"none"}}>{p.label}</text>
        </g>
      ))}
      <text x={route.pois[0].x} y={route.pois[0].y+20} fontSize="6" fontFamily="JetBrains Mono,monospace" fill="#4a8c6a" textAnchor="middle">START</text>
    </svg>
  );
}

// ─── ROUTE DETAIL PANEL ───────────────────────────────────────────────────────
function RouteDetailPanel({ route, onClose }) {
  const [mode, setMode] = useState("taken");
  const data = mode === "best" ? route.best : route.taken;
  const isBetter = route.diff.time.startsWith("−") || route.diff.distance.startsWith("−");
  return (
    <div className="route-detail-panel">
      <div className="route-detail-inner">
        <div className="route-info-pane">
          <div className="route-info-header">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem"}}>
              <div>
                <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--accent)",marginBottom:".3rem"}}>{route.mode} · {route.region}</div>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.2rem",fontWeight:600,lineHeight:1.2}}>{route.title}</div>
              </div>
              <button onClick={onClose} style={{background:"none",border:"1px solid var(--border)",color:"var(--ghost)",cursor:"pointer",width:28,height:28,borderRadius:"2px",fontSize:".8rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
            </div>
            <div className="route-mode-toggle">
              <button className={`toggle-opt taken ${mode==="taken"?"active":""}`} onClick={()=>setMode("taken")}>Route Taken</button>
              <button className={`toggle-opt best ${mode==="best"?"active":""}`} onClick={()=>setMode("best")}>Best Route</button>
              <button className={`toggle-opt both ${mode==="both"?"active":""}`} onClick={()=>setMode("both")}>Compare Both</button>
            </div>
          </div>
          <div className="route-stats-grid">
            <div className="rstat"><div className="rstat-label">Distance</div><div className="rstat-val" style={{color:mode==="best"?"var(--accent)":"var(--text)"}}>{data.distance}</div>{mode==="best"&&<div className={`rstat-delta ${isBetter?"better":"worse"}`}>{route.diff.distance} vs taken</div>}</div>
            <div className="rstat"><div className="rstat-label">Duration</div><div className="rstat-val" style={{color:mode==="best"?"var(--accent)":"var(--text)"}}>{data.duration}</div>{mode==="best"&&<div className={`rstat-delta ${isBetter?"better":"worse"}`}>{route.diff.time} vs taken</div>}</div>
            <div className="rstat"><div className="rstat-label">Elevation</div><div className="rstat-val" style={{fontSize:"1.1rem"}}>{data.elevation}</div></div>
            <div className="rstat"><div className="rstat-label">Waypoints</div><div className="rstat-val">{data.waypoints.length}</div></div>
          </div>
          {(mode==="best"||mode==="both")&&<div className={`route-diff-banner ${!isBetter?"negative":""}`}><div className="route-diff-title">{isBetter?"✦ Smarter path available":"⚠ Longer but worthwhile"}</div><div className="route-diff-text">{route.diff.note}</div></div>}
          <div className="route-conditions"><div className="cond-title">Current Conditions</div>{route.conditions.map((c,i)=><div key={i} className="cond-item"><div className="cond-dot" style={{background:c.color}}/><span>{c.text}</span></div>)}</div>
          <div className="waypoints-list">
            <div className="wp-title">{mode==="taken"?"Waypoints — as walked":mode==="best"?"Waypoints — optimised":"All waypoints"}</div>
            {data.waypoints.map((w,i)=>(
              <div key={i}>
                <div className="wp-item">
                  <div className="wp-badge" style={{background:i===0?"var(--pine-dim)":i===data.waypoints.length-1?"var(--accent-dim)":"var(--raised)",color:i===0?"var(--pine)":i===data.waypoints.length-1?"var(--accent)":"var(--ghost)",border:`1px solid ${i===0?"rgba(74,140,106,.3)":i===data.waypoints.length-1?"rgba(212,168,83,.3)":"var(--border)"}`}}>
                    {i===0?"S":i===data.waypoints.length-1?"E":i}
                  </div>
                  <div className="wp-name">{w}</div>
                </div>
                {i<data.waypoints.length-1&&<div className="wp-connector"/>}
              </div>
            ))}
          </div>
        </div>
        <div className="route-map-pane">
          <RouteMapSVG route={route} mode={mode}/>
          <div className="map-legend">
            {(mode==="taken"||mode==="both")&&<div className="legend-row"><div className="legend-swatch" style={{background:"#4a8c6a"}}/><span>Route Taken</span></div>}
            {(mode==="best"||mode==="both")&&<div className="legend-row"><div className="legend-swatch" style={{background:"#d4a853"}}/><span>Current Best Route</span></div>}
          </div>
          {mode!=="taken"&&<div className="map-savings-badge"><div>Best route saves</div><div className="map-savings-val">{route.diff.time} · {route.diff.distance}</div></div>}
        </div>
      </div>
    </div>
  );
}

// ─── AI HOOK ──────────────────────────────────────────────────────────────────
function useAI(editorContent) {
  const [messages, setMessages] = useState([{ role:"ai", text:"Welcome to your **AI writing partner**. I'm here to help you craft immersive travel stories — from atmospheric openings to evocative sensory details.", insertable:false }]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}) }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMessages(p => [...p, { role:"user", text }]);
    setInputVal("");
    setLoading(true);
    try {
      const sys = `You are an elite travel writing assistant for "Meridian," a dark editorial travel magazine. Your style echoes Bruce Chatwin, Ryszard Kapuściński, and Colin Thubron — precise, evocative, literary. Current draft: "${editorContent.slice(0,400)}..."`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:sys, messages:[...messages.filter((_,i)=>i>0).map(m=>({role:m.role==="ai"?"assistant":"user",content:m.text})),{role:"user",content:text}] })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Error — please retry.";
      setMessages(p => [...p, { role:"ai", text:reply, insertable:reply.length>120&&/write|paragraph|opening|blockquote|title|suggest|draft/i.test(text), rawText:reply }]);
    } catch {
      setMessages(p => [...p, { role:"ai", text:"Connection issue. Please try again.", insertable:false }]);
    }
    setLoading(false);
  };
  return { messages, inputVal, setInputVal, loading, send, endRef };
}

// ─── PHOTO JOURNAL PAGE ───────────────────────────────────────────────────────
function JournalPage({ onNav }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const filters = ["All", ...Array.from(new Set(PHOTOS.map(p => p.tag)))];
  const filtered = activeFilter === "All" ? PHOTOS : PHOTOS.filter(p => p.tag === activeFilter);

  useEffect(() => {
    const handle = (e) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") setLightboxIdx(i => i > 0 ? i-1 : filtered.length-1);
      if (e.key === "ArrowRight") setLightboxIdx(i => i < filtered.length-1 ? i+1 : 0);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [lightboxIdx, filtered.length]);

  return (
    <div className="journal-page page">
      <div className="journal-hero">
        <div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem"}}><span style={{display:"block",width:20,height:1,background:"var(--accent)"}}/>Photo Journal</div>
          <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2.2rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.05,marginBottom:".8rem"}}>The frames that don't make it <em style={{color:"var(--accent)",fontStyle:"italic"}}>into the story.</em></h1>
          <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",color:"var(--muted)",maxWidth:"48ch",lineHeight:1.8}}>Raw photographs from the field. Every trip produces hundreds of images that inform the writing but never appear in print. These are the ones I keep anyway.</p>
        </div>
        <div className="journal-filters">
          {filters.map(f => <button key={f} className={`filter-chip ${activeFilter===f?"active":""}`} onClick={()=>setActiveFilter(f)}>{f}</button>)}
        </div>
      </div>
      <div style={{padding:"3px",background:"var(--void)"}}>
        <div className="journal-grid">
          {filtered.map((photo, i) => (
            <div key={photo.id} className="journal-item" onClick={()=>setLightboxIdx(i)}>
              <div className="journal-img-el" style={{background:photo.bg,height:photo.tall?"420px":"260px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <span style={{fontSize:photo.tall?"6rem":"4rem",filter:"drop-shadow(0 4px 20px rgba(0,0,0,.5))"}}>{photo.emoji}</span>
                <div className="journal-overlay">
                  <div className="journal-overlay-tag">{photo.tag} · {photo.date}</div>
                  <div className="journal-overlay-title">{photo.title}</div>
                  <div className="journal-overlay-meta"><span>{photo.location}</span><span>{photo.meta}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <div className="lightbox" onClick={()=>setLightboxIdx(null)}>
          <div className="lightbox-inner" onClick={e=>e.stopPropagation()}>
            <button className="lightbox-close" onClick={()=>setLightboxIdx(null)}>✕ Close</button>
            <div style={{background:filtered[lightboxIdx].bg,borderRadius:"1px",height:"520px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8rem",position:"relative"}}>
              <span style={{filter:"drop-shadow(0 8px 40px rgba(0,0,0,.6))"}}>{filtered[lightboxIdx].emoji}</span>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.5rem",background:"linear-gradient(to top,rgba(0,0,0,.8),transparent)"}}>
                <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--accent)",marginBottom:".4rem"}}>{filtered[lightboxIdx].tag}</div>
              </div>
            </div>
            <div className="lightbox-meta">
              <div><div className="lightbox-title">{filtered[lightboxIdx].title}</div><div style={{fontFamily:"Cormorant Garamond,serif",fontSize:".9rem",color:"var(--muted)",marginTop:".3rem"}}>{filtered[lightboxIdx].location}</div></div>
              <div className="lightbox-info"><div>{filtered[lightboxIdx].meta}</div><div>{filtered[lightboxIdx].date}</div></div>
            </div>
            <div className="lightbox-nav">
              <button className="lnav-btn" onClick={()=>setLightboxIdx(i=>i>0?i-1:filtered.length-1)}>← Prev</button>
              <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",color:"var(--ghost)",padding:".5rem 1rem"}}>{lightboxIdx+1} / {filtered.length}</span>
              <button className="lnav-btn" onClick={()=>setLightboxIdx(i=>i<filtered.length-1?i+1:0)}>Next →</button>
            </div>
          </div>
        </div>
      )}
      <div style={{padding:"3rem",borderTop:"1px solid var(--border)",background:"var(--deep)",display:"flex",gap:"1.5rem",alignItems:"center"}}>
        <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",color:"var(--muted)",maxWidth:"52ch",lineHeight:1.7}}>All photographs shot on a Sony A7 IV. No presets, no AI upscaling. RAW files processed in Lightroom, exported at full resolution.</div>
        <div style={{marginLeft:"auto",display:"flex",gap:"1rem",flexShrink:0}}>
          <button className="btn-ghost" onClick={()=>onNav("home")}>Read the stories</button>
          <button className="btn-gold" onClick={()=>onNav("social")}>From social</button>
        </div>
      </div>
    </div>
  );
}

// ─── SOCIAL PAGE ─────────────────────────────────────────────────────────────
function SocialPage({ onOpenPost }) {
  const [platform, setPlatform] = useState("all");
  const filtered = platform === "all" ? SOCIAL_POSTS : SOCIAL_POSTS.filter(p => p.platform === platform);
  const featured = SOCIAL_POSTS.find(p => p.featured);
  const platformColors = { ig:"var(--ig)", tw:"var(--tw)", yt:"var(--yt)" };
  const platformLabels = { ig:"Instagram", tw:"Twitter / X", yt:"YouTube" };
  const platformIcons  = { ig:"📸", tw:"🐦", yt:"▶" };

  return (
    <div className="social-page page">
      <div className="social-hero">
        <div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem"}}><span style={{display:"block",width:20,height:1,background:"var(--accent)"}}/>From the Feeds</div>
          <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2.2rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.05,marginBottom:".8rem"}}>The stories that live<br/><em style={{color:"var(--accent)",fontStyle:"italic"}}>between the dispatches.</em></h1>
          <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",color:"var(--muted)",maxWidth:"44ch",lineHeight:1.8}}>Notes, behind-the-scenes frames, and raw observations posted across platforms — linked to the full stories they inspired.</p>
        </div>
        <div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"var(--ghost)",marginBottom:".8rem"}}>Filter by platform</div>
          <div className="social-platform-tabs">
            <button className={`platform-tab ${platform==="all"?"active all":""}`} onClick={()=>setPlatform("all")}>All</button>
            <button className={`platform-tab ${platform==="ig"?"active ig":""}`} onClick={()=>setPlatform("ig")}>📸 Instagram</button>
            <button className={`platform-tab ${platform==="tw"?"active tw":""}`} onClick={()=>setPlatform("tw")}>𝕏 Twitter</button>
            <button className={`platform-tab ${platform==="yt"?"active yt":""}`} onClick={()=>setPlatform("yt")}>▶ YouTube</button>
          </div>
        </div>
      </div>
      <div className="social-stats-bar">
        {[{icon:"📸",val:"42.8K",label:"Instagram Followers"},{icon:"𝕏",val:"18.4K",label:"Twitter Followers"},{icon:"▶",val:"31.2K",label:"YouTube Subscribers"},{icon:"❤️",val:"820K",label:"Total Engagements"}].map(s=>(
          <div key={s.label} className="social-stat">
            <div className="social-stat-icon">{s.icon}</div>
            <div><div className="social-stat-val">{s.val}</div><div className="social-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>
      {featured && (platform==="all"||platform===featured.platform) && (
        <div className="social-featured">
          <div className="sf-visual" style={{background:featured.bg}}>
            <div style={{position:"absolute",inset:0,color:"var(--accent)",opacity:.06}}><GeoSVG/></div>
            <span style={{position:"relative",zIndex:2,fontSize:"8rem",filter:"drop-shadow(0 8px 40px rgba(0,0,0,.6))"}}>{featured.emoji}</span>
          </div>
          <div className="sf-content">
            <div className="sf-badge" style={{color:platformColors[featured.platform]}}><span>{platformIcons[featured.platform]}</span><span>{platformLabels[featured.platform]}</span><span style={{color:"var(--ghost)",marginLeft:".3rem"}}>· Top post</span></div>
            <div className="sf-title">"{featured.text.slice(0,80)}…"</div>
            <div className="sf-text">{featured.text}</div>
            <div className="sf-numbers"><div className="sf-num-item"><strong>{featured.likes}</strong>Likes</div><div className="sf-num-item"><strong>{featured.comments}</strong>Comments</div></div>
            <div style={{display:"flex",gap:".8rem",flexWrap:"wrap"}}>{featured.hashtags.map(h=><span key={h} className="sc-hashtag">{h}</span>)}</div>
            <div style={{marginTop:"1.5rem"}}><button className="btn-gold" onClick={()=>onOpenPost(POSTS.find(p=>p.id===featured.linkedPost))}>Read the full dispatch</button></div>
          </div>
        </div>
      )}
      <div className="social-feed">
        {filtered.map(post=>(
          <div key={post.id} className="social-card">
            <div className="sc-media-wrap">
              <div className="sc-media" style={{background:post.bg}}>{post.emoji}</div>
              <div className={`sc-platform-badge ${post.platform}`}>{platformIcons[post.platform]}</div>
            </div>
            <div className="sc-body">
              <div className={`sc-handle ${post.platform}`}>{platformIcons[post.platform]} {post.handle}</div>
              <div className="sc-text">{post.text.length>140?post.text.slice(0,140)+"…":post.text}</div>
              <div className="sc-hashtags">{post.hashtags.map(h=><span key={h} className="sc-hashtag">{h}</span>)}</div>
              <div className="sc-footer">
                <div className="sc-engagement"><span>❤ {post.likes}</span><span>💬 {post.comments}</span></div>
                <div style={{display:"flex",gap:".5rem",alignItems:"center"}}>
                  <span className="sc-date">{post.date}</span>
                  <button className="sc-blog-link" onClick={()=>onOpenPost(POSTS.find(p=>p.id===post.linkedPost))}>Read post →</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"2.5rem 3rem",borderTop:"1px solid var(--border)",background:"var(--deep)",fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",color:"var(--ghost)"}}>
        Social metrics shown are illustrative. Each post links to the full Meridian dispatch that inspired it.
      </div>
    </div>
  );
}

// ─── ABOUT ME PAGE ────────────────────────────────────────────────────────────
function AboutPage({ onNav }) {
  const gear = [
    { name:"Sony A7 IV",         desc:"Primary body — mirrorless, 33MP",  cat:"Camera"  },
    { name:"24–70mm f/2.8 GM",   desc:"My one-lens compromise",           cat:"Lens"    },
    { name:"Osprey Aether 65",   desc:"For anything over 5 nights",       cat:"Pack"    },
    { name:"Garmin inReach Mini 2", desc:"Satellite comms off-grid",      cat:"Safety"  },
    { name:"Moleskine Cahier",   desc:"Notes before they evaporate",      cat:"Writing" },
    { name:"MacBook Air M3",     desc:"Edit anywhere. Needs no fan.",      cat:"Tech"    },
  ];
  const places = [
    {flag:"🇦🇷",name:"Patagonia",year:"2025"},{flag:"🇯🇵",name:"Kyoto",year:"2025"},
    {flag:"🇲🇦",name:"Fes",year:"2025"},{flag:"🇮🇸",name:"Iceland",year:"2024"},
    {flag:"🇮🇳",name:"Old Delhi",year:"2024"},{flag:"🇪🇹",name:"Addis Ababa",year:"2024"},
    {flag:"🇻🇳",name:"Hanoi",year:"2023"},{flag:"🇵🇹",name:"Lisbon",year:"2023"},
    {flag:"🇵🇪",name:"Cusco",year:"2023"},{flag:"🇬🇪",name:"Tbilisi",year:"2022"},
  ];
  return (
    <div className="page">
      <div className="about-hero">
        <div className="about-hero-left">
          <div className="about-eyebrow">The Writer</div>
          <h1 className="about-name">Siddharth <em>Mehrotra</em></h1>
          <div className="about-role">Travel Writer · Photographer · Founder, Meridian</div>
          <p className="about-bio">I left a career in architecture in 2019 to write about places that resist easy description. Slowly, on foot where possible, with a camera that's too heavy and a notebook that fills up too fast.<br/><br/>I'm interested in the gap between what a place looks like in photographs and what it feels like at 6am when the generators haven't started yet.</p>
          <div className="about-socials">{["Instagram","Twitter / X","Newsletter","Contact"].map(s=><span key={s} className="social-pill">{s}</span>)}</div>
        </div>
        <div className="about-hero-right">
          <div className="about-geo-bg"><GeoSVG/></div>
          <div style={{position:"relative",zIndex:2}}><div className="about-avatar-ring"><div className="about-avatar-inner">🧭</div></div></div>
        </div>
      </div>
      <div className="about-stats-bar">
        {[["38+","Countries Visited"],["6 yr","Writing Full-Time"],["120+","Published Dispatches"],["0","Sponsored Posts"]].map(([n,l])=>(
          <div key={l} className="about-stat"><div className="about-stat-num" style={{fontSize:n.length>4?"2rem":"3rem"}}>{n}</div><div className="about-stat-label">{l}</div></div>
        ))}
      </div>
      <div className="about-body">
        <div className="about-col">
          <div className="about-col-title">Philosophy</div>
          <div className="philosophy-text">
            <p>I started Meridian because I got tired of travel writing that was, at its core, a form of real estate marketing. Most of what gets published is designed to make you want to go somewhere — which means it has a commercial motive dressed up as curiosity.</p>
            <div className="philosophy-quote">"The job of the travel writer is not to sell the destination but to account for it honestly — including the parts that are tedious, ugly, or difficult to explain."</div>
            <p>I've been wrong about places. I've been changed by places. Both are worth writing about. Every story in Meridian goes through the same editorial question: does this need to exist?</p>
          </div>
        </div>
        <div className="about-col">
          <div className="about-col-title">What I Carry</div>
          <div>{gear.map(g=><div key={g.name} className="gear-item"><div><div className="gear-name">{g.name}</div><div className="gear-desc">{g.desc}</div></div><div className="gear-cat">{g.cat}</div></div>)}</div>
          <div className="about-col-title" style={{marginTop:"2.5rem",marginBottom:"1.2rem"}}>Recent Travels</div>
          <div className="places-list">{places.map(p=><div key={p.name} className="place-row"><span className="place-flag">{p.flag}</span><span className="place-name">{p.name}</span><span className="place-year">{p.year}</span></div>)}</div>
        </div>
      </div>
      <div style={{padding:"3.5rem 3rem",display:"flex",gap:"1.5rem",borderTop:"1px solid var(--border)",background:"var(--deep)"}}>
        <button className="btn-gold" onClick={()=>onNav("write")}>Write for Meridian</button>
        <button className="btn-ghost" onClick={()=>onNav("routes")}>View my routes</button>
      </div>
    </div>
  );
}

// ─── ROUTES PAGE ──────────────────────────────────────────────────────────────
function RoutesPage() {
  const [activeRoute, setActiveRoute] = useState(null);
  return (
    <div className="routes-page page">
      <div className="routes-hero">
        <div>
          <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem"}}><span style={{display:"block",width:20,height:1,background:"var(--accent)"}}/>Route Archive</div>
          <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2.2rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.05,marginBottom:"1rem"}}>Every path taken.<br/><em style={{color:"var(--accent)",fontStyle:"italic"}}>And the better ones.</em></h1>
          <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",color:"var(--muted)",maxWidth:"44ch",lineHeight:1.8}}>Each route shows the path I actually walked — and the current best alternative based on live trail data and conditions.</p>
        </div>
        <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",color:"var(--ghost)",textAlign:"right",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".5rem",justifyContent:"flex-end"}}><div style={{width:22,height:2,background:"#4a8c6a",borderRadius:1}}/>Route Taken</div>
          <div style={{display:"flex",alignItems:"center",gap:".6rem",justifyContent:"flex-end"}}><div style={{width:22,height:2,background:"#d4a853",borderRadius:1}}/>Current Best</div>
        </div>
      </div>
      <div className="route-table-header">
        {["#","Route","Region","Distance","Duration","Mode"].map((h,i)=><div key={h} className="route-th" style={{borderRight:i<5?undefined:"none"}}>{h}</div>)}
      </div>
      {ROUTES.map(route=>(
        <div key={route.id}>
          <div className={`route-row ${activeRoute?.id===route.id?"active-row":""}`} onClick={()=>setActiveRoute(p=>p?.id===route.id?null:route)}>
            <div className="route-row-num">{route.num}</div>
            <div className="route-row-main"><div className="route-row-title">{route.title}</div><div className="route-row-sub">{route.date} · Click to compare routes</div></div>
            <div className="route-row-cell">{route.region}</div>
            <div className="route-row-cell"><div>{route.taken.distance}</div><div style={{color:"var(--accent)",marginTop:".2rem",fontSize:".62rem"}}>{route.best.distance} best</div></div>
            <div className="route-row-cell"><div>{route.taken.duration}</div><div style={{color:"var(--pine)",marginTop:".2rem",fontSize:".6rem"}}>{route.diff.time}</div></div>
            <div className="route-row-cell" style={{borderRight:"none"}}><div>{route.mode}</div>{route.live&&<div style={{marginTop:".3rem"}}><span className="route-live-dot"/>Live</div>}</div>
          </div>
          {activeRoute?.id===route.id&&<RouteDetailPanel route={route} onClose={()=>setActiveRoute(null)}/>}
        </div>
      ))}
      <div style={{padding:"2.5rem 3rem",borderTop:"1px solid var(--border)",background:"var(--deep)",display:"flex",gap:"2rem",alignItems:"center"}}>
        <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:".95rem",color:"var(--muted)",maxWidth:"52ch",lineHeight:1.7}}>Route data sourced from Mapbox Traffic, CONAF trail conditions (Patagonia), Kyoto Municipal Tourism, and Morocco ONT.</p>
        <div style={{marginLeft:"auto",fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",color:"var(--ghost)",textAlign:"right",flexShrink:0}}><div>Last updated</div><div style={{color:"var(--accent)",marginTop:".2rem"}}>Apr 22, 2025</div></div>
      </div>
    </div>
  );
}

// ─── WRITER PAGE ──────────────────────────────────────────────────────────────
function WriterPage() {
  const [title, setTitle] = useState("");
  const [body, setBody]   = useState("");
  const [selTags, setSelTags] = useState([]);
  const [pub, setPub] = useState(false);
  const tags = ["Adventure","Culture","Food","Photography","Solo Travel","Budget","Luxury","Trekking","Cities","Islands"];
  const ai = useAI(body);
  const toggleTag = (t) => setSelTags(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
  const insertText = (t) => setBody(p => p + (p?"\n\n":"") + t);

  if (pub) return (
    <div className="page" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 60px)",flexDirection:"column",gap:"1.5rem",padding:"2rem",textAlign:"center"}}>
      <div style={{fontSize:"3rem"}}>✦</div>
      <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2.5rem",fontWeight:300}}>Dispatch published.</h2>
      <p style={{color:"var(--muted)",maxWidth:"36ch",fontFamily:"Cormorant Garamond,serif",fontSize:"1.1rem"}}>Your story has been sent into the world. The best ones always find their readers.</p>
    </div>
  );

  return (
    <div className="writer-page page">
      <div className="writer-header">
        <div className="writer-label"><span>New Dispatch</span><span className="ai-badge">AI ASSISTED</span></div>
        <h1 className="writer-title">Compose your story</h1>
      </div>
      <div className="writer-body">
        <div className="editor-pane">
          <div><div className="editor-field-label">Title</div><input className="editor-input title" placeholder="Give your dispatch a name…" value={title} onChange={e=>setTitle(e.target.value)}/></div>
          <div><div className="editor-field-label">Tags</div><div className="tag-row">{tags.map(t=><span key={t} className={`tag-chip ${selTags.includes(t)?"selected":""}`} onClick={()=>toggleTag(t)}>{t}</span>)}</div></div>
          <div style={{flex:1}}><div className="editor-field-label">Body</div><textarea className="editor-textarea" placeholder="Begin your story here…" value={body} onChange={e=>setBody(e.target.value)} style={{minHeight:"380px"}}/></div>
          <div className="editor-actions">
            <button className="btn-publish" onClick={()=>{if(title&&body)setPub(true)}}>Publish dispatch</button>
            <button className="btn-save">Save draft</button>
          </div>
        </div>
        <div className="ai-pane">
          <div className="ai-pane-header">
            <div className="ai-pane-title"><div className="ai-status-dot"/>Writing Assistant</div>
            <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:".58rem",color:"var(--ghost)"}}>Meridian AI</span>
          </div>
          <div className="ai-messages">
            {ai.messages.map((msg,i)=>(
              <div key={i} className={`msg ${msg.role}`}>
                <div className={`msg-avatar ${msg.role}`}>{msg.role==="ai"?"M":"You"}</div>
                <div>
                  <div className="msg-bubble" dangerouslySetInnerHTML={{__html:msg.text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>")}}/>
                  {msg.insertable&&<button className="insert-btn" onClick={()=>insertText(msg.rawText)}>↑ Insert into draft</button>}
                </div>
              </div>
            ))}
            {ai.loading&&<div className="msg ai"><div className="msg-avatar ai">M</div><div className="ai-typing"><span/><span/><span/></div></div>}
            <div ref={ai.endRef}/>
          </div>
          <div className="ai-prompts">
            <div className="ai-prompts-label">Quick prompts</div>
            {QUICK_PROMPTS.map((p,i)=><button key={i} className="quick-prompt" onClick={()=>ai.send(p)}>{p}</button>)}
          </div>
          <div className="ai-input-row">
            <textarea className="ai-input" rows={1} placeholder="Ask your writing assistant…" value={ai.inputVal} onChange={e=>ai.setInputVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ai.send(ai.inputVal)}}}/>
            <button className="ai-send-btn" onClick={()=>ai.send(ai.inputVal)} disabled={ai.loading||!ai.inputVal.trim()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── POST COMPONENTS ──────────────────────────────────────────────────────────
function PostCard({ post, featured, onClick }) {
  return (
    <div className={`post-cell ${featured?"featured":""}`} onClick={onClick}>
      <div className="post-cell-bg" style={{background:post.gradient}}/>
      <div className="post-cell-inner">
        <div className="cell-tag">{post.tag}</div>
        <div className="cell-title">{post.title}</div>
        {featured&&<div className="cell-excerpt">{post.excerpt}</div>}
        <div className="cell-meta"><span>{post.author}</span><span>{post.date}</span><span>{post.readTime}</span></div>
        {featured&&<div className="cell-read-more">Read dispatch <span>→</span></div>}
      </div>
    </div>
  );
}

function PostDetail({ post, onBack }) {
  return (
    <div className="page">
      <div className="post-detail-hero" style={{background:post.gradient}}>
        <div style={{position:"absolute",inset:0,color:"white",opacity:.06}}><GeoSVG/></div>
        <div style={{position:"relative",zIndex:2}}>
          <div className="post-detail-tag">{post.tag}</div>
          <h1 className="post-detail-title">{post.title}</h1>
        </div>
      </div>
      <div className="post-detail-content">
        <button className="back-btn" onClick={onBack}>← Back to stories</button>
        <div className="post-detail-meta"><span>✍ {post.author}</span><span>📅 {post.date}</span><span>⏱ {post.readTime} read</span></div>
        <div className="post-body">
          {post.body.map((b,i)=>{
            if(b.type==="p") return <p key={i}>{b.text}</p>;
            if(b.type==="h2") return <h2 key={i}>{b.text}</h2>;
            if(b.type==="blockquote") return <blockquote key={i}>{b.text}</blockquote>;
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedPost, setSelectedPost] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x:-100, y:-100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setCursorPos({ x:e.clientX, y:e.clientY });
    const over  = (e) => setHovering(!!e.target.closest("button,a,.post-cell,.route-row,.dest-card,.article-col,.quick-prompt,.social-pill,.journal-item,.social-card,.filter-chip,.platform-tab,.toggle-opt"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  const nav = (p) => { setPage(p); setSelectedPost(null); window.scrollTo(0,0); };
  const openPost = (post) => { if(post){ setSelectedPost(post); setPage("post"); window.scrollTo(0,0); } };

  return (
    <>
      <style>{CSS}</style>
      <div className="cursor" style={{left:cursorPos.x,top:cursorPos.y,width:hovering?20:10,height:hovering?20:10,opacity:hovering?.5:1}}/>
      <div className="cursor-ring" style={{left:cursorPos.x,top:cursorPos.y,width:hovering?56:36,height:hovering?56:36}}/>

      <div className="topbar">
        <div className="logo" onClick={()=>nav("home")}>Meri<span>dian</span></div>
        <div className="topbar-nav">
          <button className={`nav-link ${page==="home"?"active":""}`} onClick={()=>nav("home")}>Stories</button>
          <button className={`nav-link ${page==="journal"?"active":""}`} onClick={()=>nav("journal")}>Photos</button>
          <button className={`nav-link ${page==="social"?"active":""}`} onClick={()=>nav("social")}>Social</button>
          <button className={`nav-link ${page==="routes"?"active":""}`} onClick={()=>nav("routes")}>Routes</button>
          <button className={`nav-link ${page==="destinations"?"active":""}`} onClick={()=>nav("destinations")}>Destinations</button>
          <button className={`nav-link ${page==="about"?"active":""}`} onClick={()=>nav("about")}>About Me</button>
          <button className="nav-write-btn" onClick={()=>nav("write")}>Write ✦</button>
        </div>
      </div>

      {page==="home" && (
        <div className="page">
          <div className="hero">
            <div className="hero-left">
              <div className="hero-issue">Issue 12 · April 2025</div>
              <h1 className="hero-headline">The world, <em>written</em> from inside it</h1>
              <p className="hero-sub">Dispatches from writers who go where the story is. No itineraries. No hotel partnerships. Just the place, faithfully rendered.</p>
              <div className="hero-cta">
                <button className="btn-gold" onClick={()=>nav("destinations")}>Browse Destinations</button>
                <button className="btn-ghost" onClick={()=>nav("journal")}>Photo Journal</button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-featured-img"><div className="hero-geo" style={{color:"#d4a853"}}><GeoSVG/></div></div>
              <div className="hero-featured-card" onClick={()=>openPost(POSTS[0])}>
                <div className="hero-tag">Featured Dispatch</div>
                <div className="hero-card-title">{POSTS[0].title}</div>
                <div className="hero-card-meta"><span>{POSTS[0].author}</span><span>{POSTS[0].date}</span><span>{POSTS[0].readTime}</span></div>
              </div>
            </div>
          </div>
          <div className="section" style={{padding:"5rem 0"}}>
            <div style={{padding:"0 3rem"}}><div className="section-rule"><div className="section-label">Latest Dispatches</div><div className="section-line"/><div className="section-count">{POSTS.length} stories</div></div></div>
            <div className="posts-grid">
              <PostCard post={POSTS[0]} featured onClick={()=>openPost(POSTS[0])}/>
              {POSTS.slice(1,5).map(p=><PostCard key={p.id} post={p} onClick={()=>openPost(p)}/>)}
            </div>
          </div>
          <div className="section" style={{padding:"0 0 5rem"}}>
            <div style={{padding:"0 3rem",marginBottom:"2.5rem"}}><div className="section-rule"><div className="section-label">From the Field</div><div className="section-line"/></div></div>
            <div className="articles-cols">
              {POSTS.slice(1,4).map((p,i)=>(
                <div key={p.id} className="article-col" onClick={()=>openPost(p)}>
                  <div className="article-num">0{i+1}</div>
                  <div className="article-title">{p.title}</div>
                  <div className="article-desc">{p.excerpt}</div>
                  <div className="article-tag">{p.tag}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid var(--border)",background:"var(--deep)",padding:"2.5rem 3rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap"}}>
            <div>
              <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--accent)",marginBottom:".5rem"}}>Also on social</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.3rem",fontWeight:300}}>42.8K on Instagram · 18.4K on X · 31.2K on YouTube</div>
            </div>
            <div style={{display:"flex",gap:"1rem"}}>
              <button className="btn-ghost" onClick={()=>nav("social")}>From the feeds →</button>
              <button className="btn-ghost" onClick={()=>nav("journal")}>Photo journal →</button>
            </div>
          </div>
        </div>
      )}

      {page==="post"         && selectedPost && <PostDetail post={selectedPost} onBack={()=>nav("home")}/>}
      {page==="journal"      && <JournalPage onNav={nav}/>}
      {page==="social"       && <SocialPage onOpenPost={openPost}/>}
      {page==="routes"       && <RoutesPage/>}
      {page==="about"        && <AboutPage onNav={nav}/>}
      {page==="write"        && <WriterPage/>}

      {page==="destinations" && (
        <div className="page" style={{paddingTop:"60px"}}>
          <div className="section"><div className="section-rule"><div className="section-label">Destinations</div><div className="section-line"/><div className="section-count">{DESTINATIONS.length} regions</div></div></div>
          <div className="destinations-grid">
            {DESTINATIONS.map(d=>(
              <div key={d.name} className="dest-card" onClick={()=>nav("home")}>
                <div className="dest-card-num">{d.num}</div>
                <div className="dest-region">{d.region}</div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-count">{d.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer">
        <div><div className="footer-brand">Meridian</div><div className="footer-tagline">Independent travel dispatches from writers who go where the story is.</div></div>
        <div>
          <div className="footer-col-title">Navigate</div>
          {[["Stories","home"],["Photos","journal"],["Social","social"],["Routes","routes"],["About Me","about"],["Write for Us","write"]].map(([l,p])=><span key={l} className="footer-link" onClick={()=>nav(p)}>{l}</span>)}
        </div>
        <div>
          <div className="footer-col-title">Recent Dispatches</div>
          {POSTS.slice(0,3).map(p=><span key={p.id} className="footer-link" onClick={()=>openPost(p)}>{p.title.split(":")[0]}</span>)}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 Meridian Journal. All dispatches reserved.</div>
        <div className="footer-copy">Independent · Unsponsored · Honest</div>
      </div>
    </>
  );
}
