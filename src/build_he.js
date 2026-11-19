// Hebrew (RTL) executive edition of the Elastic Search AI deck.
// Combines the interactive web-kit Search AI architecture story with
// Gartner MQ (#1), DB-Engines Vector DBMS (#1), Israeli customer proof points,
// and native Hebrew morphology / mixed RTL-LTR capabilities.
const fs = require('fs');
const path = require('path');
const D = __dirname;
const OUT = process.argv[2] || path.join(D, '..', 'he.html');
const r = (f) => fs.readFileSync(path.join(D, f), 'utf8');
const fonts = r('fonts.css'), base = r('base.css'), ew = r('lib-ew.js'), pm3 = r('lib-pm3.js'), player = r('player.js'), MARK = r('mark.svg');
const EMB = JSON.parse(r('embeds_he.json'));

const ARW = '<svg class="arw" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const foot = (t) => `<div class="ew-foot"><span class="lg">${MARK} elastic</span><span class="rt"><span>${t}</span></span></div>`;
const slide = ({ id, steps = 1, foot: f, cls = '', body, init = '', notes = '' }) =>
  `<section class="slide ${cls}" id="${id}" dir="rtl" lang="he" data-steps="${steps}" data-foot="${f}">\n${body}\n${init ? `  <script type="text/plain" class="init">\n${init}\n  </script>\n` : ''}${foot(f)}\n<aside class="nt">${notes}</aside>\n</section>\n`;

const CSS = `
/* ---------- Hebrew / RTL Executive Deck Layer ---------- */
:root{
  --bar:44px;
  --sans:'Heebo','Inter',-apple-system,'Segoe UI','Arial Hebrew',sans-serif;
  --mono:'IBM Plex Mono','Heebo',ui-monospace,Menlo,monospace;
  --dev-blue:#101C3F;
}
html,body{margin:0;background:#fff}
body{position:fixed;inset:0;overflow:hidden}
#stage{position:absolute;left:0;top:0;width:1280px;height:720px;transform-origin:0 0}
.slide{font-size:18px;direction:rtl;padding:50px 72px}
.slide [data-goto]{cursor:pointer}
h1,.h1,.take,.callout,.sub,.eyebrow,.chipf,.tag,.ew-foot .rt,.chip{letter-spacing:0!important}
h1{font-size:44px;line-height:1.08;margin-top:12px}
.eyebrow{text-transform:none;font-size:13px}
.tag{text-transform:none;font-size:12.5px}
.chipf{text-transform:none;font-size:13px;padding:7px 12px}
.ew-foot{direction:ltr;color:var(--grey);text-transform:none;letter-spacing:0!important}
.ew-foot .rt{direction:rtl;display:flex;gap:22px;align-items:center;font-size:12px}
#ovg .tile{text-align:right;direction:rtl}
#notes{direction:rtl;text-align:right;left:0;right:auto;border-left:0;border-right:1px solid var(--line)}
#notes .nh{letter-spacing:0!important;text-transform:none}
.slide .arw{transform:scaleX(-1)}
svg.iso{direction:ltr}
svg.iso text{font-family:'Heebo','IBM Plex Mono',sans-serif!important;letter-spacing:0!important}
.code,.cw .bar,.mono{direction:ltr;unicode-bidi:isolate}
.code{text-align:left;font:400 14.5px/1.55 var(--mono);color:var(--char);padding:10px 14px;margin:0;white-space:pre}
.cw{background:#fff;border:1.5px solid var(--dev-blue);box-shadow:6px 6px 0 var(--blue)}
.cw .bar{height:26px;border-bottom:1px solid var(--dev-blue);display:flex;align-items:center;gap:6px;padding:0 10px;font:600 11px var(--mono);letter-spacing:.04em;text-transform:none}
.cw .bar i{width:8px;height:8px;border:1px solid var(--ink);border-radius:50%}
.cw .bar span{margin-left:6px}

/* Role colors */
.kw{--c:#FEC514;--ct:#8A6500;--cl:#FFF4CC}
.vec{--c:#48EFCF;--ct:#0A7A76;--cl:#DDFBF5}
.rrf{--c:#F04E98;--ct:#BD2A72;--cl:#FDE6F1}
.rr{--c:#FF957D;--ct:#B84A2E;--cl:#FFE9E3}
.key{--c:#0B64DD;--ct:#0B64DD;--cl:#D9E8FF}
.kwt{color:#8A6500}.vect{color:#0A7A76}.rrft{color:#BD2A72}.rrt{color:#B84A2E}

.qt{font:600 22px/1.3 var(--sans);border-right:5px solid var(--blue);padding-right:16px;color:var(--ink)}
.take{margin-top:18px;font:600 32px/1.15 var(--sans)}
.take .kwt{box-shadow:inset 0 -10px 0 #FEC514}
.take .vect{box-shadow:inset 0 -10px 0 #48EFCF}
.note{margin-top:6px;font-size:17px;color:var(--grey)}
.callout{background:#D9E8FF;border-right:6px solid #0B64DD;padding:13px 20px;font:600 22px/1.35 var(--sans);color:var(--ink)}
.callout .b{color:var(--blue)}
.teal-rule{width:64px;height:3px;background:#48EFCF;margin:8px 0 12px}

/* Shared results rows (RTL) */
.lst .lh{display:flex;align-items:center;gap:12px;padding-bottom:10px;border-bottom:2px solid var(--c,var(--ink))}
.lst .lsub{font-size:16px;color:var(--grey)}
.r{display:grid;grid-template-columns:28px 1fr auto;align-items:center;column-gap:10px;border-bottom:1px solid var(--line);position:relative}
.rk{font:600 14px var(--mono);color:var(--grey);text-align:center}
.ti{font:500 16px/1.3 var(--sans);color:var(--ink)}
.sc{text-align:left;white-space:nowrap;direction:ltr}
.sc b{display:block;font:600 25px/1 var(--mono);color:var(--ct,var(--ink))}
.sc i{display:block;font:400 11px var(--sans);color:var(--grey);font-style:normal;margin-top:2px;direction:rtl}
.top1{background:var(--cl);box-shadow:inset -4px 0 0 var(--c)}

/* h01: Cover */
#h01 .z{width:610px}
#h01 h1{font-size:66px;line-height:1.02;margin-top:118px}
#h01 .sub{font-size:22px;max-width:560px;margin-top:24px;color:var(--char);line-height:1.45}
#h01 .by{margin-top:34px;font-size:18px;display:flex;gap:10px;color:var(--grey);align-items:center}
#h01 .by b{color:var(--ink);font-weight:600}
#h01 #hero{left:12px;top:0;width:620px;height:720px}

/* h02: Yesterday vs Today */
#h02 h1{font-size:39px}
#h02 .era2{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:18px}
#h02 .ec{border:1.5px solid var(--dev-blue);border-radius:8px;padding:18px 22px;background:#fff;display:flex;flex-direction:column;min-height:278px}
#h02 .ec.today{box-shadow:8px 8px 0 var(--blue);border-color:var(--blue)}
#h02 .ec .ehd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
#h02 .ec h3{font:700 24px/1.2 var(--sans);color:var(--ink)}
#h02 .sbar{display:flex;align-items:center;gap:10px;border:1.5px solid var(--line);background:#F5F7FA;padding:8px 12px;border-radius:6px;font:600 17.5px var(--sans);color:var(--ink);margin:4px 0 12px}
#h02 .ec.today .sbar{background:#D9E8FF;border-color:#0B64DD}
#h02 .links{display:grid;gap:7px;font-size:15.5px;color:var(--char)}
#h02 .links div{padding:7px 11px;border:1px solid var(--line);border-radius:4px;background:#fff;display:flex;justify-content:space-between;align-items:center}
#h02 .links div i{font-style:normal;font-size:12.5px;color:var(--grey)}
#h02 .aians{background:#F5F7FA;border-right:4px solid #48EFCF;padding:11px 14px;font-size:15.5px;line-height:1.45;color:var(--ink);flex:1}
#h02 .aians b{color:#0B64DD}
#h02 .aians .srcs{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
#h02 .aians .srcs span{font:500 12px var(--sans);background:#fff;border:1px solid var(--line);padding:3px 8px;color:var(--char)}
#h02 .bot2{margin-top:18px;padding:11px 18px;font-size:20.5px}

/* h03: Gartner MQ */
#h03 .split3{display:grid;grid-template-columns:1.15fr .95fr;gap:36px;margin-top:20px;align-items:start}
#h03 .gpts{display:grid;gap:14px}
#h03 .gp{border:1.5px solid var(--dev-blue);border-radius:8px;padding:16px 20px;background:#fff}
#h03 .gp.lead{border-color:var(--blue);background:#F5F7FA;box-shadow:6px 6px 0 #48EFCF}
#h03 .gp h3{font:700 21px/1.2 var(--sans);color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:10px}
#h03 .gp p{font-size:16.5px;line-height:1.42;color:var(--char)}
#h03 .mqbox{border:1.5px solid var(--dev-blue);background:#fff;padding:10px 12px;box-shadow:8px 8px 0 var(--blue);display:flex;flex-direction:column;align-items:center}
#h03 .mqbox img{max-height:446px;width:auto;max-width:100%;display:block}
#h03 .mqcap{font-size:12px;color:var(--grey);margin-top:6px;direction:ltr}

/* h04: DB-Engines Vector DBMS */
#h04 .split4{display:grid;grid-template-columns:.95fr 1.15fr;gap:32px;margin-top:18px;align-items:start}
#h04 .vstats{display:flex;flex-direction:column;gap:14px}
#h04 .hero-score{border:1.5px solid var(--blue);background:#F5F7FA;padding:18px 22px;border-radius:8px;box-shadow:6px 6px 0 #0B64DD}
#h04 .hero-score .big{display:flex;align-items:baseline;gap:14px}
#h04 .hero-score .big b{font:700 64px/1 var(--mono);color:#0B64DD;direction:ltr}
#h04 .hero-score .big span{font:600 20px/1.25 var(--sans);color:var(--ink)}
#h04 .bars{display:grid;gap:8px;margin-top:14px}
#h04 .brw{display:grid;grid-template-columns:138px 1fr 48px;align-items:center;gap:10px;direction:ltr;font:600 13.5px var(--mono)}
#h04 .brw .tr{height:12px;background:#DDE3EC;border-radius:2px;overflow:hidden}
#h04 .brw .fl{height:100%;background:#98A2B3}
#h04 .brw.es .fl{background:#0B64DD}
#h04 .brw.es{color:#0B64DD;font-weight:700}
#h04 .vmsg{border:1.5px solid var(--dev-blue);border-radius:8px;padding:15px 18px;background:#fff;font-size:16.5px;line-height:1.45;color:var(--char)}
#h04 .vmsg b{color:var(--ink)}
#h04 .dbimgs{display:flex;flex-direction:column;gap:10px}
#h04 .dbf{border:1.5px solid var(--dev-blue);background:#fff;padding:6px 10px;display:flex;justify-content:center}
#h04 .dbf.top img{max-height:194px;width:auto;max-width:100%;display:block}
#h04 .dbf.bot{box-shadow:6px 6px 0 #48EFCF}
#h04 .dbf.bot img{max-height:242px;width:auto;max-width:100%;display:block}

/* h05: Israeli Customer Stories */
#h05 h1{font-size:40px}
#h05 .cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
#h05 .cc{border:1.5px solid var(--dev-blue);border-radius:8px;background:#fff;padding:14px 16px;display:flex;flex-direction:column;min-height:212px;transition:transform .2s,box-shadow .2s}
#h05 .cc.feat{box-shadow:5px 5px 0 var(--blue)}
#h05 .cc .lgwrap{height:50px;display:flex;align-items:center;justify-content:space-between;gap:8px}
#h05 .cc .lgwrap img{max-height:46px;max-width:140px;width:auto;object-fit:contain;display:block}
#h05 .cc .sec-tag{font:600 11px var(--sans);padding:3px 8px;background:#F5F7FA;border:1px solid var(--line);color:var(--grey);white-space:nowrap}
#h05 .cc .trule{width:46px;height:3px;background:#48EFCF;margin:8px 0 8px}
#h05 .cc h4{font:700 16.5px/1.2 var(--sans);color:var(--ink);margin-bottom:5px}
#h05 .cc p{font-size:13.8px;line-height:1.38;color:var(--char)}

/* h06: One Engine + DiskBBQ */
#h06 .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:34px}
#h06 .fc{display:flex;flex-direction:column;border:1.5px solid var(--dev-blue);border-radius:8px;background:#fff;padding:0 24px 24px;min-height:326px;overflow:hidden;transition:box-shadow .3s,border-color .3s;--ac:var(--c)}
#h06 .fc .bar{display:flex;height:10px;margin:0 -24px 20px;background:var(--c)}
#h06 .fc .bar i{flex:1}
#h06 .fc .bar i.kw{background:#FEC514}#h06 .fc .bar i.vec{background:#48EFCF}
#h06 .fc h3{font:700 26px/1.2 var(--sans);margin:8px 0 12px;color:var(--ink)}
#h06 .fc p{font-size:18px;line-height:1.48;color:var(--char)}
#h06 .fc:nth-child(1){--ac:#FEC514}#h06 .fc:nth-child(2){--ac:#0B64DD}#h06 .fc:nth-child(3){--ac:#F04E98}
#h06[data-step="1"] .fc:nth-child(1),#h06[data-step="2"] .fc:nth-child(2),#h06[data-step="3"] .fc:nth-child(3){border-color:var(--ink);box-shadow:8px 8px 0 var(--ac)}
#h06 .cubes{display:flex;gap:6px;margin-top:auto;padding-top:18px}
#h06 .cubes i{display:block;width:20px;height:20px;border:1px solid var(--ink)}
#h06 .cubes i.y{background:#FEC514}#h06 .cubes i.t{background:#48EFCF}#h06 .cubes i.b{background:#0B64DD}#h06 .cubes i.p{background:#F04E98}
#h06 .cubes.dec{align-items:flex-end}
#h06 .cubes.dec i:nth-child(1){width:22px;height:22px}#h06 .cubes.dec i:nth-child(2){width:18px;height:18px}#h06 .cubes.dec i:nth-child(3){width:14px;height:14px}#h06 .cubes.dec i:nth-child(4){width:11px;height:11px}#h06 .cubes.dec i:nth-child(5){width:8px;height:8px}#h06 .cubes.dec i:nth-child(6){width:6px;height:6px}
#h06 .promise{margin-top:28px;font:700 30px/1.2 var(--sans)}

/* h07: The Hebrew Challenge + DictaBERT */
#h07 .hsplit{display:grid;grid-template-columns:1.05fr .95fr;gap:32px;margin-top:22px;align-items:start}
#h07 .traps{display:grid;grid-template-columns:1fr 1fr;gap:14px}
#h07 .trp{border:1.5px solid var(--dev-blue);border-radius:8px;padding:15px 16px;background:#fff}
#h07 .trp b{display:block;font:700 18px/1.2 var(--sans);color:var(--ink);margin-bottom:6px}
#h07 .trp .ex{display:inline-block;background:#FFF4CC;border-right:3px solid #FEC514;padding:3px 8px;font:600 15px var(--sans);color:var(--ink);margin-bottom:7px}
#h07 .trp p{font-size:15px;line-height:1.4;color:var(--char)}
#h07 .dicta{display:flex;flex-direction:column;gap:14px}
#h07 .an-box{border:1.5px solid var(--dev-blue);background:#fff;box-shadow:6px 6px 0 #48EFCF;padding:16px 18px;border-radius:8px}
#h07 .an-box .in-sent{background:#F5F7FA;border-right:4px solid var(--blue);padding:9px 12px;font:600 18px var(--sans);margin:8px 0 12px}
#h07 .an-steps{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;margin-bottom:12px;direction:ltr}
#h07 .an-steps span{font:600 11.5px var(--mono);padding:4px 7px;border:1px solid var(--ink);background:#fff;white-space:nowrap}
#h07 .an-steps span.hl{background:#0B64DD;color:#fff;border-color:#0B64DD}
#h07 .lemmas{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
#h07 .lemmas b{background:#DDFBF5;border:1px solid #02BCB7;color:#0A7A76;padding:5px 12px;font:700 16px var(--sans);border-radius:4px}
#h07 .take7{margin-top:20px}

/* h08: Words vs Meaning (Hebrew Phrasing Gap) */
#h08 .qrow{display:grid;grid-template-columns:1.35fr .65fr;gap:32px;align-items:center;margin-top:16px}
#h08 .qrow .ask{font:700 30px/1.15 var(--sans);color:var(--ink);text-align:left}
#h08 .lists{display:grid;grid-template-columns:1fr 1fr;gap:38px;margin-top:16px}
#h08 .lists .r{grid-template-columns:28px 1fr;min-height:54px}
#h08 .lists .ct{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;padding:6px 12px;min-height:54px}
#h08 .lists .ct.ans{box-shadow:inset -5px 0 0 var(--blue)}
#h08 .lists .ct.top1.ans{background:var(--cl)}
#h08 .lists .gap{height:26px;display:flex;align-items:center;justify-content:center;font:500 15px var(--mono);color:var(--grey);letter-spacing:.25em}

/* h09: Cross-lingual */
#h09 .heq{margin-top:20px;display:flex;align-items:center;gap:24px}
#h09 .heq .qt{font-size:30px;padding:6px 18px 6px 0;flex:1}
#h09 .heq .en{font-size:16.5px;color:var(--grey);max-width:340px;line-height:1.4}
#h09 .two{display:grid;grid-template-columns:1fr 1fr;gap:44px;margin-top:26px}
#h09 .zero{display:flex;align-items:baseline;gap:18px;margin-top:18px}
#h09 .zero .stat{font-size:104px;color:#8A6500;letter-spacing:-2px}
#h09 .zero .of{font-size:20px;color:var(--char);line-height:1.4}
#h09 .hit{margin-top:16px}
#h09 .hit .r{grid-template-columns:28px 1fr;min-height:62px}
#h09 .hit .ct{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;padding:8px 14px;min-height:62px}
#h09 .hit .ti{direction:ltr;text-align:left;font-size:17.5px}
#h09 .hit .ct.ans{box-shadow:inset -5px 0 0 var(--blue)}
#h09 .hit .ct.top1.ans{background:var(--cl)}
#h09 .langs{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
#h09 .langs span{font:500 13px var(--sans);border:1px solid var(--line);padding:5px 10px;color:var(--char);background:#F5F7FA}
#h09 .take4{position:absolute;left:72px;right:72px;top:592px;font:700 31px/1.15 var(--sans)}

/* h10: semantic_text */
#h10 h1 .st{font-weight:600;font-size:40px}
#h10 .right-col{position:absolute;right:72px;top:162px;width:610px}
#h10 .fl{display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap;direction:ltr;justify-content:flex-end}
#h10 .fl .arw{transform:none}
#h10 .nd{border:1px solid var(--ink);background:#fff;padding:7px 9px;font:600 12.5px/1.1 var(--mono);white-space:nowrap}
#h10 .nd.eis{background:var(--blue);border-color:var(--blue);color:#fff}
#h10 .nd.vec{background:#48EFCF;border-color:#02BCB7}
#h10 .fc6{margin-top:14px;font-size:18.5px;line-height:1.45;color:var(--char);display:flex;gap:12px;align-items:flex-start}
#h10 .fc6 .n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--blue);color:#fff;font:600 14px var(--mono);display:flex;align-items:center;justify-content:center;margin-top:3px}
#h10 .fc6 b{color:var(--ink)}
#h10 .left-col{position:absolute;left:72px;top:162px;width:496px}
#h10 .ep{border:1.5px solid var(--line);padding:11px 14px;margin-top:12px;background:#F5F7FA;display:flex;align-items:center;gap:12px;font-size:15px;color:var(--char);direction:ltr}
#h10 .ep .id{font:600 14.5px var(--mono);color:var(--ink);white-space:nowrap}

/* h11: Hybrid RRF + Single _search request */
#h11 h1{font-size:39px}
#h11 .qline{display:flex;align-items:baseline;gap:14px;margin-top:12px}
#h11 .cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:16px}
#h11 .lst .lh{min-height:38px}
#h11 .csub{height:22px;margin-top:5px;font-size:15px;color:var(--grey)}
#h11 .r{min-height:46px;padding:3px 10px 3px 6px;grid-template-columns:24px 1fr auto}
#h11 .r .ti{direction:ltr;text-align:right;font-family:var(--mono);font-size:15.5px}
#h11 .r.ans{box-shadow:inset -4px 0 0 #0B64DD;background:#D9E8FF}
#h11 .r.top1.ans{background:var(--cl);box-shadow:inset -4px 0 0 var(--c)}
#h11 .bot{position:absolute;left:72px;right:72px;top:464px;border-top:1.5px solid var(--ink);padding-top:14px;display:grid;grid-template-columns:1.2fr .8fr;gap:24px;align-items:center}
#h11 .msg{font-size:20px;line-height:1.42;color:var(--char)}
#h11 .msg b{color:var(--ink);font-weight:700}
#h11 .one-req{border:1.5px solid var(--dev-blue);background:#F5F7FA;border-radius:8px;padding:12px 16px;font-size:15px;line-height:1.4;color:var(--char)}
#h11 .one-req b{display:block;color:#0B64DD;font-size:16.5px;margin-bottom:4px}

/* h12: Relevance Pyramid */
#h12 .pyr{position:absolute;left:72px;top:150px;width:480px;height:340px;overflow:visible}
#h12 .thud{animation:thud .4s ease-out var(--thud-delay,.6s)}
@keyframes thud{0%{transform:translateY(0)}35%{transform:translateY(4px)}100%{transform:translateY(0)}}
#h12 .ripple{fill:none;stroke-width:3;transform-box:fill-box;transform-origin:center;opacity:0;animation:rip .9s ease-out both}
@keyframes rip{from{opacity:.75;transform:scale(1)}to{opacity:0;transform:scale(1.4)}}
#h12 .tiers{position:absolute;right:72px;top:150px;width:608px;height:372px}
#h12 .tx{position:absolute;left:0;right:0}
#h12 .tx.t3{top:16px}#h12 .tx.t2{top:142px}#h12 .tx.t1{top:262px}
#h12 .tx .hd{display:flex;align-items:center;gap:14px}
#h12 .tx .lb{font:600 14px var(--sans);color:var(--grey)}
#h12 .tx p{margin-top:8px;font-size:18px;line-height:1.45;color:var(--char)}
#h12 .cost{position:absolute;left:72px;top:528px;font-size:17px;color:var(--grey)}
#h12 .rag{position:absolute;left:72px;right:72px;top:574px}

/* h13: Reranker in motion */
#h13 .qline{display:flex;align-items:baseline;gap:14px;margin-top:12px}
#h13 .rl{position:absolute;right:72px;top:206px;width:690px;height:440px}
#h13 .it{position:absolute;left:0;right:0;height:30px;border:1px solid var(--line);background:#fff;display:grid;grid-template-columns:30px 1fr auto;align-items:center;gap:10px;padding:0 0 0 12px;font-size:14.5px;color:var(--char);direction:ltr;transition:transform .9s cubic-bezier(.5,0,.2,1),background .5s,border-color .5s}
#h13 .it .n{font:500 13px var(--mono);color:var(--grey);text-align:center}
#h13 .it .s{font:600 13px var(--mono);color:var(--grey)}
#h13 .it.ans{background:#FFE9E3;border-color:#FF957D;color:var(--ink);font-weight:600}
#h13 .it.ans .s{color:#B84A2E}
${Array.from({ length: 12 }, (_, i) => `#h13 .i${i + 1}{top:${i * 36}px}`).join('\n')}
#h13[data-step="2"] .i12,#h13[data-step="3"] .i12{transform:translateY(-396px)}
${Array.from({ length: 11 }, (_, i) => `#h13[data-step="2"] .i${i + 1},#h13[data-step="3"] .i${i + 1}{transform:translateY(36px)}`).join('\n')}
#h13 .side{position:absolute;left:72px;top:206px;width:406px}
#h13 .side .st8{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;font-size:17.5px;line-height:1.4;color:var(--char)}
#h13 .side .st8 b{color:var(--ink);font-weight:700}
#h13 .side .pill{display:inline-flex;align-items:center;gap:12px;margin-top:6px;background:#FFE9E3;border-right:6px solid #FF957D;padding:12px 18px;font:700 28px/1 var(--mono);color:#B84A2E;direction:ltr}
#h13 .side .pill span{font:600 14px var(--sans);color:var(--char);direction:rtl}
#h13 .take8{margin-top:22px;font:700 31px/1.15 var(--sans)}
#h13 .sm8{margin-top:10px;font-size:15.5px;color:var(--grey);line-height:1.4}

/* h14: RAG, Agent Builder & Workflows */
#h14 .world{position:absolute;left:72px;right:72px;top:170px;height:262px}
#h14 .model{position:absolute;right:0;top:0;width:336px;height:262px;border:2px solid var(--dev-blue);background:#D9E8FF;padding:20px 22px;border-radius:8px}
#h14 .model h3{font:700 26px/1.18 var(--sans);margin:8px 0 10px}
#h14 .model p{font-size:18px;line-height:1.45;color:var(--char)}
#h14 .stamp{position:absolute;left:18px;bottom:20px;transform:rotate(6deg);border:3px solid #0B64DD;color:#0B64DD;padding:5px 12px;font:700 14px var(--mono);background:#fff;direction:ltr}
#h14 .wall{position:absolute;right:432px;top:-12px;height:286px;border-right:3px dashed var(--ink)}
#h14 .wall span{position:absolute;right:10px;bottom:0;font:600 13px var(--sans);color:var(--grey);white-space:nowrap}
#h14 .data{position:absolute;left:0;top:0;width:560px}
#h14 .dchips{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
#h14 .dc{display:inline-flex;align-items:center;border:1.5px dashed var(--grey);background:#fff;padding:9px 14px;font-size:18px;color:var(--char);border-radius:4px}
#h14 .never{margin-top:16px;font:700 24px var(--sans);color:#B84A2E}
#h14 .bridge{position:absolute;right:314px;top:92px;width:236px;height:84px;background:#0B64DD;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:8px 8px 0 #48EFCF;z-index:3;border-radius:4px}
#h14 .bridge b{font:700 24px var(--mono);direction:ltr}
#h14 .bridge span{font:500 14px var(--sans);margin-top:3px}
#h14 .pipe{position:absolute;left:72px;right:72px;top:458px;display:flex;align-items:center;gap:12px}
#h14 .nd{flex:1;border:1.5px solid var(--dev-blue);border-radius:6px;background:#fff;padding:12px 14px;font-size:17.5px;line-height:1.3;text-align:center}
#h14 .nd b{font-weight:700}
#h14 .nd.rrfn{background:#FDE6F1;border-color:#F04E98}
#h14 .nd.keyn{background:#D9E8FF;border-color:#0B64DD}
#h14 .line{position:absolute;left:72px;right:72px;top:554px;font:700 30px/1.2 var(--sans)}
#h14 .line .sm{display:block;margin-top:7px;font:400 17px var(--sans);color:var(--char)}

/* h15: Agent Builder Platform (CTO view + Kibana Studio UI) */
#h15 h1{font-size:40px}
#h15 .kibana-ab{position:absolute;left:72px;top:150px;width:638px;border:1.5px solid var(--dev-blue);background:#fff;box-shadow:7px 7px 0 var(--blue);border-radius:6px;overflow:hidden}
#h15 .kab-bar{height:28px;background:#101C3F;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 12px;font:600 11.5px var(--mono);direction:ltr}
#h15 .kab-bar .dots{display:flex;align-items:center;gap:6px}
#h15 .kab-bar .dots i{width:8px;height:8px;border-radius:50%;background:#48EFCF;opacity:.85}
#h15 .kab-bar .api{background:rgba(72,239,207,.16);color:#48EFCF;border:1px solid rgba(72,239,207,.45);padding:2px 8px;border-radius:3px;font-size:10.5px}
#h15 .kab-tabs{display:grid;grid-template-columns:1fr 1.15fr;background:#F5F7FA;border-bottom:1.5px solid var(--line);font:600 13px var(--sans)}
#h15 .kab-tabs div{padding:8px 12px;color:var(--grey);text-align:center;border-left:1px solid var(--line)}
#h15 .kab-tabs div.on{background:#fff;color:#0B64DD;font-weight:700;box-shadow:inset 0 -3px 0 #0B64DD}
#h15 .kab-body{display:grid;grid-template-columns:1.08fr .92fr;min-height:330px}
#h15 .kab-cfg{padding:12px 14px;border-left:1px solid var(--line);display:flex;flex-direction:column;gap:8px}
#h15 .kab-fld label{display:block;font:700 11px var(--sans);color:var(--grey);margin-bottom:2px}
#h15 .kab-val{border:1px solid var(--line);background:#F5F7FA;padding:5px 8px;border-radius:4px;font:600 13px var(--sans);color:var(--ink);display:flex;justify-content:space-between;align-items:center}
#h15 .kab-prompt{border:1px solid #B5BFCE;background:#fff;border-right:3px solid #0B64DD;padding:6px 8px;font-size:12.2px;line-height:1.38;color:var(--char);border-radius:3px}
#h15 .kab-tools{display:flex;flex-wrap:wrap;gap:5px;margin-top:2px}
#h15 .kab-tools span{font:600 11px var(--mono);padding:4px 7px;border-radius:3px;border:1px solid var(--dev-blue);background:#fff;color:var(--ink);direction:ltr}
#h15 .kab-tools span.t-esql{background:#D9E8FF;border-color:#0B64DD;color:#0B64DD}
#h15 .kab-tools span.t-srch{background:#DDFBF5;border-color:#02BCB7;color:#0A7A76}
#h15 .kab-tools span.t-mcp{background:#FDE6F1;border-color:#F04E98;color:#BD2A72}
#h15 .kab-tools span.t-wf{background:#FFF4CC;border-color:#FEC514;color:#8A6500}
#h15 .kab-sim{padding:12px 13px;background:#FAFBFD;display:flex;flex-direction:column;gap:8px}
#h15 .kab-u{background:#0B64DD;color:#fff;padding:7px 10px;border-radius:6px 6px 6px 0;font-size:12.5px;line-height:1.35}
#h15 .kab-tr{border:1px solid var(--line);background:#fff;padding:6px 8px;border-radius:4px;font:500 11px/1.45 var(--mono);color:var(--char);direction:ltr;text-align:left}
#h15 .kab-tr b{color:#0A7A76}
#h15 .kab-a{background:#fff;border:1px solid var(--line);border-right:3px solid #48EFCF;padding:7px 10px;border-radius:4px;font-size:12.3px;line-height:1.38;color:var(--ink)}
#h15 .kab-foot{background:#DDFBF5;border-top:1px solid #02BCB7;padding:6px 12px;font:600 12px var(--sans);color:#0A7A76;display:flex;justify-content:space-between;align-items:center}
#h15 .ab-pts{position:absolute;right:72px;top:150px;width:466px;display:grid;gap:11px}
#h15 .ab-pt{border:1.5px solid var(--dev-blue);border-radius:8px;padding:13px 16px;background:#fff}
#h15 .ab-pt.hl{border-color:#0B64DD;background:#F5F7FA}
#h15 .ab-pt>b{display:block;font:700 18px/1.2 var(--sans);color:var(--ink);margin-bottom:5px}
#h15 .ab-pt p{font-size:15px;line-height:1.42;color:var(--char)}
#h15 .take15{position:absolute;left:72px;right:72px;top:602px;font:700 28px/1.15 var(--sans)}

/* h16: Elastic Workflows (Deterministic Execution + YAML + Approval Gate) */
#h16 h1{font-size:40px}
#h16 .wf-pipe{position:absolute;left:72px;right:72px;top:148px;display:flex;align-items:stretch;gap:8px}
#h16 .wf-nd{flex:1;border:1.5px solid var(--dev-blue);border-radius:6px;background:#fff;padding:8px 10px;display:flex;flex-direction:column;gap:3px}
#h16 .wf-nd i{font:700 11px var(--sans);color:var(--grey);font-style:normal}
#h16 .wf-nd b{font:700 15px/1.18 var(--sans);color:var(--ink)}
#h16 .wf-nd span{font-size:12.5px;line-height:1.28;color:var(--char)}
#h16 .wf-nd.gate{background:#FFF4CC;border-color:#FEC514;box-shadow:4px 4px 0 #FEC514}
#h16 .wf-nd.gate i{color:#8A6500}
#h16 .wf-nd.act{background:#D9E8FF;border-color:#0B64DD}
#h16 .wf-nd.act i{color:#0B64DD}
#h16 .wf-pipe .arw{align-self:center;width:18px}
#h16 .wf-yaml{position:absolute;left:72px;top:264px;width:576px}
#h16 .wf-yaml .code{font-size:12.6px;line-height:1.45;padding:9px 13px}
#h16 .wf-yaml .code .cm{color:var(--grey)}
#h16 .wf-yaml .code .gt{background:#FFF4CC;color:#8A6500;font-weight:700;padding:0 4px}
#h16 .wf-yaml .code .ok{color:#0A7A76;font-weight:600}
#h16 .wf-pts{position:absolute;right:72px;top:264px;width:528px;display:grid;gap:10px}
#h16 .wf-pt{border-right:5px solid var(--c,#0B64DD);background:#F5F7FA;padding:10px 15px;border-radius:4px}
#h16 .wf-pt>b{display:block;font:700 17.5px/1.2 var(--sans);color:var(--ink);margin-bottom:3px}
#h16 .wf-pt span{font-size:14.6px;line-height:1.38;color:var(--char)}
#h16 .take16{position:absolute;left:72px;right:72px;top:604px;font:700 28px/1.15 var(--sans)}

/* h17: Multimodal Vector Space */
.c0{--c:#02BCB7}.c4{--c:#0B64DD}.c6{--c:#F04E98}
#h17 .plot{position:absolute;left:48px;top:148px;width:680px;height:420px}
#h17 .plot canvas{display:block}
#h17 .legend{position:absolute;left:72px;top:580px;display:flex;gap:20px;font:500 14px var(--sans);color:var(--char)}
#h17 .legend span{display:flex;align-items:center;gap:7px}
#h17 .legend i{display:inline-block;width:12px;height:12px;border-radius:50%;background:var(--c)}
#h17 .caps{position:absolute;right:72px;top:156px;width:452px;display:grid;gap:10px}
#h17 .cap10{display:grid;grid-template-columns:1fr;gap:3px;padding:10px 16px 10px 14px;background:var(--cl,#F5F7FA);border-right:6px solid var(--c,#B5BFCE);border-radius:4px}
#h17 .cap10 b{font:700 20px/1.2 var(--sans);color:var(--ink)}
#h17 .cap10 span{font-size:15.5px;color:var(--char);line-height:1.36}
#h17 .cap10 .q{font:600 15px var(--sans);color:var(--ct)}
#h17 .vid{position:absolute;right:72px;top:566px;width:452px;font-size:14.5px;color:var(--grey);line-height:1.4}

/* h18: OCR + Mixed RTL/LTR */
#h18 h1{font-size:40px}
#h18 .photo{position:absolute;left:72px;top:154px;width:420px}
#h18 .photo img{display:block;width:420px;max-height:360px;object-fit:cover;border:1.5px solid var(--dev-blue);box-shadow:8px 8px 0 #B5BFCE}
#h18 .photo .tag{margin-top:10px;display:block}
#h18 .pdf-note{margin-top:10px;border:1px solid var(--line);background:#F5F7FA;padding:9px 12px;font-size:14.5px;color:var(--char);border-radius:6px}
#h18 .eng{position:absolute;right:72px;top:154px;width:676px;display:grid;gap:14px}
#h18 .eng .cw.loc{box-shadow:6px 6px 0 #B5BFCE}
#h18 .eng .code{font-size:13.5px;line-height:1.48}
#h18 .eng .code .ok{color:#0A7A76;font-weight:600}
#h18 .eng .code .bad{color:#B84A2E}
#h18 .rtl-ocr{border:1.5px solid var(--dev-blue);border-radius:8px;padding:12px 16px;background:#fff;box-shadow:5px 5px 0 #48EFCF}
#h18 .rtl-ocr .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
#h18 .rtl-ocr .good{background:#DDFBF5;padding:7px 12px;font:600 16px var(--sans);color:#0A7A76;border-radius:4px;margin-bottom:6px}
#h18 .rtl-ocr .garb{font-size:13.5px;color:#B84A2E}
#h18 .take11{position:absolute;left:72px;right:72px;top:598px;font:700 29px/1.15 var(--sans)}

/* h19: Air-Gapped */
#h19 #hero12{left:36px;top:148px;width:540px;height:470px}
#h19 .tbl{position:absolute;right:72px;top:154px;width:604px}
#h19 .th,#h19 .trw{display:grid;grid-template-columns:140px 180px 1fr;column-gap:12px;align-items:center}
#h19 .th{padding-bottom:8px;border-bottom:2px solid var(--ink);font:700 13px var(--sans);color:var(--grey)}
#h19 .trw{min-height:50px;border-bottom:1px solid var(--line);font-size:16px;line-height:1.3;color:var(--char)}
#h19 .trw b{color:var(--ink);font-weight:700}
#h19 .trw .mono{font-size:14px;text-align:right}
#h19 .line12{position:absolute;right:72px;width:604px;top:498px;font:700 21px/1.32 var(--sans)}
#h19 .line12 .sm{display:block;margin-top:8px;font:400 15.5px/1.42 var(--sans);color:var(--char)}

/* h20: Closing Summary */
#h20 h1{font-size:42px;max-width:1060px;line-height:1.1}
#h20 .sub{font-size:20px;margin-top:10px;color:var(--char)}
#h20 #hero13{left:40px;top:234px;width:520px;height:400px}
#h20 .caps{position:absolute;right:72px;top:244px;width:616px;display:grid;gap:8px}
#h20 .cap{display:grid;grid-template-columns:132px 1fr;align-items:center;gap:14px;padding:7px 0 7px 14px;background:var(--cl,#F5F7FA);border-right:6px solid var(--c,#B5BFCE);border-radius:4px}
#h20 .cap.sl{--c:#B5BFCE;--cl:#F5F7FA}
#h20 .cap .chipf{margin-right:12px;justify-self:start;padding:6px 10px;font-size:12.5px}
#h20 .cap b{display:block;font:700 20px/1.2 var(--sans);color:var(--ink)}
#h20 .cap div span{font-size:16px;color:var(--char)}
`;

const S = [];

// ---------------- 01 Cover ----------------
S.push(slide({ id: 'h01', steps: 1, foot: 'Elastic · פלטפורמת ה-Search AI לארגון', body: `
  <div class="z">
    <div class="eyebrow in1">Elastic · <b>פלטפורמת ה-Search AI המובילה בעולם</b></div>
    <h1 class="in2"><span dir="ltr">Search AI</span><br><span class="b">מקצה לקצה.</span></h1>
    <p class="sub in3">מנוע אחד למילות מפתח, וקטורים, עברית ברמת שפת אם, מסמכים סרוקים, מולטי-מודאליות וסוכני AI. אותה פלטפורמה בדיוק בענן ובנתק מלא.</p>
    <div class="by in4"><b>Elastic</b><span>·</span>סקירת הנהלה בכירה · 2026</div>
  </div>
  <svg id="hero" class="iso" viewBox="0 0 620 720"></svg>`,
  init: `
    EW.dots({x: 0, y: 30, w: 620, h: 660, seed: 4, blobs: 6, thr: .5, parent: slide});
    const sc = EW.iso(slide.querySelector('#hero'), {ox: 280, oy: 282, s: .78});
    sc.rect({x: -30, y: -30, w: 330, d: 330, z: 0, delay: .1});
    const plat = sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .15, drop: 120, order: -1000});
    [128, 108, 88, 68, 48].forEach((h, i) => sc.box({x: 22 + i * 35.5, y: 150, w: 26, d: 100, h, z: 46, c: 'slate', stroke: false, delay: .55 + i * .07, drop: 90, order: 1}));
    sc.box({x: 190, y: 26, w: 60, d: 60, h: 76, z: 46, c: 'teal', delay: .82, drop: 90});
    sc.box({x: 200, y: 112, w: 52, d: 52, h: 44, z: 46, c: 'yellow', delay: .9, drop: 90});
    const foot = sc.rect({x: 60, y: 22, w: 104, d: 104, z: 46, sw: 1.2, delay: 1.0});
    sc.box({x: 60, y: 22, w: 104, d: 104, h: 104, z: 176, c: 'glass', wire: true, inner: true, stroke: '#343741', delay: 1.05, drop: 60, float: 7, floatSpeed: 1.1, order: 2000});
    sc.box({x: 72, y: 34, w: 80, d: 80, h: 80, z: 188, c: 'pink', delay: 1.1, drop: 80, float: 7, floatSpeed: 1.1, order: 3000});
    sc.label({at: [164, 22, 228], side: 'r', len: 44, title: 'היברידי + דירוג מחדש', sub: 'RRF · jina-reranker-v3', raw: true, delay: 1.45});
    sc.label({at: [250, 26, 84], side: 'r', len: 36, title: 'חיפוש וקטורי', sub: 'DiskBBQ · 1-bit vectors', raw: true, delay: 1.6});
    sc.label({at: [252, 138, 68], side: 'r', len: 106, title: 'לקסיקלי ועברית', sub: 'BM25 · DictaBERT', raw: true, delay: 1.75});
    sc.run();
    const fid = slide.querySelector('#hero filter').id;
    const sh = EW.el('polygon', {points: [[70, 32], [158, 32], [158, 120], [70, 120]].map(([x, y]) => sc.P(x, y, 46).join(',')).join(' '), fill: 'rgba(30,40,80,.30)', filter: \`url(#\${fid})\`, opacity: 0});
    plat.g.after(foot.g); foot.g.after(sh);
    EW.loop(t => { const k = Math.min(1, Math.max(0, (t - 1.1) / .6)), f = t > 1.8 ? Math.sin((t - 1.8) * 1.1) : 0;
      sh.setAttribute('opacity', (k * (.85 - .25 * f)).toFixed(3));
      sh.setAttribute('transform', \`translate(\${sc.P(114, 76, 46).map(v => v.toFixed(1)).join(',')}) scale(\${(1 - .06 * f).toFixed(3)}) translate(\${sc.P(114, 76, 46).map(v => (-v).toFixed(1)).join(',')})\`); });`,
  notes: `<p><b>פתיחה להנהלה:</b> Elastic היא פלטפורמת ה-Search AI המובילה בעולם - גם מנוע החיפוש מספר 1 וגם מסד הנתונים הווקטורי מספר 1. הכול רץ על פלטפורמה אחודה אחת, בענן או בנתק מלא (Air-Gapped).</p>` }));

// ---------------- 02 What Changed: Yesterday vs Today ----------------
S.push(slide({ id: 'h02', steps: 2, foot: 'מה השתנה · ממילות מפתח לתשובות והחלטות', body: `
  <div class="z">
    <div class="eyebrow in1">שינוי הציפיות בארגון · <b>אתמול מול היום</b></div>
    <h1 class="in2">משתמשים כבר לא מחפשים קישורים. <span class="b">הם מצפים לתשובה מבוססת.</span></h1>
  </div>
  <div class="era2 in3">
    <div class="ec">
      <div class="ehd"><h3>אתמול: חיפוש מילות מפתח</h3><span class="chipf kw">רשימת מסמכים</span></div>
      <div class="teal-rule"></div>
      <div class="sbar">🔍 <span>כיפת ברזל</span></div>
      <div class="links">
        <div><span>כיפת ברזל - סקירה כללית ומפרט טכני</span><i>עמוד 1 מתוך 48</i></div>
        <div><span>דוח תקציב הצטיידות מערכות הגנה אווירית 2024</span><i>PDF סרוק</i></div>
        <div><span>פרוטוקול דיון: שילוב שכבות הגנה רב-שכבתית</span><i>מסמך Word</i></div>
        <div><span>עוד 1,420 תוצאות שכוללות את המילים ״כיפת״ או ״ברזל״...</span><i>חיפוש ידני</i></div>
      </div>
    </div>
    <div class="ec today rv" data-s="2">
      <div class="ehd"><h3>היום: Search AI על הדאטה הארגוני</h3><span class="chipf key">תשובה מנומקת ומאובטחת</span></div>
      <div class="teal-rule"></div>
      <div class="sbar">✨ <span>מה ההבדל המבצעי והתקציבי בין כיפת ברזל לקלע דוד בתרחיש רוויה?</span></div>
      <div class="aians">
        <b>תשובה מסונתזת מתוך 4 מקורות מאומתים (בהתאם להרשאות המשתמש):</b><br>
        <b>כיפת ברזל</b> מיועדת לאיומים קצרי-טווח בקצב אש גבוה ובעלות יירוט נמוכה משמעותית, בעוד <b>קלע דוד</b> מכסה את שכבת הביניים מול איומים מתמרנים וטילים כבדים יותר. בתרחיש רוויה, ניהול האש המשולב מנתב...
        <div class="srcs"><span>📄 תורת הפעלה רב-שכבתית · עמ׳ 14</span><span>📊 טבלת עלויות יירוט 2026</span><span>🎙️ תמלול תחקיר מבצעי</span></div>
      </div>
    </div>
  </div>
  <div class="callout bot2 rv" data-s="2">מודל השפה מנסח את המשפטים. <span class="b">איכות החיפוש מתחת למכסה המנוע קובעת אם התשובה מדויקת או הזיה.</span></div>`,
  notes: `<p><b>מקש רווח: חושף את תמונת "היום" ואת שורת המחץ.</b></p><p>הציפייה של כל עובד, מפקד, רופא או אזרח השתנתה לחלוטין: אף אחד לא רוצה לעבור ידנית על עשרים קובצי PDF אחרי חיפוש "כיפת ברזל". רוצים לשאול שאלה מורכבת ולקבל תשובה מדויקת מתוך הידע הארגוני הפנימי. אבל LLM הוא טוב רק כמו ההקשר שמנוע החיפוש מזרים אליו.</p>` }));

// ---------------- 03 Gartner Magic Quadrant 2026 ----------------
S.push(slide({ id: 'h03', steps: 3, foot: 'מובילות שוק עולמית · Gartner Magic Quadrant 2026', body: `
  <div class="z">
    <div class="eyebrow in1">הכרה אנליסטית בינלאומית · <b>Gartner Magic Quadrant™ for Enterprise AI Search</b></div>
    <h1 class="in2">מקום <span dir="ltr">#1</span> ביכולת ביצוע. <span class="b">ומקום <span dir="ltr">#1</span> בשלמות החזון.</span></h1>
  </div>
  <div class="split3 in3">
    <div class="gpts">
      <div class="gp lead">
        <h3><span class="chipf key" dir="ltr">#1 Leader</span> מובילה בפער ברור על כל השוק</h3>
        <p>בדוח Gartner לספטמבר 2026 מדורגת Elastic גבוה מכולן ב-<b>Ability to Execute</b> והכי ימינה ב-<b>Completeness of Vision</b>, לפני Google\u200F, Glean ו-Microsoft.</p>
      </div>
      <div class="gp rv" data-s="2">
        <h3>תשתית פתוחה - לא קופסה סגורה בענן</h3>
        <p>בעוד פתרונות SaaS סגורים מוגבלים לענן ציבורי ולמקורות קבועים מראש, Elastic רצה בכל מקום: בענן מנוהל, על OpenShift פנים-ארגוני ובסביבות מסווגות בנתק מלא.</p>
      </div>
      <div class="gp rv" data-s="3">
        <h3>אבטחת מידע והרשאות ברמת המסמך והשדה</h3>
        <p>בקרת גישה מובנית (<span dir="ltr">Document &amp; Field-Level Security</span>) מבטיחה שכל משתמש וסוכן AI נחשף אך ורק לשורות ולמסמכים שהוא מורשה לראות.</p>
      </div>
    </div>
    <div class="mqbox">
      <img src="${EMB.gartner_mq}" alt="Gartner Magic Quadrant for Enterprise AI Search - September 2026">
      <span class="mqcap">Gartner Magic Quadrant for Enterprise AI Search · As of September 2026</span>
    </div>
  </div>`,
  notes: `<p><b>מקש רווח: שלוש נקודות הנהלה לצד גרף גרטנר הרשמי (ספטמבר 2026).</b></p><p>גרטנר מציבה את Elastic במקום הראשון המוחלט גם בציר הביצוע וגם בציר החזון, מעל ענקיות כמו גוגל ומיקרוסופט ומעל שחקני נישה כמו Glean.</p>` }));

// ---------------- 04 DB-Engines Vector DBMS Ranking 2026 ----------------
S.push(slide({ id: 'h04', steps: 2, foot: 'דירוג מסדי הנתונים הווקטוריים · DB-Engines 2026', body: `
  <div class="z">
    <div class="eyebrow in1">עליונות טכנולוגית · <b>DB-Engines Vector DBMS Ranking (יולי 2026)</b></div>
    <h1 class="in2">לא ״גם וקטורי״. <span class="b">מסד הנתונים הווקטורי <span dir="ltr">#1</span> בעולם.</span></h1>
  </div>
  <div class="split4 in3">
    <div class="vstats">
      <div class="hero-score">
        <div class="big"><b>94.32</b><span>מקום <span dir="ltr">#1</span> בעולם בפער עצום<br>מכל מסד וקטורי ייעודי</span></div>
        <div class="bars">
          <div class="brw es"><span>1. Elasticsearch</span><div class="tr"><div class="fl" style="width:100%"></div></div><span>94.32</span></div>
          <div class="brw"><span>2. OpenSearch</span><div class="tr"><div class="fl" style="width:22.5%"></div></div><span>21.18</span></div>
          <div class="brw"><span>4. Pinecone</span><div class="tr"><div class="fl" style="width:9.7%"></div></div><span>9.12</span></div>
          <div class="brw"><span>6. Milvus</span><div class="tr"><div class="fl" style="width:7.1%"></div></div><span>6.67</span></div>
          <div class="brw"><span>7. Qdrant</span><div class="tr"><div class="fl" style="width:6.4%"></div></div><span>6.03</span></div>
        </div>
      </div>
      <div class="vmsg rv" data-s="2">
        <b>למה זה קריטי לארכיטקטורה שלכם?</b><br>
        ארגונים שמקימים מסד וקטורי צדדי לצד מנוע החיפוש משלמים פעמיים על תשתית, סנכרון דאטה, גיבויים והרשאות - ומאבדים את השילוב ההיברידי. <b>ב-Elastic הווקטורים כבר יושבים בלב המנוע המוביל בעולם.</b>
      </div>
    </div>
    <div class="dbimgs">
      <div class="dbf top"><img src="${EMB.db_table}" alt="DB-Engines Vector DBMS Table July 2026"></div>
      <div class="dbf bot"><img src="${EMB.db_chart}" alt="DB-Engines Historical Trend of Vector DBMS"></div>
    </div>
  </div>`,
  notes: `<p><b>מקש רווח: חושף את המשמעות הארכיטקטונית והכלכלית.</b></p><p>במדד DB-Engines הרשמי ליולי 2026 עבור מערכות Vector DBMS,‏ Elasticsearch מובילה עם ניקוד 94.32 - יותר מפי 4 מ-OpenSearch ויותר מפי 10 ממסדים וקטוריים ייעודיים כמו Pinecone,‏ Milvus ו-Qdrant. אין שום סיבה לפצל את הדאטה למערכת וקטורית נפרדת.</p>` }));

// ---------------- 05 Israeli Search Customer Stories ----------------
const cust = (cls, logo, sec, title, desc) => `
  <div class="cc ${cls}">
    <div class="lgwrap"><img src="${logo}" alt="${title}"><span class="sec-tag">${sec}</span></div>
    <div class="trule"></div>
    <h4>${title}</h4>
    <p>${desc}</p>
  </div>`;
S.push(slide({ id: 'h05', steps: 1, foot: 'מוכח בישראל · סיפורי לקוחות חיפוש ו-Search AI', body: `
  <div class="z">
    <div class="eyebrow in1">הוכחה בשטח · <b>סיפורי לקוחות חיפוש בישראל</b></div>
    <h1 class="in2">ממערכות הבריאות הלאומיות <span class="b">ועד ליבת המודיעין והביטחון.</span></h1>
  </div>
  <div class="cgrid in3">
    ${cust('feat', EMB.logo_clalit, 'בריאות · OpenShift', 'שירותי בריאות כללית', 'בשיתוף KPMG ישראל על תשתית <span dir="ltr" style="white-space:nowrap">Red Hat OpenShift</span>\u200F: עיבוד וניתוח מסמכים טקסטואליים, ייעול הקשר מטפל-מטופל והעשרת מידע לאנליסטים בפרויקט ענק.')}
    ${cust('feat', EMB.logo_idf, 'ביטחון · מבצעי', 'צה״ל · מערכת ״ג׳יני״', 'עוזר AI מבצעי בסיווג סודי (דמוי ChatGPT צבאי) המנגיש מידע קריטי ומסייע למפקדים קרביים בקבלת החלטות מהירה בשטח.')}
    ${cust('feat', EMB.logo_maccabi, 'בריאות דיגיטלית', 'מכבי שירותי בריאות', 'חיפוש וקטורי וחיפוש סמנטי מתקדם באפליקציית השירות למיליוני מבוטחים למציאת שירותים ומידע רפואי בשפה טבעית.')}
    ${cust('feat', EMB.logo_intel_isa, 'מודיעין · נתק מלא', 'קהילת המודיעין והביטחון', 'פרויקטי חיפוש מתקדמים ותחקור עומק על גבי מאגרי Big Data עצומים, בפריסה מלאה בסביבות מסווגות ובנתק מלא (<span dir="ltr" style="white-space:nowrap">Air-Gapped</span>).')}
    ${cust('', EMB.logo_police, 'אכיפה וחקירות', 'משטרת ישראל · ״עין הנץ״', 'פרויקט ליבה לחיפוש מורכב, הצלבת ישויות ותחקור מהיר בעולמות החקירות והמודיעין המשטרתי.')}
    ${cust('', EMB.logo_taasuka, 'ממשלה ושירות לאזרח', 'שירות התעסוקה הישראלי', 'פורטל חיפוש משרות חכם המופעל על ידי Search AI להתאמה סמנטית מדויקת בין כישורי מועמדים למשרות פתוחות.')}
    ${cust('', EMB.logo_bigid, 'סייבר ו-Compliance', 'BigID · ענן AWS', 'ניהול רגולציה (Compliance), סיווג מידע רגיש ואגרגציה על גבי מקורות דאטה עצומים כשירות מנוהל ב-AWS.')}
    ${cust('', EMB.logo_hospitals, 'מרכזים רפואיים', 'איכילוב והמרכז הרפואי שמיר', 'מנועי חיפוש חכמים באתרי המרכזים הרפואיים להנגשת מידע רפואי, מחלקות וזימון תורים למטופלים ולסגל.')}
  </div>`,
  notes: `<p><b>הוכחה מקומית מקצה לקצה:</b> מארגוני הבריאות הגדולים במדינה (כללית ומכבי), דרך מערכות AI מבצעיות בצה״ל ובקהילת המודיעין בסביבות Air-Gapped מלאות, ועד משטרת ישראל, שירות התעסוקה וחברות טכנולוגיה גלובליות שנולדו בישראל.</p>` }));

// ---------------- 06 One Engine + DiskBBQ ----------------
S.push(slide({ id: 'h06', steps: 3, foot: 'מנוע אחד · לקסיקלי, וקטורי ו-DiskBBQ', body: `
  <div class="z">
    <div class="eyebrow in1">הארכיטקטורה · <b>מנוע אחד בקנה מידה ארגוני</b></div>
    <h1 class="in2">מנוע חיפוש <span class="b">ומסד נתונים ווקטורי באינדקס אחד.</span></h1>
  </div>
  <div class="cards3 in3">
    <div class="fc" data-goto="1">
      <div class="bar split"><i class="kw"></i><i class="vec"></i></div>
      <div class="tag">01 · איחוד מלא</div>
      <h3>לקסיקלי + וקטורי יחד</h3>
      <p class="rv" data-s="1">מאפינג אחד ובקשת חיפוש אחת מחזירים תוצאות, הדגשות (<span dir="ltr">Highlights</span>) ופילוחים (<span dir="ltr">Facets</span>) מסונכרנים תמיד.</p>
      <div class="cubes"><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i></div>
    </div>
    <div class="fc" data-goto="2">
      <div class="bar key"><i></i></div>
      <div class="tag">02 · גמישות מודלים</div>
      <h3>המודלים רצים בפלטפורמה</h3>
      <p class="rv" data-s="2">מודלי Embedding,‏ Rerank ו-OCR זמינים מיד דרך <span dir="ltr">Elastic Inference Service</span> בענן, או על צמתי ML מקומיים בנתק מלא.</p>
      <div class="cubes"><i class="t"></i><i class="t"></i><i class="t"></i><i class="b"></i><i class="b"></i><i class="b"></i></div>
    </div>
    <div class="fc" data-goto="3">
      <div class="bar rrf"><i></i></div>
      <div class="tag">03 · חיסכון של פי 32 בזיכרון</div>
      <h3>DiskBBQ פורץ את גבול ה-<span dir="ltr">RAM</span></h3>
      <p class="rv" data-s="3">כיווץ וקטורים לביט אחד על הדיסק (<span dir="ltr" style="white-space:nowrap">1-bit quantization</span>) עם <span dir="ltr" style="white-space:nowrap">oversample + rescoring</span> לדיוק מלא במאות מיליוני מסמכים.</p>
      <div class="cubes dec"><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i></div>
    </div>
  </div>
  <div class="promise rv" data-s="3">בלי מסד נתונים שני. <span class="b">ובלי להחזיק גרף HNSW מלא ב-RAM יקר.</span></div>`,
  notes: `<p><b>מקש רווח: שלוש לחיצות - כרטיס בכל לחיצה.</b></p><p>היתרון ההנדסי המשולש: 1) חיפוש מילים וחיפוש וקטורי חיים באותו אינדקס ובאותה שאילתה. 2) המודלים מנוהלים בתוך הפלטפורמה בענן או On-Prem. 3) אלגוריתם DiskBBQ של Elastic מכווץ וקטורים פי 32 ומריץ אותם מהדיסק במהירות מסחררת בלי לפוצץ תקציבי זיכרון RAM.</p>` }));

// ---------------- 07 The Hebrew Challenge + DictaBERT ----------------
S.push(slide({ id: 'h07', steps: 2, foot: 'האתגר העברי · מורפולוגיה וניתוח נוירוני מובנה', body: `
  <div class="z">
    <div class="eyebrow in1">אתגר השפה · <b>חיפוש בעברית ברמת שפת אם</b></div>
    <h1 class="in2">״כששרה שרה שירים״: <span class="b">למה עברית שוברת מנועי חיפוש רגילים.</span></h1>
  </div>
  <div class="hsplit in3">
    <div class="traps">
      <div class="trp">
        <b>1. תחיליות וצמידים דבוקים</b>
        <span class="ex">בבית · מהעיר · ולכשמהעיר</span>
        <p>בלי הפרדה חכמה, חיפוש המילה ״עיר״ או ״בית״ מפספס מסמכים שבהם נוספו אותיות בכל״ם ושי״ן.</p>
      </div>
      <div class="trp">
        <b>2. עושר נטיות ושורשים</b>
        <span class="ex">הולכים · הלכתי · ילך ← הלך</span>
        <p>עשרות הטיות גוף, זמן וכינויי שייכות לאותו שורש נראות לטוקנייזר סטנדרטי כמילים זרות לחלוטין.</p>
      </div>
      <div class="trp">
        <b>3. כפל משמעות ללא ניקוד</b>
        <span class="ex">כששרה (שם) שרה (פועל)</span>
        <p>אותו רצף אותיות בדיוק מייצג שם פרטי, פועל או תואר - רק ניתוח תלוי-הקשר פותר את העמימות.</p>
      </div>
      <div class="trp">
        <b>4. ראשי תיבות וכתיב חופשי</b>
        <span class="ex">ביה״ח / בית חולים · חו״ל</span>
        <p>פער מתמיד בין השפה שבה אזרח או עובד מקליד שאילתה לבין המינוח הרשמי בנהלים.</p>
      </div>
    </div>
    <div class="dicta rv" data-s="2">
      <div class="an-box">
        <div class="tag">פתרון מובנה ב-Elasticsearch · <b>מנתח נוירוני בעברית (DictaBERT)</b></div>
        <div class="teal-rule"></div>
        <div style="font-size:14.5px;color:var(--grey)">משפט במקור:</div>
        <div class="in-sent">״בבתי המרקחת מנפקים את התרופות למבוטחים״</div>
        <div class="an-steps">
          <span>standard tokenizer</span><span>→</span><span class="hl">heb_lemmas (DictaBERT)</span><span>→</span><span>heb_stopwords</span>
        </div>
        <div style="font-size:14.5px;color:var(--grey)">אינדוקס שורשים ולמות נקיות לפי הקשר המשפט:</div>
        <div class="lemmas">
          <b>בית</b><b>מרקחת</b><b>מנפק</b><b>תרופה</b><b>מבוטח</b>
        </div>
      </div>
      <div class="callout" style="font-size:18.5px;padding:12px 16px">
        דיוק לשוני של <b>DictaBERT</b> למילים מדויקות + <b>וקטורים רב-לשוניים</b> להבנת כוונה וסלנג.
      </div>
    </div>
  </div>`,
  notes: `<p><b>מקש רווח: חושף את צינור הניתוח הנוירוני בעברית בתוך Elasticsearch.</b></p><p>עברית היא אחת השפות הקשות בעולם לחיפוש בגלל תחיליות דבוקות, נטיות ועמימות ללא ניקוד ("כששרה שרה שירים"). שילוב מנתח נוירוני מבוסס DictaBERT בתוך Elasticsearch מחלץ למות מדויקות לפי ההקשר במשפט, ויחד עם שכבת הווקטורים נותן מענה מושלם לעברית ארגונית וממשלתית.</p>` }));

// ---------------- 08 Words vs Meaning (Hebrew Phrasing Gap) ----------------
S.push(slide({ id: 'h08', steps: 3, foot: 'מילים מול משמעות · גישור על פער השפה', body: `
  <div class="z">
    <div class="eyebrow in1">רלוונטיות · <b>מילים מול משמעות</b></div>
    <h1 class="in2">המשתמש שואל בשפה יומיומית. <span class="b">הנוהל כתוב בשפה רשמית.</span></h1>
  </div>
  <div class="qrow in3">
    <div class="query">
      <span class="tag">שאילתת משתמש <i>· מול מאגר נהלים רשמיים</i></span>
      <div class="qt">״אני נוסע לחופשה בתאילנד ורוצה לקחת את הכדורים הקבועים שלי״</div>
    </div>
    <div class="ask">איזה נוהל אמור לנצח?</div>
  </div>
  <div class="lists in4">
    <div class="lst kw">
      <div class="lh" data-goto="2"><span class="chipf kw">מילות מפתח · BM25</span><span class="lsub">מחפש חפיפת מילים מדויקת</span></div>
      <div class="r"><span class="rk">1</span><div class="ct rv top1" data-s="2"><span class="ti">טופס בקשה ליציאה לחופשה שנתית לעובדים</span><span class="sc"><b>100</b></span></div></div>
      <div class="r"><span class="rk">2</span><div class="ct rv" data-s="2"><span class="ti">החזר הוצאות אש״ל בנסיעות בתפקיד</span><span class="sc"><b>76</b></span></div></div>
      <div class="r"><span class="rk">3</span><div class="ct rv" data-s="2"><span class="ti">בטיחות בשימוש בכדורים וציוד במתקני הארגון</span><span class="sc"><b>64</b></span></div></div>
      <div class="gap"><span class="rv" data-s="2">· · ·</span></div>
      <div class="r"><span class="rk">?</span><div class="ct rv ans" data-s="2"><span class="ti">רפואה בחו״ל והנפקת תרופות מרשם לתקופה ממושכת</span><span class="sc"><b>–</b><i>לא בעשירייה</i></span></div></div>
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="3"><span class="chipf vec">חיפוש סמנטי · jina-v5</span><span class="lsub">מבין הקשר וכוונה</span></div>
      <div class="r"><span class="rk">1</span><div class="ct rv top1 ans" data-s="3"><span class="ti">רפואה בחו״ל והנפקת תרופות מרשם לתקופה ממושכת</span><span class="sc"><b>100</b></span></div></div>
      <div class="r"><span class="rk">2</span><div class="ct rv" data-s="3"><span class="ti">מרפאות מטיילים וחיסונים מומלצים למזרח הרחוק</span><span class="sc"><b>93</b></span></div></div>
      <div class="r"><span class="rk">3</span><div class="ct rv" data-s="3"><span class="ti">נוהל אישור מראש לניפוק תרופות כרוניות</span><span class="sc"><b>89</b></span></div></div>
    </div>
  </div>
  <div class="take rv" data-s="3">BM25 מוצא <span class="kwt">מילים</span>. וקטורים מוצאים <span class="vect">משמעות</span>.</div>
  <div class="note rv" data-s="3">בנוהל ״רפואה בחו״ל״ לא מופיעה אף פעם המילה ״תאילנד״, ״חופשה״ או ״כדורים״.</div>`,
  notes: `<p><b>מקש רווח: תוצאות BM25 ואז תוצאות החיפוש הסמנטי.</b></p><p>דוגמה קלאסית מפער השפה הארגוני: המשתמש כותב "חופשה בתאילנד" ו"כדורים", בזמן שהנוהל הרשמי נקרא "רפואה בחו״ל והנפקת תרופות מרשם". חיפוש מילים נתקע על המילה "חופשה" ומפספס לחלוטין את המסמך הנכון; חיפוש סמנטי מציב אותו במקום הראשון.</p>` }));

// ---------------- 09 Cross-Lingual ----------------
S.push(slide({ id: 'h09', steps: 3, foot: 'חיפוש חוצה-שפות · שאילתה בעברית מול מסמכים באנגלית', body: `
  <div class="z">
    <div class="eyebrow in1">ריבוי שפות טבעי · <b>Multilingual Embeddings</b></div>
    <h1 class="in2">שואלים בעברית. <span class="b">מקבלים תשובה מתיעוד באנגלית.</span></h1>
  </div>
  <div class="heq in3">
    <div class="qt">״איך מתקינים את המערכת בלי חיבור לאינטרנט?״</div>
    <div class="en">מאגר שלם של ספרות טכנית ותיעוד יצרן באנגלית - ללא מילה אחת בעברית באינדקס.</div>
  </div>
  <div class="two">
    <div class="lst kw">
      <div class="lh" data-goto="2"><span class="chipf kw">מילות מפתח · BM25</span></div>
      <div class="zero rv" data-s="2"><div class="stat">0</div><div class="of">תוצאות.<br>אין אף מילה משותפת להשוואה.</div></div>
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="3"><span class="chipf vec">חיפוש סמנטי · jina-v5</span></div>
      <div class="hit rv" data-s="3">
        <div class="r"><span class="rk">1</span><div class="ct top1 ans"><span class="ti">Deploying the Platform in an Air-Gapped Environment</span><span class="sc"><b>100</b></span></div></div>
        <div class="r"><span class="rk">2</span><div class="ct"><span class="ti">Applying Offline Updates and Threat Signatures</span><span class="sc"><b>91</b></span></div></div>
      </div>
      <div class="langs rv" data-s="3"><span>עברית ✓</span><span>English ✓</span><span>العربية ✓</span><span>Русский ✓</span><span>אינדקס אחד ללא תרגום מסמכים</span></div>
    </div>
  </div>
  <div class="take4 rv" data-s="3">המודל רב-לשוני. <span class="b">המסמכים נשארים בשפת המקור שלהם.</span></div>`,
  notes: `<p><b>מקש רווח: אפס תוצאות ב-BM25, ואז פגיעה מדויקת במדריך ה-Air-Gapped באנגלית.</b></p><p>בכל ארגון ישראלי חלק גדול מהתיעוד ההנדסי, הרפואי או הביטחוני כתוב באנגלית, בעוד המשתמשים מעדיפים לשאול בעברית (או בערבית ורוסית). וקטורים רב-לשוניים ממפים את כל השפות לאותו מרחב משמעות - בלי לתרגם מסמכים מראש ובלי לתחזק אינדקסים כפולים.</p>` }));

// ---------------- 10 semantic_text ----------------
S.push(slide({ id: 'h10', steps: 3, foot: 'semantic_text · פשטות הנדסית במאפינג', body: `
  <div class="z">
    <div class="eyebrow in1">איך זה עובד · <b>אפס צנרת חיצונית לתחזוקה</b></div>
    <h1 class="in2"><span class="mono st" dir="ltr">semantic_text</span>\u200F: ההגדרה באינדקס <span class="b">היא ה-Pipeline כולו.</span></h1>
  </div>
  <div class="right-col in3">
    <div class="tag">מה קורה למסמך באופן אוטומטי בעת האינדוקס</div>
    <div class="fl"><span class="nd">body</span>${ARW}<span class="nd">chunking</span>${ARW}<span class="nd eis">EIS · jina-v5-text</span>${ARW}<span class="nd vec">vectors</span>${ARW}<span class="nd">bbq_disk</span></div>
    <div class="fc6 rv" data-s="1"><span class="n">1</span><span><b>שדה אחד במאפינג.</b> חלוקה אוטומטית למקטעים (<span dir="ltr">Chunking</span>), יצירת וקטורים ודחיסה קורים בתוך האינדקס בזמן כתיבה ושאילתה.</span></div>
    <div class="fc6 rv" data-s="2"><span class="n">2</span><span><b>DiskBBQ כברירת מחדל.</b> ביט אחד למימד על הדיסק עם <span dir="ltr">Rescoring</span> מול הווקטור המלא - אותו אינדקס גדל מאלפי מסמכים למאות מיליונים.</span></div>
    <div class="fc6 rv" data-s="3"><span class="n">3</span><span><b>מחליפים Endpoint, שומרים על המאפינג.</b> מעבר מענן למודל מקומי (ELSER,‏ E5 או מודל דרך Eland) דורש שינוי הגדרה אחד בלבד.</span></div>
  </div>
  <div class="left-col in4">
    <div class="cw"><div class="bar"><i></i><i></i><i></i><span>PUT enterprise_kb/_mapping</span></div>
<pre class="code"><span class="k">"body_semantic"</span>: {
  <span class="k">"type"</span>: "semantic_text",
  <span class="k">"inference_id"</span>: "jina-v5-text",
  <span class="k">"index_options"</span>: {
    <span class="k">"dense_vector"</span>: { "type": "bbq_disk" }
  }
}</pre></div>
    <div class="ep"><span class="chipf key">endpoint</span><span class="id">jina-v5-text</span><span>1024 dims · multilingual · cosine</span></div>
  </div>`,
  notes: `<p><b>מקש רווח: שלוש לחיצות על שלושת היתרונות ההנדסיים.</b></p><p>בעבר פרויקט חיפוש וקטורי דרש לכתוב קוד חיצוני שמפרק מסמכים לפסקאות, קורא לשרת Embeddings, שומר מערכי מספרים ומנהל סנכרון. ב-Elasticsearch שדה אחד מסוג semantic_text עושה את כל זה אוטומטית בתוך הקלאסטר.</p>` }));

// ---------------- 11 Hybrid RRF + Single Request ----------------
const row = (cls, id, t, score, extra = '') => `<div class="r ${cls}"><span class="rk">${id}</span><span class="ti">${t}</span><span class="sc"><b>${score}</b>${extra}</span></div>`;
S.push(slide({ id: 'h11', steps: 3, foot: 'חיפוש היברידי · RRF ובקשה אחת לכל המסך', body: `
  <div class="z">
    <div class="eyebrow in1">חיפוש היברידי · <b>Reciprocal Rank Fusion (RRF)</b></div>
    <h1 class="in2">ציונים שונים לא מתערבבים. <span class="b">ממזגים לפי דירוג.</span></h1>
  </div>
  <div class="qline in3"><span class="tag">שאילתה</span><span class="qt" dir="ltr" style="border-right:0;border-left:5px solid var(--blue);padding:0 0 0 14px">TKT-20481</span><span class="note" style="margin:0">חיפוש מזהה פנימי מדויק מתוך תריסר פניות כמעט זהות</span></div>
  <div class="cols3 in4">
    <div class="lst kw">
      <div class="lh" data-goto="1"><span class="chipf kw">BM25</span></div><div class="csub">המזהה המדויק מנצח</div>
      ${row('top1 ans', 1, 'TKT-20481', 100)}${row('', 2, 'TKT-20600', 38)}${row('', 3, 'TKT-20430', 38)}
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="2"><span class="chipf vec">Vector</span></div><div class="csub">מזהים מספריים נראים דומים</div>
      <div class="rv" data-s="2">${row('top1', 1, 'TKT-20430', 100)}${row('', 2, 'TKT-20498', 99)}${row('ans', 3, 'TKT-20481', 99)}</div>
    </div>
    <div class="lst rrf">
      <div class="lh" data-goto="3"><span class="chipf rrf">Hybrid · RRF</span></div><div class="csub" dir="ltr" style="text-align:right">1 / (k + rank)</div>
      <div class="rv" data-s="3">${row('top1 ans', 1, 'TKT-20481', 100)}${row('', 2, 'TKT-20430', 100)}${row('', 3, 'TKT-20498', 97)}</div>
    </div>
  </div>
  <div class="bot rv" data-s="3">
    <div class="msg"><b>הדיוק של BM25 עם ההבנה של וקטורים - בלי לכייל משקולות.</b> מוגדר ב-Retriever יחיד ב-<span class="mono">_search</span> או בפקודת <span class="mono">FORK | FUSE</span> בשפת ES|QL.</div>
    <div class="one-req"><b>בקשה אחת מפעילה את כל העמוד</b>שליפה היברידית, הדגשות (<span dir="ltr">Highlights</span>) וספירות פילוחים (<span dir="ltr">Aggregations</span>) חוזרים בסיבוב רשת יחיד.</div>
  </div>`,
  notes: `<p><b>מקש רווח: חושף את החולשה של וקטורים לבדם במזהים, ואז את המיזוג ההיברידי ב-RRF.</b></p><p>וקטורים מצוינים במשמעות, אבל חלשים במק״טים, תעודות זהות ומספרי קריאות. RRF ממזג את שתי הרשימות לפי מיקום (Rank) ללא צורך בכיול ציונים, ובקשת _search בודדת מחזירה גם את התוצאות, גם את ההדגשות וגם את עצי הסינון בצד העמוד.</p>` }));

// ---------------- 12 Relevance Pyramid ----------------
S.push(slide({ id: 'h12', steps: 4, foot: 'פירמידת הרלוונטיות · שליפה רחבה ודירוג ממוקד', body: `
  <div class="z">
    <div class="eyebrow in1">ארכיטקטורת רלוונטיות · <b>איך הכול מתחבר</b></div>
    <h1 class="in2">שולפים רחב ממיליארדים. <span class="b">משקיעים חישוב איפה שחשוב.</span></h1>
  </div>
  <svg id="pyr" class="iso pyr in3" viewBox="0 0 480 340" role="img" aria-label="פירמידת הרלוונטיות בשלוש שכבות"></svg>
  <div class="tiers">
    <div class="tx t3 rv" data-s="3"><div class="hd"><span class="chipf rr">3 · דירוג מחדש (Rerank) לראש הרשימה</span><span class="lb">מאות מסמכים</span></div><p>מודל <span dir="ltr">Cross-Encoder (jina-reranker-v3)</span> קורא את השאלה והמסמך יחד לעומק. מובנה כ-<span class="mono">text_similarity_reranker</span> או כ-<span class="mono">RERANK</span> ב-ES|QL.</p></div>
    <div class="tx t2 rv" data-s="2"><div class="hd"><span class="chipf key">2 · כוונון עסקי (Tune)</span><span class="lb">אלפי מסמכים</span></div><p>חוקים עסקיים (<span dir="ltr">Query Rules</span>), קידום מקורות סמכותיים, משקולות ליניאריות וסינון הרשאות - ללא שינוי מודלים.</p></div>
    <div class="tx t1 rv" data-s="1"><div class="hd"><span class="chipf rrf">1 · שליפה היברידית: BM25 + Vector</span><span class="lb">מיליארדי מסמכים</span></div><p>מהירה וחסכונית לכל מסמך כך שהיא סורקת את כלל הארגון בשבריר שנייה באמצעות <span class="mono">semantic_text</span>,‏ <span class="mono">rrf</span> ו-DiskBBQ.</p></div>
  </div>
  <div class="cost rv show">כל שכבה בוחנת פחות מועמדים ומשקיעה יותר אינטליגנציה בכל מסמך.</div>
  <div class="rag callout rv" data-s="4"><span class="b">כל הפירמידה הזו מזינה את ה-LLM והסוכן.</span> הקשר מדויק יותר פנימה - תשובות אמינות יותר החוצה.</div>`,
  init: `
    const svg = slide.querySelector('#pyr');
    const tC = performance.now();
    const sc = EW.iso(svg, {ox: 240, oy: 98, s: .9});
    const nowT = () => (performance.now() - tC) / 1000;
    const RED = window.PM3 && PM3.REDUCE;
    const poppy = {top: '#FFFFFF', left: '#FF957D', right: '#343741'};
    sc.rect({x: -26, y: -26, w: 292, d: 292, z: 0, delay: .1});
    const defs = [
      {x: 0,  y: 0,  w: 240, d: 240, z: 0,   h: 56, c: EW.FACES.pink, drop: 220},
      {x: 45, y: 45, w: 150, d: 150, z: 56,  h: 56, c: EW.FACES.blue, drop: 200},
      {x: 85, y: 85, w: 70,  d: 70,  z: 112, h: 56, c: poppy, drop: 190, float: 3}
    ];
    const tiers = defs.map((d, i) => {
      const b = sc.box(Object.assign({}, d, {delay: 1e9, dur: .75, order: i * 10}));
      const fp = i > 0 ? sc.rect({x: d.x, y: d.y, w: d.w, d: d.d, z: d.z, delay: .2, layer: 'top', sw: 1.4}) : null;
      return {b, fp, d, landed: false};
    });
    sc.run();
    function ripple(t){
      const d = t.d, z = d.z + d.h, pts = [[d.x, d.y], [d.x + d.w, d.y], [d.x + d.w, d.y + d.d], [d.x, d.y + d.d]].map(([x, y]) => sc.P(x, y, z).map(v => v.toFixed(1)).join(',')).join(' ');
      const col = ['#F04E98', '#0B64DD', '#FF957D'][tiers.indexOf(t)];
      const r = EW.el('polygon', {points: pts, class: 'ripple', style: 'animation-delay:.62s;stroke:' + col}, svg);
      setTimeout(() => r.remove(), 2200);
      svg.classList.remove('thud'); void svg.getBoundingClientRect(); svg.style.setProperty('--thud-delay', '.6s'); svg.classList.add('thud');
    }
    slide.addEventListener('stepchange', e => {
      const step = e.detail;
      tiers.forEach((t, i) => {
        const on = step >= i + 1;
        if (on && !t.landed) { t.landed = true; t.b.delay = RED ? nowT() - 5 : nowT() + .05; if (!RED) ripple(t); sc.order(); }
        else if (!on && t.landed) { t.landed = false; t.b.delay = 1e9; }
        if (t.fp) t.fp.g.style.display = on ? 'none' : '';
      });
    });`,
  notes: `<p><b>מקש רווח: ארבע לחיצות - כל שכבה בפירמידה נוחתת במקומה, ואז שורת הזנת הסוכן.</b></p><p>אי אפשר להריץ מודל כבד על מיליארד מסמכים, ואי אפשר להסתפק בשליפה גסה כשמזינים LLM. הפירמידה של Elastic פותרת את משוואת העלות-דיוק: שליפה היברידית זולה על מיליארדים, כוונון עסקי על אלפים, ו-Reranker עמוק על העשיריות הראשונות בלבד.</p>` }));

// ---------------- 13 Reranker Motion ----------------
const TICKETS = [
  ['TKT-22228', 'CWP sensor using 600 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21580', 'CWP sensor using 120 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-22971', 'CWP sensor using 85 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21304', 'CWP sensor using 1400 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21563', 'Agents on Windows 11 hosts stopped sending heartbeats', ''],
  ['TKT-22538', 'Agents on Windows 11 hosts stopped sending heartbeats', ''],
  ['TKT-21871', 'Dashboards take 12 seconds to load since upgrading', ''],
  ['TKT-21030', 'Token expired error when enrolling new laptops', ''],
  ['TKT-22067', 'macOS 15 agents cause Finder latency spikes', ''],
  ['TKT-21732', 'Workstation fans spin up every morning around 9am', ''],
  ['TKT-22354', 'Management console returns HTTP 502 after maintenance', ''],
  ['TKT-21988', 'CWP DaemonSet in CrashLoopBackOff on every EKS node', 'ans'],
];
S.push(slide({ id: 'h13', steps: 3, foot: 'דירוג מחדש · המייל האחרון של הרלוונטיות', body: `
  <div class="z">
    <div class="eyebrow in1">המייל האחרון של הדיוק · <b>Cross-Encoder Reranking</b></div>
    <h1 class="in2">דירוג מחדש: <span class="b">ממקום <span dir="ltr">#12</span> ישר למקום <span dir="ltr">#1</span>.</span></h1>
  </div>
  <div class="qline in3"><span class="tag">שאילתה</span><span class="qt">״פודים ב-Kubernetes קורסים בלופ (CrashLoop) אחרי עדכון הסוכן״</span></div>
  <div class="rl in4">
    ${TICKETS.map(([id, t, c], i) => `<div class="it i${i + 1} ${c}"><span class="n">${i + 1}</span><span>${t}</span><span class="s">${id}</span></div>`).join('\n    ')}
  </div>
  <div class="side in4">
    <div class="st8"><span class="chipf rrf">Hybrid · RRF</span><span>המילה <b>Kubernetes</b> חוזרת בעשרות קריאות CPU ודוחקת את התקלה האמיתית למטה.</span></div>
    <div class="st8 rv" data-s="2"><span class="chipf rr">Rerank</span><span>המודל קורא את 50 המועמדים המובילים מול השאלה המלאה ומסדר מחדש.</span></div>
    <div class="pill rv" data-s="2">#12 → #1<span>קפיצה לראש הרשימה</span></div>
    <div class="take8 rv" data-s="3">RRF הוא הצבעה. <span class="b">ה-Reranker קורא ומבין.</span></div>
    <div class="sm8 rv" data-s="3">מופעל בשורת הגדרה אחת: <span class="mono">text_similarity_reranker</span> מעל <span class="mono">rrf</span>, או פקודת <span class="mono">RERANK</span> ב-ES|QL.</div>
  </div>`,
  notes: `<p><b>מקש רווח: תקלת ה-CrashLoopBackOff מזנקת באנימציה ממקום 12 למקום 1.</b></p><p>כאשר חלון ההקשר של סוכן AI מקבל רק את 5 התוצאות הראשונות, מקום 12 משמעותו שהסוכן עיוור לתשובה הנכונה. ה-Reranker קורא את השאלה והמסמך יחד ומקפיץ את שורש התקלה למקום הראשון.</p>` }));

// ---------------- 14 RAG, Agent Builder & Workflows ----------------
S.push(slide({ id: 'h14', steps: 3, foot: 'מחיפוש לפעולה · RAG, Agent Builder ו-Workflows', body: `
  <div class="z">
    <div class="eyebrow in1">למה חיפוש הוא תשתית ה-AI · <b>ארכיטקטורת RAG מאובטחת</b></div>
    <h1 class="in2">מודל שפה מכיר רק <span class="b">את מה שהיה באימון שלו.</span></h1>
  </div>
  <div class="world in3">
    <div class="model">
      <div class="tag">מודל השפה (LLM)</div>
      <h3>תמונת מצב קפואה</h3>
      <p>אינטרנט פומבי, ספרים וקוד. קפוא בנקודת ה-<b>Training Cutoff</b> שלו.</p>
      <div class="stamp">TRAINING CUTOFF</div>
    </div>
    <div class="wall"><span>כאן נעצר הידע של המודל</span></div>
    <div class="data">
      <div class="tag">הדאטה הפנימי של הארגון שלכם</div>
      <div class="dchips">
        <span class="dc">נהלים ומסמכי מקור</span><span class="dc">קריאות שירות ותיקים</span><span class="dc">חוזים והתקשרויות</span><span class="dc">הקלטות ותמלולים</span><span class="dc">צילומי מסך וטפסים</span><span class="dc">מערכות CRM ו-ERP</span>
      </div>
      <p class="never">אף מילה מתוך זה לא הייתה באימון המודל.</p>
    </div>
    <div class="bridge rv" data-s="2"><b>Elasticsearch</b><span>הגשר לדאטה שלכם</span></div>
  </div>
  <div class="pipe rv" data-s="2">
    <div class="nd">שאלה בשפה טבעית</div>${ARW}<div class="nd rrfn"><b>שליפה ודירוג מחדש</b></div>${ARW}<div class="nd">הזרקת הקשר לפי הרשאות</div>${ARW}<div class="nd keyn"><b>תשובה מבוססת מקורות</b></div>
  </div>
  <div class="line rv" data-s="3">החיפוש הוא הדרך שבה ה-LLM <span class="b">פוגש את הארגון שלכם בביטחון.</span><span class="sm">אבל תשובה טובה היא רק ההתחלה - השלב הבא הוא סוכנים מומחים (Agents) ותהליכי ביצוע מבוקרים (Workflows).</span></div>`,
  notes: `<p><b>מקש רווח: חושף את גשר ה-Elasticsearch ואת צינור ה-RAG.</b></p><p>כל ארגון יכול לחבר מודל שפה תוך שעה; האתגר האמיתי הוא לספק למודל בדיוק את הפסקה הנכונה מתוך מיליוני מסמכים תחת הרשאות המשתמש. משם עוברים לשני השקפים הבאים: Agent Builder ו-Elastic Workflows.</p>` }));

// ---------------- 15 Agent Builder Platform ----------------
S.push(slide({ id: 'h15', steps: 3, foot: 'Agent Builder · פלטפורמת סוכני AI ארגונית ב-Kibana', body: `
  <div class="z">
    <div class="eyebrow in1">פלטפורמת סוכנים מובנית · <b>Elastic Agent Builder</b></div>
    <h1 class="in2">סוכני <span dir="ltr">Plug &amp; Play</span> או מומחים מותאמים. <span class="b">בלי לבנות תשתית מאפס.</span></h1>
  </div>
  <div class="kibana-ab in3">
    <div class="kab-bar">
      <span class="dots"><i></i><i></i><i></i><span style="margin-left:6px">Kibana › AI › Agent Builder</span></span>
      <span class="api">POST /api/agent_builder/converse</span>
    </div>
    <div class="kab-tabs">
      <div>סוכנים מובנים (<span dir="ltr">Search · AI SRE · Security</span>)</div>
      <div class="on">★ סוכן מומחה מותאם (<span dir="ltr">Custom Expert</span>)</div>
    </div>
    <div class="kab-body">
      <div class="kab-cfg">
        <div class="kab-fld">
          <label>תפקיד ופרסונה ייעודית (Role &amp; Persona)</label>
          <div class="kab-val"><span>מומחה רגולציה ותחקור חוזים</span><span class="mono" style="font-size:11px;color:var(--blue)">compliance-expert</span></div>
        </div>
        <div class="kab-fld">
          <label>מודל שפה (BYO-LLM לכל סוכן)</label>
          <div class="kab-val"><span dir="ltr" style="font-size:12px">vLLM · Llama-3.3-70B / Claude Sonnet</span><span style="font-size:11px;color:#0A7A76">● מחובר</span></div>
        </div>
        <div class="kab-fld">
          <label>הנחיות מומחה ותחום אחריות (Instructions)</label>
          <div class="kab-prompt">״אתה מומחה ציות ורכש. הצלב סעיפי חוזים מול מדדי SLA חיים ב-ES|QL, בסס כל ממצא על סעיף מקור מדויק, ואל תחרוג מהאינדקסים המורשים.״</div>
        </div>
        <div class="kab-fld">
          <label>כלים ופרוטוקולים מחוברים (Tools · MCP · A2A)</label>
          <div class="kab-tools">
            <span class="t-srch">hybrid_search</span>
            <span class="t-esql">execute_esql</span>
            <span class="t-mcp">MCP · Jira / ERP</span>
            <span class="t-mcp">A2A · finance-agent</span>
            <span class="t-wf">workflow:sla_review</span>
          </div>
        </div>
      </div>
      <div class="kab-sim">
        <div style="font:700 11px var(--sans);color:var(--grey)">בדיקה חיה ושקיפות הרצה (Live Trace)</div>
        <div class="kab-u">אילו ספקי תשתית חרגו מיעד ה-SLA ברבעון הנוכחי ומה סעיף הקנס בחוזה שלהם?</div>
        <div class="kab-tr">
          <b>✓ execute_esql</b> · 21ms · 2 vendors &gt; threshold<br>
          <b>✓ hybrid_search</b> · 39ms · Contracts_2026 #sec-8.2
        </div>
        <div class="kab-a">זוהו <b>2 ספקים</b> בחריגת זמינות מעל 1.8%. לפי <b>סעיף 8.2ב</b> בחוזה האחיד קיימת זכאות לזיכוי רבעוני אוטומטי. להפעיל תהליך בדיקה?</div>
      </div>
    </div>
    <div class="kab-foot">
      <span>🔒 אכיפת RBAC אוטומטית: הסוכן יורש את הרשאות המשתמש (<span dir="ltr">DLS / FLS</span>)</span>
      <span class="mono" style="font-size:11px">trace_id: ab-90412</span>
    </div>
  </div>
  <div class="ab-pts in4">
    <div class="ab-pt hl rv" data-s="1">
      <b>1 · סוכנים מובנים + מומחים תפורים לתפקיד</b>
      <p>מתחילים מיד עם סוכני המדף של Elastic, ומקימים תוך דקות <b>סוכנים מומחים ייעודיים</b> (רגולציה, תחקור, מחקר קליני, FinOps) עם הנחיות ואינדקסים מוגדרים.</p>
    </div>
    <div class="ab-pt rv" data-s="2">
      <b>2 · כלים דטרמיניסטיים ופרוטוקולים פתוחים</b>
      <p>הסוכן מריץ חיפוש היברידי ושאילתות <span class="mono">ES|QL</span> מדויקות, מתחבר למערכות הארגון ב-<b dir="ltr">MCP</b>, ומאציל משימות לסוכנים אחרים ב-<b dir="ltr">A2A</b>.</p>
    </div>
    <div class="ab-pt rv" data-s="3">
      <b>3 · חוסך לצוותי הפיתוח חודשים של צנרת DIY</b>
      <p>בלי לבנות ולתחזק תשתית <span dir="ltr">LangChain</span> נפרדת לכל פרויקט: ניהול הרשאות, זיכרון שיחה, לוגי ביקורת ו-API אחיד לאפליקציות שלכם כבר בפנים.</p>
    </div>
  </div>
  <div class="take15 rv" data-s="3">מגדירים סוכן מומחה ב-Kibana בדקות. <span class="b">וחושפים אותו לכל מערכת ארגונית ב-API מאובטח אחד.</span></div>`,
  notes: `<p><b>מקש רווח: שלוש לחיצות - מציג CTO את הערך ההנדסי של Agent Builder כפלטפורמה אחודה.</b></p><p>במקום שכל צוות פיתוח ימציא מחדש ניהול פרומפטים, הרשאות משתמש, חיבור לכלים ולוגי ביקורת בקוד פיתון נפרד, Agent Builder ב-Kibana נותן גם סוכני Plug & Play מוכנים וגם סטודיו להקמת סוכנים מומחים לכל תפקיד בארגון - עם תמיכה מובנית ב-ES|QL,‏ MCP ו-A2A.</p>` }));

// ---------------- 16 Elastic Workflows ----------------
S.push(slide({ id: 'h16', steps: 3, foot: 'Elastic Workflows · אוטומציה דטרמיניסטית ושערי אישור', body: `
  <div class="z">
    <div class="eyebrow in1">אורקסטרציה ובקרה הנדסית · <b>Elastic Workflows</b></div>
    <h1 class="in2">הסוכן מנתח בהסתברות. <span class="b">ה-Workflow מבצע בדטרמיניזם.</span></h1>
  </div>
  <div class="wf-pipe in3">
    <div class="wf-nd"><i>1 · טריגר</i><b>אירוע, תזמון או סוכן</b><span>חוק התראה, Cron,‏ API או קריאת כלי מסוכן</span></div>${ARW}
    <div class="wf-nd"><i>2 · איסוף ראיות</i><b>שליפה מרובת מקורות</b><span>שאילתות ES|QL וחיפוש היברידי מתועד</span></div>${ARW}
    <div class="wf-nd"><i>3 · שיקול דעת</i><b>צעד AI ממוקד</b><span>סוכן שמנתח את הראיות ומנסח המלצה</span></div>${ARW}
    <div class="wf-nd gate"><i>4 · שער בקרה</i><b><span dir="ltr">waitForApproval</span></b><span>עצירה קשיחה לאישור אנושי לפני שינוי</span></div>${ARW}
    <div class="wf-nd act"><i>5 · ביצוע מבוקר</i><b>רץ תחת זהות המאשר</b><span>Jira,‏ ServiceNow,‏ Slack,‏ ERP או אינדוקס</span></div>${ARW}
    <div class="wf-nd"><i>6 · ביקורת</i><b>Audit Trail מלא</b><span>מי המליץ, מי אישר ומה בוצע בפועל</span></div>
  </div>
  <div class="wf-yaml in4">
    <div class="cw"><div class="bar"><i></i><i></i><i></i><span>Kibana › Workflows · sla_remediation_runbook.yaml</span></div>
<pre class="code"><span class="k">triggers:</span>
  - type: <span class="ok">agent_tool</span>          <span class="cm"># Agent Builder, alert, or cron</span>
<span class="k">steps:</span>
  - name: gather_evidence
    type: elasticsearch.esql  <span class="cm"># deterministic data fetch</span>
  - name: assess_impact
    type: ai.agent            <span class="cm"># bounded reasoning step</span>
  - name: executive_gate
    type: <span class="gt">waitForApproval</span>     <span class="cm"># hard pause for human sign-off</span>
    expires_after: 24h
  - name: update_enterprise_sys
    type: http.connector      <span class="cm"># Jira / ERP · runs as approver</span></pre></div>
  </div>
  <div class="wf-pts in4">
    <div class="wf-pt rv" data-s="1" style="--c:#0B64DD">
      <b>הפרדה ארכיטקטונית בין חשיבה לביצוע</b>
      <span>מודל שפה מצוין בהבנת הקשר אך אסור לתת לו גישה חופשית לשינוי פרודקשן. ה-Workflow עוטף כל פעולה בלוגיקה קשיחה, <span dir="ltr">retries</span> וטיפול בשגיאות.</span>
    </div>
    <div class="wf-pt rv" data-s="2" style="--c:#FEC514">
      <b>בקרה אנושית בקוד המנוע - לא כ״בקשה בפרומפט״</b>
      <span>צעד <span class="mono">waitForApproval</span> עוצר פיזית את הריצה עד לאישור גורם מוסמך, והפעולה מתבצעת תחת <b>הרשאת וזהות המאשר</b>.</span>
    </div>
    <div class="wf-pt rv" data-s="3" style="--c:#48EFCF">
      <b>Runbooks כקוד YAML בתוך הפלטפורמה</b>
      <span>קריא, מנוהל בגרסאות (<span dir="ltr">GitOps / PR</span>) ורץ ישירות ב-Kibana - חוסך רכישה, אינטגרציה ותחזוקה של כלי SOAR ואוטומציה חיצוניים.</span>
    </div>
  </div>
  <div class="take16 rv" data-s="3">אפס ״סוכנים סוררים״ בפרודקשן: <span class="b">הגמישות של AI עם המשמעת ההנדסית של קוד.</span></div>`,
  notes: `<p><b>מקש רווח: שלוש לחיצות על שלושת עקרונות הבקרה ההנדסית ל-CTO ול-CISO.</b></p><p>החשש מספר 1 של כל CTO מהטמעת סוכני AI הוא פעולות לא צפויות בפרודקשן. השילוב בין Agent Builder ל-Elastic Workflows פותר זאת מהשורש: הסוכן חוקר וממליץ, וה-Workflow מבצע בצורה דטרמיניסטית לחלוטין עם שערי אישור מובנים ותיעוד מלא.</p>` }));

// ---------------- 17 Multimodal Vector Space ----------------
S.push(slide({ id: 'h17', steps: 3, foot: 'מרחב וקטורי אחוד · טקסט, תמונות, קול ווידאו', body: `
  <div class="z">
    <div class="eyebrow in1">מולטי-מודאליות מובנית · <b>jina-embeddings-v5-omni</b></div>
    <h1 class="in2">מרחב חיפוש אחד <span class="b">לטקסט, תמונות, שמע ווידאו.</span></h1>
  </div>
  <div class="plot in3"><canvas id="cloud10"></canvas></div>
  <div class="legend in4"><span class="c4"><i></i>מסמכים ותמלולים</span><span class="c6"><i></i>תמונות ותרשימים</span><span class="c0"><i></i>הקלטות שמע</span><span class="key"><i style="background:#0B64DD;box-shadow:0 0 0 3px #D9E8FF"></i>שאילתה</span></div>
  <div class="caps in4">
    <div class="cap10 rrf rv" data-s="1"><b>טקסט מוצא תמונות ותרשימים</b><span class="q">״מי כפוף ל-CISO במבנה הארגוני?״</span><span>מחזיר ישירות את תמונת עץ המבנה הארגוני - ללא תיוג ידני וללא כתוביות.</span></div>
    <div class="cap10 vec rv" data-s="2"><b>צילום מסך מוצא הקלטת שיחה</b><span class="q">גרירת צילום מסך של שגיאת ERR-4471</span><span>התוצאה הראשונה: הקלטת שיחה של משתמש שדיווח בדיוק על אותה תקלה.</span></div>
    <div class="cap10 key rv" data-s="3"><b>כל שפה מול כל פורמט קובץ</b><span class="q">״חשבונית עם סכום לתשלום״</span><span>שאילתה בעברית מאתרת צילום חשבונית באנגלית מתוך אותו אינדקס בדיוק.</span></div>
  </div>
  <div class="vid rv" data-s="3">אודיו מאונדקס מתוך תמלול ווידאו מוסיף פריימים דגומים לאותו מרחב וקטורי - מנגנון השליפה נשאר זהה לחלוטין.</div>`,
  init: `
    const cv = slide.querySelector('#cloud10');
    const C = PM3.Cloud(cv, {W: 680, H: 420, pitch: .4, spin: .14, D: 3.4});
    C.text = (s, x, y, col, size, weight) => {
      const g = C.g; g.save();
      g.direction = /[\\u0590-\\u05FF]/.test(s) ? 'rtl' : 'ltr';
      g.font = (weight || 600) + ' ' + (size || 12.5) + "px 'Heebo','IBM Plex Mono',sans-serif";
      g.textAlign = 'center'; g.lineWidth = 4; g.strokeStyle = '#fff'; g.lineJoin = 'round'; g.globalAlpha = 1;
      g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore();
    };
    const R = EW.rand(11);
    const CL = [
      {c: '#0B64DD', n: 70, cx: -.55, cy: .05, cz: .2, sp: .36},
      {c: '#F04E98', n: 40, cx: .62, cy: -.1, cz: -.3, sp: .3},
      {c: '#02BCB7', n: 14, cx: .1, cy: .5, cz: .75, sp: .18}
    ];
    const pts = [];
    CL.forEach((k, ci) => { for (let i = 0; i < k.n; i++) { const g = () => (R() + R() + R() - 1.5) * k.sp; pts.push({x: k.cx + g(), y: k.cy + g(), z: k.cz + g(), c: k.c, ci}); } });
    const SP = {
      dialog: {x: .80, y: .12, z: -.25, c: '#F04E98', lab: 'Screenshot: ERR-4471'},
      voice: {x: .22, y: .44, z: .55, c: '#02BCB7', lab: 'Audio: token expired'},
      org: {x: .42, y: -.24, z: .0, c: '#F04E98', lab: 'Org chart image'},
      inv: {x: .67, y: -.42, z: -.5, c: '#F04E98', lab: 'Invoice scan'},
      q1: {x: -.34, y: -.34, z: .2, lab: 'מי כפוף ל-CISO?'},
      q3: {x: 1.06, y: -.28, z: -.18, lab: 'חשבונית לתשלום'}
    };
    let t0 = null;
    C.onFrame = (t) => {
      const step = +slide.dataset.step || 1;
      if (t0 === null) t0 = t;
      const k = PM3.ease((t - t0) / 1.4);
      pts.forEach((p, i) => { const q = C.project(p.x, p.y, p.z); const a = Math.min(1, k * 2 - i / pts.length); if (a <= 0) return; C.add(q[3], () => C.dot(q[0], q[1], 3.2 * q[2] / (C.H * 2.15 / 3.4), p.c, .85 * a)); });
      const big = (s, r, ring) => { const q = C.project(s.x, s.y, s.z); C.add(q[3] - 1, () => { if (ring) { C.dot(q[0], q[1], r + 5, '#fff', 1); C.dot(q[0], q[1], r + 3, s.c || '#0B64DD', .35); } C.dot(q[0], q[1], r, s.c || '#0B64DD', 1); }); return q; };
      const link = (a, b, col) => { const qa = C.project(a.x, a.y, a.z), qb = C.project(b.x, b.y, b.z); C.add(-99, () => { C.line(qa, qb, col, .9, 2); C.text(a.lab, qa[0], qa[1] - 14, '#1D1E24', 12, 600); C.text(b.lab, qb[0], qb[1] - 14, '#1D1E24', 12, 600); }); };
      if (step >= 1) { big(SP.org, 5, true); const q = C.project(SP.q1.x, SP.q1.y, SP.q1.z); C.add(q[3] - 2, () => C.diamond(q[0], q[1], 7, '#0B64DD', '#fff', 1)); link(SP.q1, SP.org, '#0B64DD'); }
      if (step >= 2) { big(SP.dialog, 5, true); big(SP.voice, 5, true); link(SP.dialog, SP.voice, '#02BCB7'); }
      if (step >= 3) { big(SP.inv, 5, true); const q = C.project(SP.q3.x, SP.q3.y, SP.q3.z); C.add(q[3] - 2, () => C.diamond(q[0], q[1], 7, '#0B64DD', '#fff', 1)); link(SP.q3, SP.inv, '#0B64DD'); }
    };`,
  notes: `<p><b>מקש רווח: שלוש לחיצות - כל לחיצה מדליקה קשר חוצה-מדיה בענן הווקטורים התלת-ממדי.</b></p><p>ידע ארגוני לא חי רק בקובצי טקסט נקיים: הוא נמצא בתרשימי זרימה, צילומי מסך, הקלטות מוקד וסריקות. מודל מולטי-מודאלי ממפה את כולם לאותו מרחב וקטורי ב-Elasticsearch.</p>` }));

// ---------------- 18 OCR & Mixed RTL/LTR ----------------
S.push(slide({ id: 'h18', steps: 3, foot: 'OCR וחילוץ מסמכים · עברית ואנגלית מעורבת, ענן ונתק מלא', body: `
  <div class="z">
    <div class="eyebrow in1">חילוץ מסמכים מהעולם האמיתי · <b>jina-ocr-v1 מול מנוע מקומי</b></div>
    <h1 class="in2">צילום מהנייד וטפסים סרוקים <span class="b">הופכים מיד לדאטה בר-חיפוש.</span></h1>
  </div>
  <div class="photo in3">
    <img src="${EMB.phone}" alt="צילום נייד של חשבונית בזווית ובתאורה חלשה">
    <span class="tag" dir="ltr">invoice-phone-photo.jpg <i>· skewed, noisy</i></span>
    <div class="pdf-note"><b>ומה עם קובצי PDF סרוקים בני מאות עמודים?</b><br>כל עמוד עובר OCR, מתפצל למקטעים ומאונדקס תוך שניות לחיפוש ברמת העמוד המדויק.</div>
  </div>
  <div class="eng in4">
    <div class="cw"><div class="bar"><i></i><i></i><i></i><span>jina-ocr-v1 · Elastic Inference Service · Clean Markdown</span></div>
<pre class="code"><span class="ok">INVOICE</span> · Invoice no. <span class="ok">INV-2026-00817</span> · Date 2026-07-01
Bill to: Northwind Energy Cooperative (<span class="ok">ACC-10234</span>)
Endpoint Protection · 4,200 endpoints x 12 months   $168,000.00
Total due <span class="ok">$344,400.00</span></pre></div>
    <div class="rtl-ocr rv" data-s="2">
      <div class="hd"><span class="tag">האתגר הישראלי: עברית + אנגלית + מספרים באותה שורה</span><span class="chipf vec" style="padding:4px 8px;font-size:11.5px">דיוק דו-כיווני מלא</span></div>
      <div class="good"><span dir="ltr">✓ jina-ocr-v1:</span>\u200F ״התחייבות לבדיקת <span dir="ltr">MRI</span> עמוד שדרה · ערך <span dir="ltr">HbA1c 6.1%</span>״</div>
      <div class="garb">✗ OCR קלאסי ללא הבנת הקשר הופך כיווניות ומשבש מונחים רפואיים, מק״טים וסכומים.</div>
    </div>
    <div class="cw loc rv" data-s="3"><div class="bar"><i></i><i></i><i></i><span>Tesseract · Local Air-Gapped Fallback · 0.4 s</span></div>
<pre class="code">Bill to: Northwind Energy Cooperative (<span class="ok">ACC-10234</span>) · Total due <span class="ok">$344,400.00</span></pre></div>
  </div>
  <div class="take11 rv" data-s="3">מודל ענן לדיוק מקסימלי בעברית משולבת אנגלית, <span class="b">ומנוע מקומי בנתק מלא במתג אחד.</span></div>`,
  notes: `<p><b>מקש רווח: מדגים דיוק על צילום עקום מהנייד, טיפול בטפסים דו-כיווניים בעברית+אנגלית, ומעבר חלק למנוע מקומי בנתק מלא.</b></p>` }));

// ---------------- 19 Air-Gapped ----------------
S.push(slide({ id: 'h19', steps: 3, foot: 'נתק מלא ועצמאות ארכיטקטונית · Air-Gapped', body: `
  <div class="z">
    <div class="eyebrow in1">ריבונות ועצמאות · <b>ענן היברידי ונתק מלא (Air-Gapped)</b></div>
    <h1 class="in2">רץ בדיוק באותו אופן <span class="b">גם ברשת סגורה לחלוטין.</span></h1>
  </div>
  <svg id="hero12" class="iso in3" viewBox="0 0 540 470"></svg>
  <div class="tbl in4">
    <div class="th"><span>יכולת</span><span>בענן (EIS מנוהל)</span><span>בנתק מלא (בתוך הקלאסטר)</span></div>
    <div class="trw"><b>וקטורים לטקסט</b><span class="mono">jina-embeddings-v5</span><span>ELSER,‏ E5,‏ DictaBERT או כל מודל דרך Eland</span></div>
    <div class="trw"><b>מולטי-מודאלי</b><span class="mono">jina-v5-omni</span><span>מודלי משפחת CLIP דרך Eland</span></div>
    <div class="trw"><b>דירוג מחדש</b><span class="mono">jina-reranker-v3</span><span>Elastic Rerank או Cross-Encoder מקומי</span></div>
    <div class="trw"><b>מודל שפה (LLM)</b><span class="mono">Elastic Managed LLM</span><span>vLLM,‏ Ollama או NVIDIA NIM פנים-ארגוני</span></div>
    <div class="trw"><b>חילוץ טקסט (OCR)</b><span class="mono">jina-ocr-v1</span><span>Tesseract או שירות Vision מקומי</span></div>
    <div class="trw"><b>סוכנים ואוטומציה</b><span class="mono">Agent Builder</span><span>זהה לחלוטין בתוך Kibana המקומי</span></div>
  </div>
  <div class="line12 rv" data-s="2">נקודת הקצה (<span dir="ltr">Inference Endpoint</span>) היא שכבת ההפשטה: <span class="b">קוד האפליקציה לא משתנה.</span><span class="sm rv" data-s="3"><b>אפס שרשרת תלויות חיצונית:</b> ספק אחד מספק יחד את מנוע השליפה, ה-Reranker,‏ ES|QL, בקרת ההרשאות, הסוכנים וה-Workflows. בחירת המודל והאירוח נשארת תמיד בידיים שלכם.</span></div>`,
  init: `
    const sc = EW.iso(slide.querySelector('#hero12'), {ox: 262, oy: 120, s: .76});
    sc.rect({x: -40, y: -40, w: 360, d: 360, z: 0, delay: .1, dash: '6 6', sw: 2});
    sc.label({at: [320, 320, 0], side: 'r', len: 22, title: 'ללא יציאה לאינטרנט', raw: true, delay: .5, size: 12});
    sc.box({x: 0, y: 0, w: 280, d: 280, h: 40, c: 'blue', delay: .2, drop: 120, order: -1000});
    const poppy = {top: '#FFFFFF', left: '#FF957D', right: '#343741'};
    const cubes = [[20, 20, 'teal', 70], [110, 20, poppy, 60], [200, 20, 'yellow', 50], [20, 150, 'pink', 56], [110, 150, 'ink', 64], [200, 150, 'slate', 44]];
    cubes.forEach(([x, y, c, h], i) => { sc.box({x, y, w: 64, d: 64, h, z: 40, c, delay: .6 + i * .12, drop: 100, float: 2.5, floatSpeed: 1.1 + i * .07, phase: i, order: 10 + i}); });
    sc.label({at: [84, 20, 110], side: 'r', len: 28, title: 'מודלי וקטורים', sub: 'ELSER / E5 / Eland', raw: true, delay: 1.5});
    sc.label({at: [264, 20, 90], side: 'r', len: 32, title: 'חילוץ מסמכים', sub: 'Tesseract OCR', raw: true, delay: 1.65});
    sc.label({at: [264, 214, 62], side: 'r', len: 56, title: 'סוכנים ואוטומציה', sub: 'Agent Builder · Kibana', raw: true, delay: 1.8});
    sc.label({at: [20, 214, 68], side: 'l', len: 34, title: 'מודל שפה מקומי', sub: 'vLLM / Ollama / NIM', raw: true, delay: 1.95});
    sc.run();`,
  notes: `<p><b>מקש רווח: שורת ההפשטה הארכיטקטונית ואז עצמאות הספק (ללא תלות בשרשרת תוספים חיצוניים).</b></p><p>קריטי למגזר הביטחוני, הממשלתי, הפיננסי והבריאותי בישראל: אפשר לפתח בענן או בסביבת פיתוח ולהעביר לרשת סגורה לחלוטין (Air-Gapped) בלי לשנות שורת קוד אחת באפליקציה.</p>` }));

// ---------------- 20 Closing Summary ----------------
S.push(slide({ id: 'h20', steps: 1, foot: 'Elastic · פלטפורמת Search AI אחת להכול', body: `
  <div class="z">
    <div class="eyebrow in1">השורה התחתונה · <b>עוצמת ה-Search AI של Elastic</b></div>
    <h1 class="in2">מנוע החיפוש <span dir="ltr">#1</span> בעולם.<br><span class="b">ומסד הנתונים הווקטורי <span dir="ltr">#1</span> בעולם.</span></h1>
    <p class="sub in3">פלטפורמה אחת ללא קוד הדבקה. עברית ברמת שפת אם. מוכחת במערכות הליבה של ישראל - בענן ובנתק מלא.</p>
  </div>
  <svg id="hero13" class="iso" viewBox="0 0 520 400"></svg>
  <div class="caps in4">
    <div class="cap kw"><span class="chipf kw">לקסיקלי + עברית</span><div><b>BM25 + DictaBERT</b><span>מזהים מדויקים, שורשים בעברית ופילוחים בבקשה אחת</span></div></div>
    <div class="cap vec"><span class="chipf vec">וקטורי</span><div><b><span dir="ltr">semantic_text</span></b><span>חלוקה למקטעים, אינדוקס וריבוי שפות אוטומטי במאפינג</span></div></div>
    <div class="cap rrf"><span class="chipf rrf">היברידי</span><div><b>RRF + ES|QL</b><span>מיזוג דירוגים ו-<span class="mono" dir="ltr">FORK | FUSE</span> בשאילתה אחת</span></div></div>
    <div class="cap rr"><span class="chipf rr">דירוג מחדש</span><div><b>Cross-Encoder Rerank</b><span>מקפיץ את תשובת האמת ממקום <span dir="ltr">#12</span> למקום <span dir="ltr">#1</span></span></div></div>
    <div class="cap key"><span class="chipf key">סוכני AI</span><div><b><span dir="ltr">Agent Builder + Workflows</span></b><span>תשובות מבוססות הרשאות ומעבר אוטומטי לפעולה</span></div></div>
    <div class="cap sl"><span class="chipf sl">קנה מידה</span><div><b>DiskBBQ</b><span>פי 32 פחות זיכרון RAM למיליארדי וקטורים בפרודקשן</span></div></div>
  </div>`,
  init: `
    const sc = EW.iso(slide.querySelector('#hero13'), {ox: 250, oy: 90, s: .86});
    sc.rect({x: -26, y: -26, w: 322, d: 322, z: 0, delay: .1});
    sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .15, drop: 120, order: -1000});
    const poppy = {top: '#FFFFFF', left: '#FF957D', right: '#343741'};
    const cubes = [[22, 34, 'yellow', 92], [105, 34, 'teal', 72], [188, 34, 'pink', 52], [22, 150, poppy, 70], [105, 150, 'blue', 56], [188, 150, 'slate', 40]];
    cubes.forEach(([x, y, c, h], i) => sc.box({x, y, w: 60, d: 60, h, z: 46, c, delay: .55 + i * .12, drop: 100, float: 2.5, floatSpeed: 1.1 + i * .07, phase: i, order: 10 + i}));
    sc.run();`,
  notes: `<p><b>סיכום להנהלה ומעבר לשאלות או להדגמה חיה:</b> במקום לחבר חמישה כלים שונים - מנוע חיפוש, מסד וקטורי צדדי, שירות OCR, תשתית הרשאות ומסגרת סוכנים - מקבלים את הפלטפורמה שמדורגת #1 בעולם גם ב-Enterprise AI Search וגם ב-Vector DBMS, מוכחת במערכות הקריטיות ביותר בישראל.</p>` }));

const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Elastic Search AI · מצגת הנהלה</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${fonts}
${base}
${CSS}
</style>
</head>
<body>
<div id="stage">
${S.join('\n')}
</div>
<nav id="bar" dir="ltr" aria-label="Slide navigation"><button id="btn-prev" type="button" aria-label="Previous"><svg class="arw rev" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>Prev</button><span id="count" aria-live="polite">1 / 1</span><span class="sp"></span><button id="btn-overview" type="button" aria-label="Overview of all slides" aria-haspopup="dialog"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM8 8h5v5H8z" fill="currentColor"/></svg>כל השקפים</button><span class="sp"></span><button id="btn-next" type="button" aria-label="Next">Next<svg class="arw" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></nav>
<div id="overview" role="dialog" aria-modal="true" aria-label="כל השקפים" hidden><div class="ovh" style="direction:rtl;letter-spacing:0;text-transform:none">כל השקפים <span>לחצו על שקף למעבר מהיר, או Esc לסגירה</span></div><div class="ovg" id="ovg"></div></div>
<aside id="notes"><div class="nh"><span>הערות למציג</span><span id="notes-n"></span></div><div id="notes-body"></div><div class="nf">לחצו N להסתרה</div></aside>
<script>
${ew}
</script>
<script>
${pm3}
</script>
<script>
${player}
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, (html.length / 1024).toFixed(0) + ' KB', S.length, 'slides', 'em dashes:', (html.match(/—/g) || []).length);
