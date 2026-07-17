---
name: capture-experience
description: Use when the user wants to dump/log their raw work experience at a specific company (responsibilities, achievements, metrics, projects) so it can be turned into polished resume bullets for /tailor-resume to draw on later — e.g. "let's capture my experience at Acme Corp", "I want to log what I did at my last job", "add my time at X to the resume knowledge base". Acts as an expert resume writer: converts a raw brain-dump into ATS-quality bullets, tagged by skill/theme, each traceable back to what the user actually said. Writes to resume/knowledge/<company-slug>.json — never edits About.js. Do not use this for tailoring to a specific job posting — that's /tailor-resume; this skill only builds the raw material bank.
---

# Capture Company Experience into the Resume Knowledge Base

## What this is for

[/tailor-resume](../tailor-resume/SKILL.md) can only work with what's already written down in `About.js` — a
curated, public-facing subset of the user's career. This skill is the intake step: it takes an unstructured
brain-dump about a specific company (what the user did, built, fixed, shipped, led) and turns it into
polished, tagged resume bullets, saved to a knowledge base file that `/tailor-resume` can draw on for future
tailoring runs. It does not touch `About.js` and it does not publish anything to the live site's About page.

## Output location

`resume/knowledge/<company-slug>.json` — one file per company. Slugify the company name the same way
`/tailor-resume` slugifies (lowercase, hyphens). If the file already exists, **merge** — read it first, append
new roles/bullets, don't overwrite prior captures for that company.

**Note:** this repo is public (GitHub Pages) and `resume/knowledge/` is **not** gitignored — anything written
here becomes visible in the public repo once committed and pushed, same as `resume/tailored/`. Say this to the
user the first time they use this skill, and flag it again if what they paste looks like it contains NDA'd
client names, unreleased product names, or internal-only metrics — ask before including anything that reads
as confidential.

## Inputs

The user provides a company name and a raw dump of their experience there — bullet points, a
stream-of-consciousness paragraph, an old resume draft, performance review excerpts, whatever they have. It
does not need to be polished; that's this skill's job. If they only name a company with no content, ask them
to paste what they remember (responsibilities, projects, wins, metrics, tools used) before proceeding.

## Process

1. **Identify the company and check for existing data.**
   - Slugify the company name.
   - If `resume/knowledge/<slug>.json` exists, read it fully — you'll be merging into it, not replacing it.
   - Cross-reference against `About.js` `timeline` (read it) to see if this company already has a role there —
     if so, reuse the same `companyname`, `title`, `StartDate`/`EndDate` for consistency. If the company isn't
     in `About.js` at all, proceed anyway — capture now, decide whether to add it to the live site later as a
     separate, normal edit (not part of this skill).

2. **Extract discrete claims from the raw input.** Break the dump into individual, verifiable statements:
   things the user actually did, built, owned, fixed, or delivered. If multiple roles/promotions at the same
   company are mentioned, group by role.

3. **Rewrite each as a resume-quality bullet**, acting as an expert resume writer:
   - Lead with a strong action verb, state the task/system, and the outcome or scope.
   - Keep metrics **only if the user's raw input contains them** — never invent a percentage, dollar figure,
     team size, or timeframe that wasn't stated. If a claim would be stronger with a metric and none was
     given, leave it qualitative and optionally ask the user if they can supply one.
   - Tag each bullet with 2-4 lowercase keywords covering the skill/domain/theme it demonstrates (e.g.
     `["react","performance","leadership"]`) — this is what lets `/tailor-resume` find the right bullet for a
     future JD.
   - Attach a `source` field: the verbatim snippet (or close paraphrase) from the user's raw input that this
     bullet is derived from. This is the provenance trail — it's what proves nothing was fabricated, and lets
     the user (or a future run) verify a bullet against what they actually said.

4. **Extract a skills list** — technologies, tools, methodologies mentioned in the raw dump, whether or not
   they made it into a bullet.

5. **Write the JSON file**, creating `resume/knowledge/` if it doesn't exist, in this shape:
   ```json
   {
     "company": "Acme Corp",
     "companySlug": "acme-corp",
     "lastUpdated": "YYYY-MM-DD",
     "roles": [
       {
         "title": "Senior Backend Engineer",
         "startDate": "MM/DD/YYYY",
         "endDate": "MM/DD/YYYY or empty if current",
         "rawNotes": "the user's original paste for this role, kept verbatim",
         "skills": ["go", "postgresql", "kubernetes"],
         "bullets": [
           { "text": "Polished resume bullet.", "tags": ["backend", "performance"], "source": "verbatim or close paraphrase of what the user said" }
         ]
       }
     ],
     "projects": [
       { "name": "Project name", "rawNotes": "verbatim paste", "bullets": [ { "text": "...", "tags": ["..."], "source": "..." } ] }
     ]
   }
   ```
   Omit `projects` if none were mentioned. Multiple roles at the same company (promotions) each get their own
   entry in `roles`.

6. **Report back**: how many bullets were captured per role, the skills tags extracted, and explicitly call
   out anything left qualitative because no metric was given (invite the user to supply one). If anything was
   flagged as possibly confidential in step 1, remind them here before they commit/push.

## Guardrails

- Never invent a metric, outcome, team size, or scope that wasn't in the user's raw input. Every bullet must
  have a `source` a reader could trace back to what the user actually said.
- Never edit `About.js` — this skill only writes to `resume/knowledge/`.
- Don't overwrite an existing company file — read and merge.
- This is intake, not tailoring. Don't try to match a job description here — that's `/tailor-resume`'s job,
  once this knowledge base has material for it to draw on.

## Handing off to /tailor-resume

Once a `resume/knowledge/<slug>.json` file exists, `/tailor-resume` checks for a matching company file when
tailoring a resume for that employer and may draw bullets from it (in addition to `About.js`) for richer
phrasing options — `About.js` stays canonical for dates/titles/facts. See
[tailor-resume/SKILL.md](../tailor-resume/SKILL.md) for how it's consumed.
