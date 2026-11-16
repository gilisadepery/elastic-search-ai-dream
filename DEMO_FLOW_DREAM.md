# Demo flow — Enterprise Search Platform on Elastic · prep for the Dream meeting

**~30 minutes.** Every query below was run against the live demo and the results are recorded as they
came back, so the flow can be followed click by click. Narrative: **BM25 → semantic → hybrid → Jina
reranker → agent (RAG)** on text, then **Jina omni: image ↔ text ↔ audio**, then **OCR**, then the
**architecture conversation** (air-gapped, no chain dependency). Every capability is native Elastic;
the app is a thin UI and the Query Inspector always shows the real request.

### Agenda mapping

| Agenda item | Sections |
|---|---|
| 1a · Vector search & RAG — unstructured data in real time, advanced RAG | §2 BM25 → §3 semantic (incl. cross-lingual) → §4 hybrid & reranker → §5 agent → §6 Account 360 + cohort builder (agent + workflow) |
| 1b · Multimodality (video & audio) — object processing, vector indexes for retrieval | §7 image ↔ text ↔ audio with jina-v5-omni, §8 scanned docs & OCR, audio transcripts, video note |
| 2a · Air-gapped & offline | §9 + Dev Console "Self-hosted / air-gapped" + the OCR A/B (cloud engine vs local engine) |
| 2b · Independence vs OpenSearch, flexible model hosting | §9 |

### Where Jina shows up (say it explicitly — it is the model stack on EIS)
- `jina-embeddings-v5` (text) → every `semantic_text` field; **multilingual**: Hebrew/German/Spanish queries hit English documents.
- `jina-embeddings-v5-omni` → images **and** document text in one space: image → images, image → audio/PDF/text.
- `jina-reranker-v3` → listwise reranking; the UI shows "was #12 → now #1".
- `jina-ocr-v1` → scanned PDFs and screenshots; the A/B panel compares it with local Tesseract on a blurry phone photo.

---

## 0 · Pre-flight (2 min)
- [ ] `server-en` + `client-en` running → http://localhost:5174 shows 4 cubes with counts (80 / 60 / 316 / 9 + 15 images).
- [ ] Chat bubble header shows *Meridian Help Center Assistant* (agents exist).
- [ ] Nothing to prepare on the desktop: every sample (screenshots, phone photo, PDFs) is a button in the UI.
- [ ] Ids: account **ACC-10234** (Northwind Energy Cooperative), hero ticket **TKT-20417**, identifier story **TKT-20481**.
- [ ] Browser zoom ~110%. Optional: delete old cohorts in the Cohort builder tab (keep the two shipped ones if you want a quick "open" moment).

---

## 1 · Landing (1 min)
"One search platform, entirely on Elastic. A product knowledge base, the company intranet, the CRM & support system, multimodal content. Adding a use case is one registry entry. Everything you'll see — analysis, retrievers, vectors, reranker, agents, workflows, analytics — is native Elasticsearch. No glue, no second vector database."

Click 🛡️ **Product Knowledge Base**.

---

## 2 · ① BM25: great at exact, blind to meaning (3 min)
Mode **BM25**.
1. Pill `ERR-4471` → *Error reference: ERR-4471 — enrollment token expired* at 100. "Codes, ids, names: fast, precise, explainable — look at the highlights."
2. Pill `how do I kick a hacked machine off the network` → BM25 returns **four FAQ pages (billing, serverless, MDR, retention)** — all wrong; the right article (*Isolating a compromised endpoint from the network*) shares no words with the question.
3. Pill `my laptop is running slow after installing the agent` → the two *Installing the Meridian Agent* guides; the answer (*High CPU usage by the Meridian Agent — performance tuning*) says "elevated CPU consumption of the agent service", not "laptop" or "slow".

**Say:** "BM25 counts words. The user says *hacked machine, kick off*; the document says *compromised endpoint, isolate*. Zero overlap, zero relevance. No synonym list keeps up with how people actually ask."

---

## 3 · ② Semantic with jina-embeddings-v5: meaning, and languages (4 min)
Mode **Semantic**, same pills:
- `how do I kick a hacked machine off the network` → *Isolating a compromised endpoint* **#1**.
- `my laptop is running slow after installing the agent` → *High CPU usage…* **#1**.
- `install without internet access` → *Deploying the Meridian Platform in an air-gapped environment* **#1** (BM25 had the install guides).
Tick **Explain this search** once → BM25 and semantic side by side.

**Cross-lingual (the audience is Israeli — do this one):** pill `איך מתקינים את המערכת בלי חיבור לאינטרנט` (how do I install without an internet connection).
- BM25 → **0 results** — there is not a single Hebrew word in the index.
- Semantic → *Deploying the Meridian Platform in an air-gapped environment* **#1**.
Also works: `איך מנתקים מחשב פרוץ מהרשת` → *Isolating a compromised endpoint*; `ההתחברות חוזרת כל הזמן לדף ה-SSO` → *Resolving an SSO login loop*; German `Ransomware auf einem Laptop, was muss ich zuerst tun` → playbooks / isolation; Spanish `olvidé mi contraseña y perdí el teléfono` (Internal cube) → *Resetting your password and MFA device*.

**Say:** "The field is `semantic_text`; EIS embeds with jina-embeddings-v5 at index and query time, no pipeline. The model is multilingual, so an English knowledge base answers Hebrew questions — same vectors, same index. Open the inspector: 1024 dims, `bbq_disk` — 1-bit quantization, ~32× smaller, disk-resident, rescored for full precision."

**The honest part — go to 🎫 CRM & Support Tickets → Search, pill `TKT-20481`:**
- Semantic → four near-identical tickets at 98–100; it cannot tell ids apart.
- BM25 → the exact ticket alone at 100, the look-alikes at 38.
"Semantic is fuzzy on identifiers, SKUs, error codes. So you don't choose — you combine."

---

## 4 · ③ Hybrid + Jina reranker: the moments that sell it (5 min)
Still in 🎫 CRM → Search:
1. `TKT-20481`, mode **Hybrid RRF** → the exact ticket is on top with the look-alikes right behind — precision *and* recall.
2. Pill `kubernetes pods crashlooping after the agent rollout`:
   - **BM25** → four *CWP sensor using N percent CPU* tickets (the word *Kubernetes* dominates).
   - **Semantic** → *CWP DaemonSet in CrashLoopBackOff on every EKS node* #1.
   - **Hybrid RRF** → still the CPU tickets (BM25 outvotes).
   - **Hybrid RRF + Rerank** → the CrashLoopBackOff tickets **"was #12 → now #1"** and **"was #10 → now #2"**.
   "Fusion is cheap and robust, but it is a vote. The listwise reranker — jina-reranker-v3 — actually *reads* the top 50 against the question and re-orders them. Watch the badges."
3. Pill `invoice does not match what we ordered`: BM25 → *What do we lose if we move from Enterprise to Professional* (wrong), semantic → *Please re-issue the invoice with our PO number*, rerank → *Invoice shows 120 endpoints but we only have licences…* **"was #7 → now #1"**.

Back in 🛡️ KB (optional, same pattern): `ransomware on a laptop what do I do first` → BM25 FAQs; RRF still an FAQ on top; rerank → *Isolating a compromised endpoint* "was #4 → now #1" and *Automated response playbooks* "was #5 → now #2". `login keeps bouncing back to the SSO page` → rerank puts *Resolving an SSO login loop* above *Configuring SAML* ("was #2 → now #1").

**Hybrid Linear:** switch mode, drag the BM25/semantic sliders, **Re-run** — "weighted control when you need it".

**One request = the whole page:** open **📄 Query DSL** in the inspector. "Results, highlights and the facets on the left all come back from one `_search` with one `retriever` tree. Click a facet — same query, filtered."

---

## 5 · RAG with an agent (3 min)
💬 bubble → *"Our agents stopped reporting after we upgraded to 5.2 — where do I start?"*
Watch the timeline: 6–9 searches with different phrasings, then one grounded answer that correlates the troubleshooting article, the 5.2 release notes and the ERR-4471 reference, with sources.

**Say:** "Agent Builder runs inside the deployment. Retrieval, reranking, the LLM and the tools are all platform features; the agent doesn't invent product behaviour — if it isn't indexed, it says so."

Second persona, 🏢 **Internal Documentation** (1 min): pill `how many days off do I get` — BM25 → *Payroll FAQ*, semantic → *Paid time off (PTO) policy*; `what happens when I leave the company` — BM25 → *Legal hold notices*, rerank → *Exit checklist* "was #3 → now #1"; `כמה ימי חופשה מגיעים לי` → PTO policy. Bubble: *"I got an email asking me to reset my payroll password. What should I do?"* → leads with the phishing-report procedure.

---

## 6 · Structured + unstructured: Account 360 and the cohort builder (6 min)
🎫 CRM → **Account 360**:
1. Click the sample **📧 escalation email** → jina-ocr-v1 reads *ACC-10234* and *TKT-20417* out of the screenshot (~2.5 s) → the account file: Northwind Energy, health 54, renewal in November, activity timeline, five tickets incl. the P1, the screenshot archived into the file. Click **show OCR text**.
2. Bubble (now 🎯 Account 360 intelligence): *"Give me a full risk profile of account ACC-10234"* → verdict, evidence timeline, actions.

**Cohort builder** (data unification across four CRM systems):
1. **Discover** — Salesforce (clean), legacy EMEA (German fields, scanned contracts with OCR noise), APAC partner portal (SKU abbreviations, no industry), HubSpot (employee bands, decimal ids). Churn risk tracked in only two.
2. **Plan** — pill *"Find enterprise accounts using Endpoint Protection with more than 500 employees that are at risk of churn"* → **Plan** → the Elastic Managed LLM on EIS returns criteria + the **data gaps** per system.
3. **Build** (~2 s) → 29 strict + 21 probable. **Show Painless**: one script, field names as `params.f_*`.
4. **📏 Evaluation**: strict = 100 % precision, **84 % recall**; strict + probable = **100 % recall, 100 % precision** — the probable pass found churn language in the notes and recovered OCR-corrupted product names (`Endp0int Pr0tecti0n`) with `fuzzy`.
5. Bubble (🧬): *"Build a cohort of SIEM Integration customers at risk of churn and tell me how many came from each system"* → the agent runs the **Elastic Workflow** `crm_build_cohort` (reindex + Painless per system) and reports 38 strict + 32 probable by system (~1 min). Refresh the list → **⚙️ Elastic Workflow** badge.

**Say:** "Judgment layer = LLM; execution layer = deterministic Elasticsearch with provenance on every match; and the execution layer is also a Workflow the agent can run itself. No application server in the loop."

---

## 7 · Jina omni: image ↔ text ↔ audio in one vector space (5 min) — agenda 1b
🎨 **Multimodal Search → Image search**:
1. Text → image pills: `a network diagram` → topology diagram #1; `who reports to the CISO` → org chart #1; `an email about a production outage` → the escalation email #1; `a sign at the data center door` → restricted-area sign #1. **Hebrew:** `חשבונית עם סכום לתשלום` → the invoice #1. "No tags, no captions — the query vector and the image vectors live in the same space."
2. Sample **escalation email screenshot** → similar images, **and below**: 🎙️ *Recording: escalation call with Northwind Energy* at 100 (press play — the customer: "…otherwise this goes to our CISO before the renewal"), the scanned purchase order, the whitepaper.
3. Sample **error dialog screenshot** (ERR-4471) → 🎙️ *Voicemail: customer reporting an expired enrollment token* at 100. "A screenshot of an error found a voicemail complaining about the same error. Image, speech and text — one model, one space."
4. Inspector → `jina-embeddings-v5-omni`, cosine, `bbq_disk`.

**Audio as text (Search tab of the same cube):** `the customer threatened to escalate to the CISO before the renewal` → the escalation recording #1 with a player; `voicemail about an expired token` → the voicemail; `מה הלקוח אמר בשיחת ההסלמה` (semantic) → the voicemail and the call.

**Say about video (agenda 1b):** "The recordings are indexed by transcript (`doc_type: audio`). In production the transcript comes from a speech-to-text step — Whisper, or a self-hosted ASR in the air-gapped case. Video is the same pipeline: transcript + sampled frames embedded with the omni model into this same space, with video id and timestamp as metadata. Nothing in retrieval changes — you saw a screenshot retrieve a recording; a video frame retrieves the same way."

---

## 8 · OCR: scanned documents, and why the engine matters (3 min)
🎨 Multimodal → **Ingest files → OCR image ingest → Compare side by side** → sample **invoice-phone-photo** (blurry, skewed phone photo of the invoice):
- **jina-ocr-v1 (EIS)** ~5 s: clean Markdown, every line item, `INV-2026-00817`, `ACC-10234`, `$344,400.00`.
- **Tesseract (local)** ~0.4 s: "soeidion i 0 Congress Ave Assstis TR… Encpont Protection…" — the invoice number is lost.
"Same contract in the app, two engines. The cloud model reads what a phone camera produced; the local engine is the air-gapped fallback and still catches the ids on clean scans."

🎫 CRM → **Scanned PDF (OCR)** → *Try the sample: signed contract (3 scanned pages)* → per-page progress → `what is the uptime commitment` → **page 3** (SLA addendum) at 100, pages 1–2 at ~49; `how long is the initial term and does it auto-renew` → page 1. "Paper → page-level search in seconds."

---

## 9 · Architecture: air-gapped, independent (4 min) — agenda 2
Open Dev Console → **🔒 Self-hosted / air-gapped** while talking.

**Air-gapped / offline (Dream's cyber & critical-infrastructure context)**
- Everything shown runs on a self-managed cluster with no outbound connectivity: the same `semantic_text` field with an **in-cluster** model (ELSER, E5, or any Hugging Face embedding/reranker imported with Eland — the Dev Console shows the `PUT _inference` body), the same `retriever` tree, the same ES|QL, the same Agent Builder and Workflows.
- LLM: the OpenAI-compatible connector points at a local vLLM / Ollama / NIM server (body shown).
- OCR: the demo already ships the offline path — Tesseract is the fallback engine; §8 showed it live.
- The inference endpoint is an abstraction: application code never changes when a model moves from EIS to inside the cluster. Show `GET _inference/_all`.
- Be explicit: *this* demo uses EIS (cloud) because it is the fastest way to show the Jina models; the air-gapped mapping is one endpoint definition per model.

**No chain dependency (vs OpenSearch)**
- One vendor, one engine, one API: lexical, vectors with DiskBBQ, hybrid fusion (`rrf`/`linear` retrievers, `FUSE` in ES|QL), reranking (`text_similarity_reranker`, `RERANK` in ES|QL), `semantic_text` with built-in inference, agents, workflows, analytics — first-party and released together, not a plugin stack plus an external vector service.
- Flexible model hosting: EIS, in-cluster ML nodes, or any self-hosted server through the inference API — per model, per environment.
- Scale: DiskBBQ (1-bit vectors on disk, rescored) — the index that holds 15 images holds 100 million.
- Analysts and engineers share one language: show the ES|QL `FORK / FUSE / RERANK` entry in the Dev Console.

---

## 10 · Close (1 min)
"BM25 for precision, semantic for meaning and languages, hybrid for both, the Jina reranker for the final order, agents for answers, workflows for actions, one omni space for images, speech and text, OCR for paper, DiskBBQ for scale — and every piece runs the same way in an air-gapped cluster. One platform, no glue."

---

## Appendix A · verified queries (expected top result)

| Cube | Query | BM25 | Semantic | RRF + Rerank |
|---|---|---|---|---|
| KB | `ERR-4471` | ERR-4471 reference #1 | same | same |
| KB | `how do I kick a hacked machine off the network` | billing/serverless/MDR FAQs | *Isolating a compromised endpoint* #1 | #1 |
| KB | `my laptop is running slow after installing the agent` | install guides | *High CPU usage* #1 | *High CPU usage* "was #3 → #1" |
| KB | `install without internet access` | install guides | *air-gapped environment* #1 | "was #3 → #1", *Offline license activation* "was #11 → #2" |
| KB | `ransomware on a laptop what do I do first` | FAQs | playbooks / isolation | *Isolating…* "was #4 → #1" |
| KB | `login keeps bouncing back to the SSO page` | *Configuring SAML* | *SSO login loop* #1 | *SSO login loop* "was #2 → #1" |
| KB | `איך מתקינים את המערכת בלי חיבור לאינטרנט` | **0 results** | *air-gapped environment* #1 | — |
| Internal | `how many days off do I get` | *Payroll FAQ* | *PTO policy* #1 | #1 |
| Internal | `what happens when I leave the company` | *Legal hold notices* | *Exit checklist* #1 | *Exit checklist* "was #3 → #1" |
| Internal | `buying a monitor for my home office` | *WFH guidelines* | *Laptop refresh and hardware request* #1 | — |
| Internal | `כמה ימי חופשה מגיעים לי` | 0 results | *PTO policy* | #1 |
| CRM | `TKT-20481` | exact ticket alone | 4 look-alikes at 98–100 | exact on top (RRF) |
| CRM | `kubernetes pods crashlooping after the agent rollout` | *CPU on Kubernetes nodes* tickets | *CrashLoopBackOff* #1 | "was #12 → #1" |
| CRM | `invoice does not match what we ordered` | wrong (tier downgrade) | *re-issue the invoice* | *Invoice shows 120 endpoints…* "was #7 → #1" |
| CRM | `sensors show healthy but no alerts reach the SIEM` | hero ticket TKT-20417 #1 | same | same, Sentinel tickets "was #8 → #2" |
| CRM | `ספלאנק הפסיק לקבל אירועים` | 0 results | — | *ERR-3105 forwarding to Splunk HEC* #1 |
| Multimodal | `the customer threatened to escalate to the CISO before the renewal` | escalation recording #1 | same | same |
| Multimodal | `voicemail about an expired token` | voicemail #1 | same | same |
| Images | `a network diagram` / `who reports to the CISO` / `an email about a production outage` / `a sign at the data center door` / `חשבונית עם סכום לתשלום` | — | topology / org chart / escalation email / restricted sign / invoice #1 | — |
| Image → docs | escalation email screenshot → escalation call audio #1 · error dialog → voicemail (expired token) #1 · invoice → scanned PO #1 | | | |

## Appendix B · known behaviours
- Reranked modes may throw a transient `text_similarity_reranker` error right after a server restart (EIS warm-up) — re-run.
- Hebrew queries: use **Semantic** (or RRF); BM25 legitimately returns nothing. The reranker is weaker on Hebrew phrasings of the "laptop slow" story — use the three Hebrew queries listed above.
- `the dashboard is empty and nothing is showing up` is *not* a good story (the custom-dashboards article wins everywhere) — removed from the pills.
- The cohort agent occasionally calls the workflow tool more than once; the build is idempotent.
- jina-ocr-v1 takes ~2.5 s on screenshots and ~5 s on the phone photo; Tesseract ~0.4 s — say it out loud, it is part of the story.
