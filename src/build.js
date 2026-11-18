// Assembles the Dream briefing as a single self-contained HTML deck in the
// Elastic web-kit format (1280x720 stage, step reveals, isometric scenes,
// point cloud). Engine, fonts and chrome are reused verbatim from the kit.
const fs = require('fs');
const path = require('path');
const D = __dirname;
const OUT = process.argv[2] || path.join(D, 'Elastic_Search_AI_Dream.html');
const r = (f) => fs.readFileSync(path.join(D, f), 'utf8');
const fonts = r('fonts.css'), base = r('base.css'), ew = r('lib-ew.js'), pm3 = r('lib-pm3.js'), player = r('player.js'), MARK = r('mark.svg');
const EMB = JSON.parse(r('embeds.json'));
const ARW = '<svg class="arw" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const foot = (t) => `<div class="ew-foot"><span class="lg">${MARK} elastic</span><span class="rt"><span>${t}</span></span></div>`;
const slide = ({ id, steps = 1, foot: f, cls = '', body, init = '', notes = '' }) =>
  `<section class="slide ${cls}" id="${id}" data-steps="${steps}" data-foot="${f}">\n${body}\n${init ? `  <script type="text/plain" class="init">\n${init}\n  </script>\n` : ''}${foot(f)}\n<aside class="nt">${notes}</aside>\n</section>\n`;

const CSS = `
/* ---------- deck layer ---------- */
html,body{margin:0;background:#fff}
body{position:fixed;inset:0;overflow:hidden}
:root{--bar:44px}
#stage{position:absolute;left:0;top:0;width:1280px;height:720px;transform-origin:0 0}
.slide{font-size:18px}
h1{font-size:46px;letter-spacing:-1.5px}
.slide [data-goto]{cursor:pointer}
.ew-foot{color:var(--grey)}
.ew-foot .rt{display:flex;gap:22px;align-items:center}
.kw{--c:#FEC514;--ct:#8A6500;--cl:#FFF4CC}
.vec{--c:#48EFCF;--ct:#0A7A76;--cl:#DDFBF5}
.rrf{--c:#F04E98;--ct:#BD2A72;--cl:#FDE6F1}
.rr{--c:#FF957D;--ct:#B84A2E;--cl:#FFE9E3}
.key{--c:#0B64DD;--ct:#0B64DD;--cl:#D9E8FF}
.kwt{color:#8A6500}.vect{color:#0A7A76}.rrft{color:#BD2A72}.rrt{color:#B84A2E}
.chipf{display:inline-block;background:var(--c);color:var(--ink);font:600 13px/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:7px 12px;white-space:nowrap}
.chipf.key{color:#fff}
.chipf.ink{background:#343741;color:#fff}
.chipf.sl{background:#B5BFCE}
.chipf.lc{text-transform:none;letter-spacing:.02em}
.arw{width:22px;height:11px;flex:none;color:var(--ink)}
.rv{opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease;pointer-events:none}
.rv.show{opacity:1;transform:none;pointer-events:auto}
.cw{background:#fff;border:1px solid var(--ink);box-shadow:6px 6px 0 var(--blue)}
.cw .bar{height:26px;border-bottom:1px solid var(--ink);display:flex;align-items:center;gap:6px;padding:0 10px;font:600 11px var(--mono);letter-spacing:.06em;text-transform:uppercase}
.cw .bar i{width:8px;height:8px;border:1px solid var(--ink);border-radius:50%}
.cw .bar span{margin-left:6px}
.code{font:400 15px/1.55 var(--mono);color:var(--char);padding:9px 14px;margin:0;white-space:pre}
.code .k{color:var(--blue);font-weight:600}
.lst .lh{display:flex;align-items:center;gap:12px;padding-bottom:12px;border-bottom:2px solid var(--c,var(--ink))}
.lst .lsub{font-size:18px;color:var(--grey)}
.r{display:grid;grid-template-columns:28px 1fr auto;align-items:center;column-gap:10px;border-bottom:1px solid var(--line);position:relative}
.rk{font:500 14px var(--mono);color:var(--grey)}
.ti{font:500 16px/1.25 var(--sans);letter-spacing:-.1px;color:var(--ink)}
.sc{text-align:right;white-space:nowrap}
.sc b{display:block;font:600 28px/1 var(--mono);color:var(--ct,var(--ink));letter-spacing:-.5px}
.sc i{display:block;font:400 11px var(--mono);color:var(--grey);font-style:normal;margin-top:3px}
.top1{background:var(--cl);box-shadow:inset 4px 0 0 var(--c)}
.qt{font:400 22px/1.3 var(--mono);letter-spacing:-.4px;border-left:4px solid var(--blue);padding-left:16px;color:var(--ink)}
.take{margin-top:20px;font:600 36px/1.1 var(--sans);letter-spacing:-1.1px}
.take .kwt{box-shadow:inset 0 -10px 0 #FEC514}
.take .vect{box-shadow:inset 0 -10px 0 #48EFCF}
.note{margin-top:8px;font-size:18px;color:var(--grey)}
.callout{background:#D9E8FF;border-left:6px solid #0B64DD;padding:14px 22px;font:600 24px/1.3 var(--sans);letter-spacing:-.5px;color:var(--ink)}
.callout .b{color:var(--blue)}

/* 01 title */
#d01 h1{font-size:78px;line-height:.98;letter-spacing:-3.2px;margin-top:150px}
#d01 .sub{font-size:24px;max-width:470px;margin-top:26px;color:var(--grey)}
#d01 .by{margin-top:38px;font-size:20px;display:flex;gap:12px;color:var(--char)}
#d01 .by b{color:var(--ink);font-weight:600}
#hero{left:600px;top:0;width:680px;height:720px}

/* 02 vector db */
#d02 .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:46px}
#d02 .fc{display:flex;flex-direction:column;border:1px solid var(--line);background:#fff;padding:0 26px 28px;min-height:316px;transition:box-shadow .3s,border-color .3s;--ac:var(--c)}
#d02 .fc .bar{display:flex;height:10px;margin:0 -26px 24px;background:var(--c)}
#d02 .fc .bar i{flex:1}
#d02 .fc .bar i.kw{background:#FEC514}#d02 .fc .bar i.vec{background:#48EFCF}
#d02 .fc h3{font:600 30px/1.15 var(--sans);letter-spacing:-.9px;margin:10px 0 14px;color:var(--ink)}
#d02 .fc p{font-size:20px;line-height:1.5;color:var(--char)}
#d02 .fc:nth-child(1){--ac:#FEC514}#d02 .fc:nth-child(2){--ac:#0B64DD}#d02 .fc:nth-child(3){--ac:#F04E98}
#d02[data-step="1"] .fc:nth-child(1),#d02[data-step="2"] .fc:nth-child(2),#d02[data-step="3"] .fc:nth-child(3){border-color:var(--ink);box-shadow:8px 8px 0 var(--ac)}
#d02 .cubes{display:flex;gap:6px;margin-top:auto;padding-top:22px}
#d02 .cubes i{display:block;width:22px;height:22px;border:1px solid var(--ink)}
#d02 .cubes i.y{background:#FEC514}#d02 .cubes i.t{background:#48EFCF}#d02 .cubes i.b{background:#0B64DD}#d02 .cubes i.p{background:#F04E98}
#d02 .cubes.dec i:nth-child(1){width:22px;height:22px}#d02 .cubes.dec i:nth-child(2){width:18px;height:18px}#d02 .cubes.dec i:nth-child(3){width:14px;height:14px}#d02 .cubes.dec i:nth-child(4){width:11px;height:11px}#d02 .cubes.dec i:nth-child(5){width:8px;height:8px}#d02 .cubes.dec i:nth-child(6){width:6px;height:6px}
#d02 .cubes.dec{align-items:flex-end}
#d02 .promise{margin-top:44px;font:600 34px/1.15 var(--sans);letter-spacing:-1px}

/* 03 words vs meaning, 04 hebrew */
.qrow{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:20px}
.qrow .query .tag{display:block;margin-bottom:8px}
.qrow .ask{font:600 36px/1.1 var(--sans);letter-spacing:-1.1px;color:var(--ink)}
.lists{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:22px}
.lists .r{grid-template-columns:28px 1fr;min-height:64px}
.lists .ct{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;padding:8px 14px;min-height:64px}
.lists .ct.ans{box-shadow:inset 5px 0 0 var(--blue)}
.lists .ct.top1.ans{background:var(--cl)}
.lists .gap{height:30px;display:flex;align-items:center;justify-content:center;font:500 16px var(--mono);color:var(--grey);letter-spacing:.3em}
#d03 .qt{font-size:20px}
#d03 .lists{margin-top:14px}
#d03 .lists .r{min-height:54px}
#d03 .lists .ct{min-height:54px;padding:6px 14px}
#d03 .take{margin-top:14px}
#d03 .lh .chipf{transition:opacity .3s}
#d03[data-step="1"] .lh .chipf{opacity:.55}
#d04 .heq{margin-top:26px;display:flex;align-items:center;gap:22px}
#d04 .heq .qt{font-size:34px;direction:rtl;font-family:var(--sans);font-weight:600;letter-spacing:-.5px;border-left:0;border-right:6px solid var(--blue);padding:4px 18px 4px 0;flex:1}
#d04 .heq .en{font-size:17px;color:var(--grey);max-width:300px;line-height:1.4}
#d04 .two{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:30px}
#d04 .zero{display:flex;align-items:baseline;gap:18px;margin-top:18px}
#d04 .zero .stat{font-size:112px;color:#8A6500}
#d04 .zero .of{font-size:20px;color:var(--char);line-height:1.35}
#d04 .hit{margin-top:18px}
#d04 .hit .ti{font-size:20px}
#d04 .hit .r{grid-template-columns:28px 1fr;min-height:64px}
#d04 .hit .ct{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;padding:8px 14px;min-height:64px}
#d04 .hit .ct.ans{box-shadow:inset 5px 0 0 var(--blue)}
#d04 .hit .ct.top1.ans{background:var(--cl)}
#d04 .langs{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
#d04 .langs span{font:500 13px var(--mono);border:1px solid var(--line);padding:5px 10px;color:var(--char)}
#d04 .take4{position:absolute;left:72px;right:72px;top:596px;font:600 34px/1.1 var(--sans);letter-spacing:-1px}

/* 05 semantic_text */
#d05 h1 .st{font-weight:600;font-size:44px;letter-spacing:-1.5px}
#d05 .left{position:absolute;left:72px;top:160px;width:620px}
#d05 .fl{display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap}
#d05 .nd{border:1px solid var(--ink);background:#fff;padding:8px 9px;font:600 13px/1.1 var(--mono);white-space:nowrap}
#d05 .nd.eis{background:var(--blue);border-color:var(--blue);color:#fff}
#d05 .nd.vec{background:#48EFCF;border-color:#02BCB7}
#d05 .fc6{margin-top:14px;font-size:20px;line-height:1.45;color:var(--char);display:flex;gap:12px;align-items:flex-start}
#d05 .fc6 .n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--blue);color:#fff;font:600 14px var(--mono);display:flex;align-items:center;justify-content:center;margin-top:3px}
#d05 .fc6 b{color:var(--ink)}
#d05 .right{position:absolute;left:712px;top:160px;width:496px}
#d05 .ep{border:1px solid var(--line);padding:11px 14px;margin-top:12px;background:#fff;display:flex;align-items:center;gap:14px;font-size:17px;color:var(--char)}
#d05 .ep .id{font:600 15px var(--mono);color:var(--ink);white-space:nowrap}

/* 06 hybrid */
#d06 h1{font-size:40px}
#d06 .qline{display:flex;align-items:baseline;gap:14px;margin-top:14px}
#d06 .cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:18px}
#d06 .lst .lh{min-height:38px}
#d06 .csub{height:22px;margin-top:5px;font-size:15px;color:var(--grey)}
#d06 .r{min-height:48px;padding:3px 0 3px 10px;grid-template-columns:24px 1fr auto}
#d06 .r.ans{box-shadow:inset 4px 0 0 #0B64DD;background:#D9E8FF}
#d06 .r.top1.ans{background:var(--cl);box-shadow:inset 4px 0 0 var(--c)}
#d06 .bot{position:absolute;left:72px;right:72px;top:470px;border-top:1px solid var(--ink);padding-top:16px}
#d06 .msg{font-size:24px;line-height:1.4;color:var(--char)}
#d06 .msg b{color:var(--ink);font-weight:600}
#d06 .msg .mono{font-weight:500;font-size:21px}

/* 07 pyramid */
#d07 .pyr{position:absolute;left:72px;top:150px;width:480px;height:340px;overflow:visible}
#d07 .thud{animation:thud .4s ease-out var(--thud-delay,.6s)}
@keyframes thud{0%{transform:translateY(0)}35%{transform:translateY(4px)}100%{transform:translateY(0)}}
#d07 .ripple{fill:none;stroke-width:3;transform-box:fill-box;transform-origin:center;opacity:0;animation:rip .9s ease-out both}
@keyframes rip{from{opacity:.75;transform:scale(1)}to{opacity:0;transform:scale(1.4)}}
#d07 .tiers{position:absolute;left:600px;top:150px;width:608px;height:372px}
#d07 .tx{position:absolute;left:0;right:0}
#d07 .tx.t3{top:20px}#d07 .tx.t2{top:146px}#d07 .tx.t1{top:262px}
#d07 .tx .hd{display:flex;align-items:center;gap:14px}
#d07 .tx .lb{font:600 13px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--grey)}
#d07 .tx p{margin-top:10px;font-size:19px;line-height:1.45;color:var(--char)}
#d07 .cost{position:absolute;left:72px;top:536px;font-size:18px;color:var(--grey)}
#d07 .rag{position:absolute;left:72px;right:72px;top:578px}

/* 08 reranker motion */
#d08 .qline{display:flex;align-items:baseline;gap:14px;margin-top:12px}
#d08 .rl{position:absolute;left:72px;top:206px;width:700px;height:440px}
#d08 .it{position:absolute;left:0;right:0;height:30px;border:1px solid var(--line);background:#fff;display:grid;grid-template-columns:30px 1fr auto;align-items:center;gap:10px;padding:0 12px 0 0;font-size:15px;color:var(--char);transition:transform .9s cubic-bezier(.5,0,.2,1),background .5s,border-color .5s}
#d08 .it .n{font:500 13px var(--mono);color:var(--grey);text-align:center}
#d08 .it .s{font:600 13px var(--mono);color:var(--grey)}
#d08 .it.ans{background:#FFE9E3;border-color:#FF957D;color:var(--ink);font-weight:500}
#d08 .it.ans .s{color:#B84A2E}
#d08 .it.cpu{color:var(--char)}
${Array.from({ length: 12 }, (_, i) => `#d08 .i${i + 1}{top:${i * 36}px}`).join('\n')}
#d08[data-step="2"] .i12,#d08[data-step="3"] .i12{transform:translateY(-396px)}
${Array.from({ length: 11 }, (_, i) => `#d08[data-step="2"] .i${i + 1},#d08[data-step="3"] .i${i + 1}{transform:translateY(36px)}`).join('\n')}
#d08 .side{position:absolute;left:820px;top:206px;width:388px}
#d08 .side .st8{display:flex;align-items:center;gap:12px;margin-bottom:10px;font-size:18px;color:var(--char)}
#d08 .side .st8 b{font:600 20px var(--sans);color:var(--ink)}
#d08 .side .pill{display:inline-flex;align-items:center;gap:10px;margin-top:10px;background:#FFE9E3;border-left:6px solid #FF957D;padding:12px 16px;font:600 30px/1 var(--sans);letter-spacing:-1px;color:#B84A2E}
#d08 .side .pill span{font:500 13px var(--mono);color:var(--grey);letter-spacing:.06em;text-transform:uppercase}
#d08 .take8{margin-top:26px;font:600 34px/1.1 var(--sans);letter-spacing:-1px}
#d08 .sm8{margin-top:10px;font-size:16px;color:var(--grey)}

/* 09 rag */
#d09 .world{position:absolute;left:72px;top:176px;width:1136px;height:270px}
#d09 .model{position:absolute;left:0;top:0;width:330px;height:270px;border:2px solid var(--ink);background:#D9E8FF;padding:20px 22px}
#d09 .model h3{font:600 28px/1.15 var(--sans);letter-spacing:-.8px;margin:8px 0 10px}
#d09 .model p{font-size:19px;line-height:1.45;color:var(--char)}
#d09 .stamp{position:absolute;right:16px;bottom:22px;transform:rotate(-7deg);border:3px solid #0B64DD;color:#0B64DD;padding:6px 12px;font:600 15px var(--mono);letter-spacing:.1em;text-transform:uppercase;background:#fff}
#d09 .wall{position:absolute;left:430px;top:-14px;height:298px;border-left:3px dashed var(--ink)}
#d09 .wall span{position:absolute;left:10px;bottom:0;font:600 12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--grey);white-space:nowrap}
#d09 .data{position:absolute;left:580px;top:0;width:576px}
#d09 .dchips{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
#d09 .dc{display:inline-flex;align-items:center;gap:10px;border:1.5px dashed var(--grey);background:#fff;padding:10px 16px;font-size:20px;color:var(--char)}
#d09 .never{margin-top:18px;font:600 26px var(--sans);letter-spacing:-.6px;color:#B84A2E}
#d09 .bridge{position:absolute;left:290px;top:100px;width:236px;height:86px;background:#0B64DD;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:8px 8px 0 #48EFCF;z-index:3}
#d09 .bridge b{font:600 26px var(--sans);letter-spacing:-.6px}
#d09 .bridge span{font:500 13px var(--mono);letter-spacing:.06em;text-transform:uppercase;margin-top:4px}
#d09 .pipe{position:absolute;left:72px;right:72px;top:470px;display:flex;align-items:center;gap:12px}
#d09 .nd{flex:1;border:1px solid var(--line);background:#fff;padding:14px 16px;font-size:19px;line-height:1.3;text-align:center}
#d09 .nd b{font-weight:600}
#d09 .nd.rrfn{background:#FDE6F1;border-color:#F04E98}
#d09 .nd.keyn{background:#D9E8FF;border-color:#0B64DD}
#d09 .line{position:absolute;left:72px;right:72px;top:566px;font:600 34px/1.15 var(--sans);letter-spacing:-1.1px}
#d09 .line .sm{display:block;margin-top:8px;font:400 17px var(--sans);letter-spacing:0;color:var(--grey)}

/* 10 one space */
.c0{--c:#02BCB7}.c4{--c:#0B64DD}.c6{--c:#F04E98}
#d10 .plot{position:absolute;left:52px;top:150px;width:700px;height:420px}
#d10 .plot canvas{display:block}
#d10 .legend{position:absolute;left:72px;top:582px;display:flex;gap:22px;font:500 13.5px var(--mono);color:var(--char)}
#d10 .legend span{display:flex;align-items:center;gap:7px}
#d10 .legend i{display:inline-block;width:12px;height:12px;border-radius:50%;background:var(--c)}
#d10 .caps{position:absolute;left:780px;top:170px;width:428px;display:grid;gap:12px}
#d10 .cap10{display:grid;grid-template-columns:1fr;gap:4px;padding:12px 16px 12px 18px;background:var(--cl,#F5F7FA);border-left:6px solid var(--c,#B5BFCE)}
#d10 .cap10 b{font:600 22px/1.15 var(--sans);letter-spacing:-.5px;color:var(--ink)}
#d10 .cap10 span{font-size:16px;color:var(--char);line-height:1.35}
#d10 .cap10 .q{font:500 15px var(--mono);color:var(--ct)}
#d10 .vid{position:absolute;left:780px;top:560px;width:428px;font-size:15px;color:var(--grey);line-height:1.4}

/* 11 ocr */
#d11 .photo{position:absolute;left:72px;top:150px;width:470px}
#d11 .photo img{display:block;width:470px;border:1px solid var(--ink);box-shadow:8px 8px 0 #B5BFCE}
#d11 .photo .tag{margin-top:12px;display:block}
#d11 .eng{position:absolute;left:580px;top:150px;width:628px}
#d11 .eng .cw{margin-bottom:18px}
#d11 .eng .cw.loc{box-shadow:6px 6px 0 #B5BFCE}
#d11 .eng .code{font-size:14px;line-height:1.5}
#d11 .eng .code .ok{color:#0A7A76;font-weight:600}
#d11 .eng .code .bad{color:#B84A2E}
#d11 .take11{position:absolute;left:72px;right:72px;top:600px;font:600 32px/1.1 var(--sans);letter-spacing:-1px}

/* 12 air-gapped */
#d12 #hero12{left:40px;top:150px;width:560px;height:470px}
#d12 .tbl{position:absolute;left:620px;top:156px;width:588px}
#d12 .th,#d12 .trw{display:grid;grid-template-columns:150px 180px 1fr;column-gap:12px;align-items:center}
#d12 .th{padding-bottom:8px;border-bottom:2px solid var(--ink);font:600 11.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--grey)}
#d12 .trw{min-height:54px;border-bottom:1px solid var(--line);font-size:17px;line-height:1.25;color:var(--char)}
#d12 .trw b{color:var(--ink);font-weight:600}
#d12 .trw .mono{font-size:15px}
#d12 .line12{position:absolute;left:620px;width:588px;top:516px;font:600 22px/1.3 var(--sans);letter-spacing:-.5px}
#d12 .line12 .sm{display:block;margin-top:8px;font:400 16px var(--sans);letter-spacing:0;color:var(--char)}

/* 13 one engine */
#d13 h1{font-size:42px;max-width:1040px;line-height:1.08}
#d13 .sub{font-size:22px;margin-top:10px}
#d13 #hero13{left:40px;top:236px;width:520px;height:400px}
#d13 .caps{position:absolute;left:600px;top:252px;width:608px;display:grid;gap:8px}
#d13 .cap{display:grid;grid-template-columns:110px 1fr;align-items:center;gap:16px;padding:7px 12px 7px 0;background:var(--cl,#F5F7FA);border-left:6px solid var(--c,#B5BFCE)}
#d13 .cap.sl{--c:#B5BFCE;--cl:#F5F7FA}
#d13 .cap .chipf{margin-left:12px;justify-self:start;padding:6px 10px;font-size:12px}
#d13 .cap b{display:block;font:600 22px/1.15 var(--sans);letter-spacing:-.5px;color:var(--ink)}
#d13 .cap div span{font-size:17px;color:var(--char)}
`;

const S = [];

// ---------------- 01 title ----------------
S.push(slide({ id: 'd01', steps: 1, foot: 'Search AI, end to end', body: `
  <div class="z">
    <div class="eyebrow in1">Elastic for Dream · <b>Search AI briefing</b></div>
    <h1 class="in2">Search AI,<br><span class="b">end to end.</span></h1>
    <p class="sub in3">One engine for keywords, vectors, images, speech and agents. Same engine offline.</p>
    <div class="by in4"><b>Elastic</b><span>·</span>Prepared for Dream · October 2026</div>
  </div>
  <svg id="hero" class="iso" viewBox="0 0 680 720"></svg>`, init: `
    EW.dots({x: 640, y: 30, w: 640, h: 660, seed: 4, blobs: 6, thr: .5, parent: slide});
    const sc = EW.iso(slide.querySelector('#hero'), {ox: 300, oy: 282, s: .8});
    sc.rect({x: -30, y: -30, w: 330, d: 330, z: 0, delay: .1});
    const plat = sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .15, drop: 120, order: -1000});
    [128, 108, 88, 68, 48].forEach((h, i) => sc.box({x: 22 + i * 35.5, y: 150, w: 26, d: 100, h, z: 46, c: 'slate', stroke: false, delay: .55 + i * .07, drop: 90, order: 1}));
    sc.box({x: 190, y: 26, w: 60, d: 60, h: 76, z: 46, c: 'teal', delay: .82, drop: 90});
    sc.box({x: 200, y: 112, w: 52, d: 52, h: 44, z: 46, c: 'yellow', delay: .9, drop: 90});
    const foot = sc.rect({x: 60, y: 22, w: 104, d: 104, z: 46, sw: 1.2, delay: 1.0});
    sc.box({x: 60, y: 22, w: 104, d: 104, h: 104, z: 176, c: 'glass', wire: true, inner: true, stroke: '#343741', delay: 1.05, drop: 60, float: 7, floatSpeed: 1.1, order: 2000});
    sc.box({x: 72, y: 34, w: 80, d: 80, h: 80, z: 188, c: 'pink', delay: 1.1, drop: 80, float: 7, floatSpeed: 1.1, order: 3000});
    sc.label({at: [164, 22, 176 + 52], side: 'r', len: 50, title: 'Hybrid + rerank', sub: 'Fused, then re-read', delay: 1.45});
    sc.label({at: [250, 26, 46 + 38], side: 'r', len: 40, title: 'Vector', sub: 'jina-embeddings-v5', delay: 1.6});
    sc.label({at: [252, 138, 46 + 22], side: 'r', len: 118, title: 'Keyword', sub: 'BM25, exact ids', delay: 1.75});
    sc.run();
    const fid = slide.querySelector('#hero filter').id;
    const sh = EW.el('polygon', {points: [[70, 32], [158, 32], [158, 120], [70, 120]].map(([x, y]) => sc.P(x, y, 46).join(',')).join(' '), fill: 'rgba(30,40,80,.30)', filter: \`url(#\${fid})\`, opacity: 0});
    plat.g.after(foot.g); foot.g.after(sh);
    EW.loop(t => { const k = Math.min(1, Math.max(0, (t - 1.1) / .6)), f = t > 1.8 ? Math.sin((t - 1.8) * 1.1) : 0;
      sh.setAttribute('opacity', (k * (.85 - .25 * f)).toFixed(3));
      sh.setAttribute('transform', \`translate(\${sc.P(114, 76, 46).map(v => v.toFixed(1)).join(',')}) scale(\${(1 - .06 * f).toFixed(3)}) translate(\${sc.P(114, 76, 46).map(v => (-v).toFixed(1)).join(',')})\`); });`,
  notes: `<p><b>Space: nothing, the cubes assemble on their own.</b></p><p>One platform, entirely on Elastic. Keyword search, vectors, hybrid with a reranker on top, agents that use search as a tool, and every one of them runs the same way in an air-gapped cluster. The demo you are about to see is a thin UI over native features.</p>` }));

// ---------------- 02 vector db ----------------
S.push(slide({ id: 'd02', steps: 3, foot: 'Elasticsearch is a vector database', body: `
  <div class="z">
    <div class="eyebrow in1">The big idea · <b>One engine</b></div>
    <h1 class="in2">A search engine <span class="b">and a vector database.</span></h1>
  </div>
  <div class="cards3 in3">
    <div class="fc" data-goto="1">
      <div class="bar split"><i class="kw"></i><i class="vec"></i></div>
      <div class="tag">01</div>
      <h3>Lexical + vector in one index</h3>
      <p class="rv" data-s="1">One mapping, one request. Results, highlights and facets come back together.</p>
      <div class="cubes"><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i><i class="y"></i><i class="t"></i></div>
    </div>
    <div class="fc" data-goto="2">
      <div class="bar key"><i></i></div>
      <div class="tag">02</div>
      <h3>Models run in the platform</h3>
      <p class="rv" data-s="2">EIS hosts Jina today. ML nodes inside the cluster host the same roles offline.</p>
      <div class="cubes"><i class="t"></i><i class="t"></i><i class="t"></i><i class="b"></i><i class="b"></i><i class="b"></i></div>
    </div>
    <div class="fc" data-goto="3">
      <div class="bar rrf"><i></i></div>
      <div class="tag">03</div>
      <h3>Scales past RAM</h3>
      <p class="rv" data-s="3">DiskBBQ: 1-bit vectors on disk, about 32x smaller, rescored for full precision.</p>
      <div class="cubes dec"><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i></div>
    </div>
  </div>
  <div class="promise rv" data-s="3">Everything in the demo is native. <span class="b">No second system.</span></div>`,
  notes: `<p><b>Space: three times, one card each.</b></p><p>Lexical and vector search share one index and one request. The embedding, reranking and OCR models run inside the platform through EIS, and the same roles run on ML nodes when there is no internet. Vectors are quantized to one bit with DiskBBQ so the index scales past memory. No second system, no glue.</p>` }));

// ---------------- 03 words vs meaning ----------------
S.push(slide({ id: 'd03', steps: 3, foot: 'Words vs meaning', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>Words vs meaning</b></div>
    <h1 class="in2">Same question. <span class="b">Two different winners.</span></h1>
  </div>
  <div class="qrow in3">
    <div class="query">
      <span class="tag">Query <i>· 80 product articles</i></span>
      <div class="qt">“how do I kick a hacked machine off the network”</div>
    </div>
    <div class="ask">Which article should win?</div>
  </div>
  <div class="lists in4">
    <div class="lst kw">
      <div class="lh" data-goto="2"><span class="chipf kw">Keyword · BM25</span><span class="lsub">top 3, normalized score</span></div>
      <div class="r"><span class="rk">1</span><div class="ct rv top1" data-s="2"><span class="ti">FAQ: billing cycles and invoices</span><span class="sc"><b>100</b></span></div></div>
      <div class="r"><span class="rk">2</span><div class="ct rv" data-s="2"><span class="ti">FAQ: serverless functions</span><span class="sc"><b>82</b></span></div></div>
      <div class="r"><span class="rk">3</span><div class="ct rv" data-s="2"><span class="ti">FAQ: MDR escalation</span><span class="sc"><b>80</b></span></div></div>
      <div class="gap"><span class="rv" data-s="2">· · ·</span></div>
      <div class="r"><span class="rk">?</span><div class="ct rv ans" data-s="2"><span class="ti">Isolating a compromised endpoint from the network</span><span class="sc"><b>–</b><i>not in top 10</i></span></div></div>
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="3"><span class="chipf vec">Semantic · jina-v5</span><span class="lsub">top 3, normalized score</span></div>
      <div class="r"><span class="rk">1</span><div class="ct rv top1 ans" data-s="3"><span class="ti">Isolating a compromised endpoint from the network</span><span class="sc"><b>100</b></span></div></div>
      <div class="r"><span class="rk">2</span><div class="ct rv" data-s="3"><span class="ti">Tuning network detection rules</span><span class="sc"><b>92</b></span></div></div>
      <div class="r"><span class="rk">3</span><div class="ct rv" data-s="3"><span class="ti">Understanding the agent heartbeat</span><span class="sc"><b>90</b></span></div></div>
    </div>
  </div>
  <div class="take rv" data-s="3">BM25 finds <span class="kwt">words</span>. Vectors find <span class="vect">meaning</span>.</div>
  <div class="note rv" data-s="3">The isolation guide never says “hacked” or “kick”.</div>`,
  notes: `<p><b>Space: BM25 results, then semantic. Ask the room first.</b></p><p>Keyword search returns four FAQ pages because they share words like "network" and "machine". The isolation guide is not even in the top ten. Semantic search puts it first. BM25 finds words, vectors find meaning. In the demo this is the Product Knowledge Base cube, same pill, two modes.</p>` }));

// ---------------- 04 hebrew ----------------
S.push(slide({ id: 'd04', steps: 3, foot: 'Cross-lingual', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>Multilingual embeddings</b></div>
    <h1 class="in2">Ask in Hebrew. <span class="b">Answer from English docs.</span></h1>
  </div>
  <div class="heq in3">
    <div class="qt">איך מתקינים את המערכת בלי חיבור לאינטרנט</div>
    <div class="en">“How do I install the system without an internet connection”. Not one Hebrew word exists in the index.</div>
  </div>
  <div class="two">
    <div class="lst kw">
      <div class="lh" data-goto="2"><span class="chipf kw">Keyword · BM25</span></div>
      <div class="zero rv" data-s="2"><div class="stat">0</div><div class="of">results.<br>Nothing to match.</div></div>
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="3"><span class="chipf vec">Semantic · jina-v5</span></div>
      <div class="hit rv" data-s="3">
        <div class="r"><span class="rk">1</span><div class="ct top1 ans"><span class="ti">Deploying the Meridian Platform in an air-gapped environment</span><span class="sc"><b>100</b></span></div></div>
        <div class="r"><span class="rk">2</span><div class="ct"><span class="ti">Applying offline threat intelligence and detection content</span><span class="sc"><b>90</b></span></div></div>
      </div>
      <div class="langs rv" data-s="3"><span>Deutsch ✓</span><span>Español ✓</span><span>עברית ✓</span><span>English docs, one index</span></div>
    </div>
  </div>
  <div class="take4 rv" data-s="3">The model is multilingual. <span class="b">The documents never were.</span></div>`,
  notes: `<p><b>Space: BM25 gives zero, then semantic finds the air-gapped guide.</b></p><p>Same index, a Hebrew question. Keyword search has nothing to match and returns zero. The vector field, embedded by jina-embeddings-v5, returns the air-gapped deployment guide first. German and Spanish questions work the same way. Nothing was translated, nothing was reindexed.</p>` }));

// ---------------- 05 semantic_text ----------------
S.push(slide({ id: 'd05', steps: 3, foot: 'semantic_text and EIS', body: `
  <div class="z">
    <div class="eyebrow in1">How it works · <b>semantic_text</b></div>
    <h1 class="in2"><span class="mono st">semantic_text</span>: the mapping <span class="b">is the pipeline.</span></h1>
  </div>
  <div class="left in3">
    <div class="tag">What happens to a document</div>
    <div class="fl"><span class="nd">body</span>${ARW}<span class="nd">chunk</span>${ARW}<span class="nd eis">EIS · jina-v5-text</span>${ARW}<span class="nd vec">vectors</span>${ARW}<span class="nd">bbq_disk</span></div>
    <div class="fc6 rv" data-s="1"><span class="n">1</span><span><b>One field type.</b> Chunking, embedding and quantization happen inside the index, at write time and at query time.</span></div>
    <div class="fc6 rv" data-s="2"><span class="n">2</span><span><b>DiskBBQ.</b> One bit per dimension on disk, rescored against the originals. The same index that holds 80 articles holds 100 million.</span></div>
    <div class="fc6 rv" data-s="3"><span class="n">3</span><span><b>Swap the endpoint, keep the mapping.</b> ELSER, E5 or any Hugging Face model imported with Eland runs this field offline.</span></div>
  </div>
  <div class="right in4">
    <div class="cw"><div class="bar"><i></i><i></i><i></i><span>mapping · kb_docs_en</span></div>
<pre class="code"><span class="k">"body_semantic"</span>: {
  <span class="k">"type"</span>: "semantic_text",
  <span class="k">"inference_id"</span>: "jina-v5-text",
  <span class="k">"index_options"</span>: {
    <span class="k">"dense_vector"</span>: { "type": "bbq_disk" }
  }
}</pre></div>
    <div class="ep"><span class="chipf key">endpoint</span><span class="id">jina-v5-text</span><span>jina-embeddings-v5-text-small · 1024 dims · cosine</span></div>
  </div>`,
  notes: `<p><b>Space: three times.</b></p><p>This is the whole vector pipeline: one field in the mapping that names an inference endpoint. Chunking, embedding and quantization happen in the index. DiskBBQ stores one bit per dimension on disk and rescores. And because the endpoint is an abstraction, the same mapping runs with ELSER or an Eland-imported model when there is no internet. In the demo: Query Inspector, Mapping tab.</p>` }));

// ---------------- 06 hybrid ----------------
const row = (cls, id, t, score, extra = '') => `<div class="r ${cls}"><span class="rk">${id}</span><span class="ti">${t}</span><span class="sc"><b>${score}</b>${extra}</span></div>`;
S.push(slide({ id: 'd06', steps: 3, foot: 'Hybrid: fuse by rank', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>Hybrid retrieval</b></div>
    <h1 class="in2">Scores don’t mix. <span class="b">Fuse by rank.</span></h1>
  </div>
  <div class="qline in3"><span class="tag">Query</span><span class="qt">TKT-20481</span><span class="note" style="margin:0">a ticket id, among twelve near-identical tickets</span></div>
  <div class="cols3 in4">
    <div class="lst kw">
      <div class="lh" data-goto="1"><span class="chipf kw">BM25</span></div><div class="csub">exact token wins</div>
      ${row('top1 ans', 1, 'TKT-20481', 100)}${row('', 2, 'TKT-20600', 38)}${row('', 3, 'TKT-20430', 38)}
    </div>
    <div class="lst vec">
      <div class="lh" data-goto="2"><span class="chipf vec">Vector</span></div><div class="csub">ids all look alike</div>
      <div class="rv" data-s="2">${row('top1', 1, 'TKT-20430', 100)}${row('', 2, 'TKT-20498', 99)}${row('ans', 3, 'TKT-20481', 99)}</div>
    </div>
    <div class="lst rrf">
      <div class="lh" data-goto="3"><span class="chipf rrf">Hybrid · RRF</span></div><div class="csub">1 / (k + rank), summed</div>
      <div class="rv" data-s="3">${row('top1 ans', 1, 'TKT-20481', 100)}${row('', 2, 'TKT-20430', 100)}${row('', 3, 'TKT-20498', 97)}</div>
    </div>
  </div>
  <div class="bot rv" data-s="3"><div class="msg"><b>Precision from BM25, recall from vectors, no tuning.</b> One <span class="mono">rrf</span> retriever in <span class="mono">_search</span>, or <span class="mono">FORK | FUSE</span> in ES|QL. Linear fusion when you want weights.</div></div>`,
  notes: `<p><b>Space: vector column, then the fused column.</b></p><p>Identifiers are where vectors are fuzzy: the ticket id looks like eleven other ids, so the vector column has the look-alikes on top. BM25 pins the exact id. Reciprocal rank fusion merges the two lists by rank, so the exact ticket stays first and the look-alikes follow. No score normalization, no tuning. In the demo: CRM cube, pill TKT-20481, three modes.</p>` }));

// ---------------- 07 pyramid ----------------
S.push(slide({ id: 'd07', steps: 4, foot: 'The relevance pyramid', body: `
  <div class="z">
    <div class="eyebrow in1">How it fits together · <b>The relevance pyramid</b></div>
    <h1 class="in2">Retrieve wide. <span class="b">Spend where it counts.</span></h1>
  </div>
  <svg id="pyr" class="iso pyr in3" viewBox="0 0 480 340" role="img" aria-label="Three slabs drop in one at a time: Retrieve, Tune, Rerank"></svg>
  <div class="tiers">
    <div class="tx t3 rv" data-s="3"><div class="hd"><span class="chipf rr">Rerank the top N</span><span class="lb">hundreds</span></div><p>jina-reranker-v3 reads query and document together. Native <span class="mono">text_similarity_reranker</span>, or <span class="mono">RERANK</span> in ES|QL.</p></div>
    <div class="tx t2 rv" data-s="2"><div class="hd"><span class="chipf key">Tune</span><span class="lb">thousands</span></div><p>Query rules, linear weights, rescorers, learning to rank. No model changes.</p></div>
    <div class="tx t1 rv" data-s="1"><div class="hd"><span class="chipf rrf">Retrieve: BM25 + vector, fused</span><span class="lb">billions</span></div><p>Cheap per document, so it covers everything. <span class="mono">semantic_text</span>, <span class="mono">rrf</span>, DiskBBQ.</p></div>
  </div>
  <div class="cost rv show">Each layer sees fewer docs and spends more per doc.</div>
  <div class="rag callout rv" data-s="4"><span class="b">Everything above feeds the agent.</span> Better context in, better answers out.</div>`,
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
  notes: `<p><b>Space: four times, one slab drops each time, then the agent line.</b></p><p>Bottom slab: retrieval over billions, BM25 and vectors fused, cheap per document. Middle: tuning, query rules and weights, no model changes. Top: a reranker that reads the top fifty against the question. Each layer sees fewer documents and spends more on each. Everything above feeds the agent.</p>` }));

// ---------------- 08 reranker motion ----------------
const TICKETS = [
  ['TKT-22228', 'CWP sensor using 600 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21580', 'CWP sensor using 120 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-22971', 'CWP sensor using 85 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21304', 'CWP sensor using 1400 percent CPU on Kubernetes nodes', 'cpu'],
  ['TKT-21563', 'Agents on Windows 11 hosts stopped sending heartbeats', ''],
  ['TKT-22538', 'Agents on Windows 11 hosts stopped sending heartbeats', ''],
  ['TKT-21871', 'Dashboards take 12 seconds to load since upgrading', ''],
  ['TKT-21030', 'It says token expired when we try to enrol new laptops', ''],
  ['TKT-22067', 'macOS 15 agents cause Finder to beachball', ''],
  ['TKT-21732', 'The laptop fans spin up every morning around 9am', ''],
  ['TKT-22354', 'Our dashboard is blank and the Console returns 502', ''],
  ['TKT-21988', 'CWP DaemonSet in CrashLoopBackOff on every EKS node', 'ans'],
];
S.push(slide({ id: 'd08', steps: 3, foot: 'Re-ranking: the last mile', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>jina-reranker-v3</b></div>
    <h1 class="in2">Re-ranking: <span class="b">was #12, now #1.</span></h1>
  </div>
  <div class="qline in3"><span class="tag">Query</span><span class="qt">“kubernetes pods crashlooping after the agent rollout”</span></div>
  <div class="rl in4">
    ${TICKETS.map(([id, t, c], i) => `<div class="it i${i + 1} ${c}"><span class="n">${i + 1}</span><span>${t}</span><span class="s">${id}</span></div>`).join('\n    ')}
  </div>
  <div class="side in4">
    <div class="st8"><span class="chipf rrf">Hybrid · RRF</span><span>the word <b>Kubernetes</b> outvotes the meaning</span></div>
    <div class="st8 rv" data-s="2"><span class="chipf rr">Rerank</span><span>the reranker reads the top 50 and re-orders</span></div>
    <div class="pill rv" data-s="2">#12 → #1<span>in the demo</span></div>
    <div class="take8 rv" data-s="3">RRF is a vote. <span class="b">The reranker reads.</span></div>
    <div class="sm8 rv" data-s="3">Native retriever: text_similarity_reranker over rrf. Also RERANK in ES|QL.</div>
  </div>`,
  notes: `<p><b>Space: the CrashLoopBackOff ticket climbs from 12 to 1, then the line.</b></p><p>Hybrid retrieval already combined keywords and vectors, but it is a vote: the word Kubernetes appears in dozens of CPU tickets, so they win. The reranker reads each of the top fifty against the question and lifts the CrashLoopBackOff ticket to the top. In the demo the badge literally says "was #12, now #1". List is abbreviated for the slide.</p>` }));

// ---------------- 09 rag ----------------
S.push(slide({ id: 'd09', steps: 3, foot: 'RAG and agents', body: `
  <div class="z">
    <div class="eyebrow in1">Why it matters · <b>RAG and agents</b></div>
    <h1 class="in2">An LLM only knows <span class="b">what it was trained on.</span></h1>
  </div>
  <div class="world in3">
    <div class="model">
      <div class="tag">The model</div>
      <h3>A snapshot of the world</h3>
      <p>Public web, books, code. Frozen at its <b>training cutoff</b>.</p>
      <div class="stamp">Training cutoff</div>
    </div>
    <div class="wall"><span>Knowledge stops here</span></div>
    <div class="data">
      <div class="tag">Your data</div>
      <div class="dchips">
        <span class="dc">Product docs</span><span class="dc">Support tickets</span><span class="dc">Signed contracts</span><span class="dc">Voicemails</span><span class="dc">Screenshots</span><span class="dc">Four CRM systems</span>
      </div>
      <p class="never">None of it got in.</p>
    </div>
    <div class="bridge rv" data-s="2"><b>Elasticsearch</b><span>search your data</span></div>
  </div>
  <div class="pipe rv" data-s="2">
    <div class="nd">Question</div>${ARW}<div class="nd rrfn"><b>Retrieve</b>, rerank</div>${ARW}<div class="nd">Context in the prompt</div>${ARW}<div class="nd keyn">Grounded answer, with sources</div>
  </div>
  <div class="line rv" data-s="3">Search is how an LLM <span class="b">gets to know your data.</span><span class="sm">Agent Builder adds tools and Elastic Workflows: in the demo the cohort agent reindexes four CRM systems into one index, by itself.</span></div>`,
  notes: `<p><b>Space: the bridge and the pipeline, then the punchline.</b></p><p>A model is a snapshot. Your docs, tickets, contracts, voicemails and CRM systems are on the other side of the wall. Elasticsearch is the bridge: retrieve, rerank, put the context in the prompt, get a grounded answer with sources. Agent Builder goes further: search becomes a tool, and Elastic Workflows let the agent act. In the demo the cohort agent builds an index across four CRM schemas on its own.</p>` }));

// ---------------- 10 one vector space ----------------
S.push(slide({ id: 'd10', steps: 3, foot: 'One vector space', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>jina-embeddings-v5-omni</b></div>
    <h1 class="in2">One space for <span class="b">images, speech and text.</span></h1>
  </div>
  <div class="plot in3"><canvas id="cloud10"></canvas></div>
  <div class="legend in4"><span class="c4"><i></i>documents, transcripts</span><span class="c6"><i></i>images</span><span class="c0"><i></i>audio (by transcript)</span><span class="key"><i style="background:#0B64DD;box-shadow:0 0 0 3px #D9E8FF"></i>query</span></div>
  <div class="caps in4">
    <div class="cap10 rrf rv" data-s="1"><b>Text finds images</b><span class="q">“who reports to the CISO”</span><span>returns the org chart. No tags, no captions.</span></div>
    <div class="cap10 vec rv" data-s="2"><b>A screenshot finds a voicemail</b><span class="q">drop the ERR-4471 error dialog</span><span>top hit: a customer’s voicemail about that same expired token.</span></div>
    <div class="cap10 key rv" data-s="3"><b>Any language, any modality</b><span class="q">חשבונית עם סכום לתשלום</span><span>a Hebrew sentence returns the invoice image.</span></div>
  </div>
  <div class="vid rv" data-s="3">Audio is indexed by transcript; video adds sampled frames to the same space. Retrieval does not change.</div>`,
  init: `
    const cv = slide.querySelector('#cloud10');
    const C = PM3.Cloud(cv, {W: 700, H: 420, pitch: .4, spin: .14, D: 3.4});
    const R = EW.rand(11);
    const CL = [
      {c: '#0B64DD', n: 70, cx: -.55, cy: .05, cz: .2, sp: .36},
      {c: '#F04E98', n: 40, cx: .62, cy: -.1, cz: -.3, sp: .3},
      {c: '#02BCB7', n: 14, cx: .1, cy: .5, cz: .75, sp: .18}
    ];
    const pts = [];
    CL.forEach((k, ci) => { for (let i = 0; i < k.n; i++) { const g = () => (R() + R() + R() - 1.5) * k.sp; pts.push({x: k.cx + g(), y: k.cy + g(), z: k.cz + g(), c: k.c, ci}); } });
    const SP = {
      dialog: {x: .62 + .18, y: -.1 + .22, z: -.3 + .05, c: '#F04E98', lab: 'error dialog, ERR-4471'},
      voice: {x: .1 + .12, y: .5 - .06, z: .75 - .2, c: '#02BCB7', lab: 'voicemail: token expired'},
      org: {x: .62 - .22, y: -.1 - .18, z: -.3 + .3, c: '#F04E98', lab: 'org chart'},
      inv: {x: .62 + .05, y: -.1 - .3, z: -.3 - .2, c: '#F04E98', lab: 'invoice'},
      q1: {x: -.05, y: -.42, z: .1, lab: '“who reports to the CISO”'},
      q3: {x: .62 + .38, y: -.1 - .36, z: -.3 + .05, lab: 'חשבונית עם סכום לתשלום'}
    };
    let t0 = null;
    C.onFrame = (t) => {
      const step = +slide.dataset.step || 1;
      if (t0 === null) t0 = t;
      const k = PM3.ease((t - t0) / 1.4);
      pts.forEach((p, i) => { const q = C.project(p.x, p.y, p.z); const a = Math.min(1, k * 2 - i / pts.length) ; if (a <= 0) return; C.add(q[3], () => C.dot(q[0], q[1], 3.2 * q[2] / (C.H * 2.15 / 3.4), p.c, .85 * a)); });
      const big = (s, r, ring) => { const q = C.project(s.x, s.y, s.z); C.add(q[3] - 1, () => { if (ring) { C.dot(q[0], q[1], r + 5, '#fff', 1); C.dot(q[0], q[1], r + 3, s.c || '#0B64DD', .35); } C.dot(q[0], q[1], r, s.c || '#0B64DD', 1); }); return q; };
      const link = (a, b, col, lab, lab2) => { const qa = C.project(a.x, a.y, a.z), qb = C.project(b.x, b.y, b.z); C.add(-99, () => { C.line(qa, qb, col, .9, 2); C.text(a.lab, qa[0], qa[1] - 14, '#1D1E24', 12, 600); C.text(b.lab, qb[0], qb[1] - 14, '#1D1E24', 12, 600); }); };
      if (step >= 1) { big(SP.org, 5, true); const q = C.project(SP.q1.x, SP.q1.y, SP.q1.z); C.add(q[3] - 2, () => C.diamond(q[0], q[1], 7, '#0B64DD', '#fff', 1)); link(SP.q1, SP.org, '#0B64DD'); }
      if (step >= 2) { big(SP.dialog, 5, true); big(SP.voice, 5, true); link(SP.dialog, SP.voice, '#02BCB7'); }
      if (step >= 3) { big(SP.inv, 5, true); const q = C.project(SP.q3.x, SP.q3.y, SP.q3.z); C.add(q[3] - 2, () => C.diamond(q[0], q[1], 7, '#0B64DD', '#fff', 1)); link(SP.q3, SP.inv, '#0B64DD'); }
    };`,
  notes: `<p><b>Space: three times. The cloud rotates on its own.</b></p><p>Documents, transcripts and images embedded by one model into one space. A sentence finds the org chart. A screenshot of an error dialog finds the voicemail of a customer complaining about the same error. A Hebrew sentence finds the invoice image. Audio enters as a transcript; video adds sampled frames; retrieval never changes. In the demo: Multimodal cube, image search tab.</p>` }));

// ---------------- 11 OCR ----------------
S.push(slide({ id: 'd11', steps: 3, foot: 'OCR: cloud and offline engines', body: `
  <div class="z">
    <div class="eyebrow in1">Live from the demo · <b>jina-ocr-v1 vs Tesseract</b></div>
    <h1 class="in2">A phone photo <span class="b">is an input.</span></h1>
  </div>
  <div class="photo in3"><img src="${EMB.phone}" alt="Blurry, skewed phone photo of an invoice"><span class="tag">invoice-phone-photo.jpg <i>· blurred, skewed, noisy</i></span></div>
  <div class="eng in4">
    <div class="cw"><div class="bar"><i></i><i></i><i></i><span>jina-ocr-v1 · EIS · 4.8 s</span></div>
<pre class="code"><span class="ok">INVOICE</span>
Invoice no. <span class="ok">INV-2026-00817</span> · Date 2026-07-01
Bill to: Northwind Energy Cooperative (<span class="ok">ACC-10234</span>)
Endpoint Protection · 4,200 endpoints x 12 months  $168,000.00
Total due <span class="ok">$344,400.00</span></pre></div>
    <div class="cw loc rv" data-s="2"><div class="bar"><i></i><i></i><i></i><span>Tesseract · local · 0.4 s</span></div>
<pre class="code"><span class="bad">soeidion i 0 Congress Ave Assstis TR</span>
Bill to: Northwind Energy Cooperative (<span class="ok">ACC-10234</span>)
<span class="bad">Encpont Protection - 4 200 anoponts x 12 roonths</span>  $168,000.00
<span class="bad">Prqmivm support (247</span>  $38.400.00
Total due <span class="ok">$344,400.00</span></pre></div>
  </div>
  <div class="take11 rv" data-s="3">Cloud engine for quality, <span class="b">local engine when offline.</span> Same contract, one switch.</div>`,
  notes: `<p><b>Space: the local engine result, then the line.</b></p><p>The Account 360 and scanned-contract flows read ids out of images. On a clean screenshot both engines agree. On a phone photo the EIS model returns a clean invoice, the local Tesseract engine garbles the vendor line but still catches the account id and the total. The app switches engines per request; offline it simply uses the local one.</p>` }));

// ---------------- 12 air-gapped ----------------
S.push(slide({ id: 'd12', steps: 3, foot: 'Air-gapped', body: `
  <div class="z">
    <div class="eyebrow in1">Architecture · <b>Air-gapped and independent</b></div>
    <h1 class="in2">Runs the same way <span class="b">air-gapped.</span></h1>
  </div>
  <svg id="hero12" class="iso in3" viewBox="0 0 560 470"></svg>
  <div class="tbl in4">
    <div class="th"><span>Capability</span><span>In the demo</span><span>Air-gapped, in the cluster</span></div>
    <div class="trw"><b>Text vectors</b><span class="mono">jina-embeddings-v5</span><span>ELSER, E5, any Hugging Face model via Eland</span></div>
    <div class="trw"><b>Image vectors</b><span class="mono">jina-v5-omni</span><span>CLIP-family model via Eland</span></div>
    <div class="trw"><b>Reranker</b><span class="mono">jina-reranker-v3</span><span>Elastic Rerank, or a cross-encoder via Eland</span></div>
    <div class="trw"><b>LLM</b><span class="mono">Elastic Managed LLM</span><span>vLLM or Ollama, OpenAI-compatible connector</span></div>
    <div class="trw"><b>OCR</b><span class="mono">jina-ocr-v1</span><span>Tesseract, shown live</span></div>
    <div class="trw"><b>Agents, workflows</b><span class="mono">Agent Builder</span><span>Same, in Kibana</span></div>
  </div>
  <div class="line12 rv" data-s="2">The inference endpoint is the abstraction. <span class="b">Application code does not change.</span><span class="sm rv" data-s="3">No chain dependency: one vendor ships retrievers, reranker, ES|QL, agents and workflows together. Model hosting is your choice, per model, per environment.</span></div>`,
  init: `
    const sc = EW.iso(slide.querySelector('#hero12'), {ox: 270, oy: 120, s: .78});
    sc.rect({x: -40, y: -40, w: 360, d: 360, z: 0, delay: .1, dash: '6 6', sw: 2});
    sc.label({at: [320, 320, 0], side: 'r', len: 24, title: 'No outbound connection', delay: .5, size: 11});
    sc.box({x: 0, y: 0, w: 280, d: 280, h: 40, c: 'blue', delay: .2, drop: 120, order: -1000});
    const poppy = {top: '#FFFFFF', left: '#FF957D', right: '#343741'};
    const cubes = [[20, 20, 'teal', 70, 'Embeddings', 'ELSER / E5 / Eland'], [110, 20, poppy, 60, 'Reranker', 'cross-encoder'], [200, 20, 'yellow', 50, 'OCR', 'Tesseract'], [20, 150, 'pink', 56, 'LLM', 'vLLM / Ollama'], [110, 150, 'ink', 64, 'Agents', 'Agent Builder'], [200, 150, 'slate', 44, 'Workflows', 'Kibana']];
    cubes.forEach(([x, y, c, h, t, s], i) => { sc.box({x, y, w: 64, d: 64, h, z: 40, c, delay: .6 + i * .12, drop: 100, float: 2.5, floatSpeed: 1.1 + i * .07, phase: i, order: 10 + i}); });
    sc.label({at: [84, 20, 40 + 70], side: 'r', len: 30, title: 'Embeddings', sub: 'ELSER / E5 / Eland', delay: 1.5});
    sc.label({at: [264, 20, 40 + 50], side: 'r', len: 36, title: 'OCR', sub: 'Tesseract', delay: 1.65});
    sc.label({at: [264, 214, 40 + 22], side: 'r', len: 44, title: 'Agents, workflows', sub: 'Agent Builder, Kibana', delay: 1.8});
    sc.label({at: [20, 214, 40 + 28], side: 'l', len: 40, title: 'LLM', sub: 'vLLM / Ollama', delay: 1.95});
    sc.run();`,
  notes: `<p><b>Space: the abstraction line, then the independence line.</b></p><p>Everything shown runs on a self-managed cluster with no outbound connection: the same semantic_text mapping with an in-cluster model, the same retrievers, ES|QL, agents and workflows. The models in the demo run on EIS because it is the fastest way to show the Jina stack; each row is one endpoint definition away from offline. And it is one vendor: retrievers, reranker, agents and workflows ship together, no plugin chain, no external vector service. Dev Console: the self-hosted section shows the exact PUT _inference bodies.</p>` }));

// ---------------- 13 one engine ----------------
S.push(slide({ id: 'd13', steps: 1, foot: 'One engine', body: `
  <div class="z">
    <div class="eyebrow in1">The point · <b>One engine</b></div>
    <h1 class="in2">The vector database<br><span class="b">and the search engine.</span></h1>
    <p class="sub in3">One platform. No glue. Same cluster offline.</p>
  </div>
  <svg id="hero13" class="iso" viewBox="0 0 520 400"></svg>
  <div class="caps in4">
    <div class="cap kw"><span class="chipf kw">Keyword</span><div><b>BM25</b><span>exact ids, synonyms, facets in one request</span></div></div>
    <div class="cap vec"><span class="chipf vec">Vector</span><div><b>semantic_text</b><span>jina-embeddings-v5 on EIS, multilingual</span></div></div>
    <div class="cap rrf"><span class="chipf rrf">Hybrid</span><div><b>rrf and linear retrievers</b><span><span class="mono">FORK</span> | <span class="mono">FUSE</span> in ES|QL</span></div></div>
    <div class="cap rr"><span class="chipf rr">Rerank</span><div><b>jina-reranker-v3</b><span>was #12, now #1</span></div></div>
    <div class="cap key"><span class="chipf key">Agents</span><div><b>Agent Builder + Workflows</b><span>grounded answers, then actions</span></div></div>
    <div class="cap sl"><span class="chipf sl">Scale</span><div><b>DiskBBQ</b><span>one bit per dimension, on disk, rescored</span></div></div>
  </div>`,
  init: `
    const sc = EW.iso(slide.querySelector('#hero13'), {ox: 250, oy: 90, s: .86});
    sc.rect({x: -26, y: -26, w: 322, d: 322, z: 0, delay: .1});
    sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .15, drop: 120, order: -1000});
    const poppy = {top: '#FFFFFF', left: '#FF957D', right: '#343741'};
    const cubes = [[22, 34, 'yellow', 92], [105, 34, 'teal', 72], [188, 34, 'pink', 52], [22, 150, poppy, 70], [105, 150, 'blue', 56], [188, 150, 'slate', 40]];
    cubes.forEach(([x, y, c, h], i) => sc.box({x, y, w: 60, d: 60, h, z: 46, c, delay: .55 + i * .12, drop: 100, float: 2.5, floatSpeed: 1.1 + i * .07, phase: i, order: 10 + i}));
    sc.run();`,
  notes: `<p><b>Space: nothing, the cubes drop in on their own.</b></p><p>Elasticsearch is the vector database and the search engine. BM25 for precision, vectors for meaning and languages, hybrid for both, the Jina reranker for the final order, agents and workflows on top, DiskBBQ for scale. One platform, no glue, and the same cluster offline.</p>` }));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Search AI, end to end: Elastic for Dream</title>
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
<nav id="bar" aria-label="Slide navigation"><button id="btn-prev" type="button" aria-label="Previous"><svg class="arw rev" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>Prev</button><span id="count" aria-live="polite">1 / 1</span><span class="sp"></span><button id="btn-overview" type="button" aria-label="Overview of all slides (O)" aria-haspopup="dialog"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM8 8h5v5H8z" fill="currentColor"/></svg>Overview</button><span class="sp"></span><button id="btn-next" type="button" aria-label="Next">Next<svg class="arw" viewBox="0 0 24 12" aria-hidden="true"><path d="M0 6h20M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></nav>
<div id="overview" role="dialog" aria-modal="true" aria-label="All slides" hidden><div class="ovh">All slides <span>Click a tile, or press Esc</span></div><div class="ovg" id="ovg"></div></div>
<aside id="notes"><div class="nh"><span>Speaker notes</span><span id="notes-n"></span></div><div id="notes-body"></div><div class="nf">N to hide</div></aside>
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
