# Exercise: thesis demo page with CI/CD

**Goal:** a one-page Angular site about my thesis that **builds, tests and deploys itself** to GitHub Pages every time I merge to `main`.

**End result:** `https://ariss95.github.io/thesis-demo/`, live, with a green workflow badge in the README.

**Rules**
- I write the workflow YAML myself, using the docs and error logs.
- Claude can help with the Angular code and the text, and can review my YAML. It doesn't write the YAML.
- I keep a log of failures and fixes in `CI_NOTES.md`. These become interview stories.

---

## Part 1: Set up the repo (~30 min)
- [ ] Create a **public** repo named `thesis-demo` on GitHub, with no README.
- [ ] Locally: `ng new thesis-demo` (choose CSS, no SSR), then push it to the repo.
- [ ] Add `CLAUDE.md` and this file to the root.
- [ ] Check that `npm start` and `npm test` both work locally.

✅ **Done when:** the empty Angular app runs locally and the code is on GitHub.

## Part 2: CI, build and test on every push (~1 hr)
Do this **before** writing the page, so every later change goes through the pipeline.

- [ ] Create `.github/workflows/ci.yml`.
- [ ] Triggers: `push` and `pull_request` on `main`.
- [ ] One job on `ubuntu-latest`: checkout → set up Node → `npm ci` → run tests headless → build.
- [ ] Push and watch the **Actions** tab.
- [ ] Test it: on a new branch, break a test on purpose, open a PR, and confirm it goes red ❌. Then fix it and see it go green ✅.

💡 **Hints:** `actions/checkout`, `actions/setup-node` (look at its `node-version` and `cache` inputs). Tests in CI must not wait for file changes, and there's no screen, so look up `--watch=false` and `ChromeHeadless`.

✅ **Done when:** a broken test blocks the PR, and a fixed one passes.

## Part 3: CD, deploy on merge (~1 hr)
- [ ] Repo **Settings → Pages → Source: GitHub Actions**.
- [ ] Add a second job, `deploy`, that:
  - waits for the build job,
  - runs **only** on pushes to `main`, never on PRs,
  - uploads the build output and deploys it to Pages.
- [ ] Merge a small text change and confirm it goes live without any manual step.

💡 **Hints:** `needs:`, a job-level `if:` using `github.event_name` and `github.ref`, `permissions:` (`pages: write`, `id-token: write`), `actions/upload-pages-artifact`, `actions/deploy-pages`, `environment: github-pages`.
⚠️ **Expected problem:** the page loads blank. The site lives under `/thesis-demo/`, not `/`. Look into `--base-href`. Also check which folder Angular actually builds into (`dist/...`).

✅ **Done when:** a merge to `main` shows up live at the URL within a few minutes.

## Part 4: The content (~1–2 hrs)
- [ ] Download `Siozios_thesis_2021.pdf` and extract its figures with `pdfimages -png Siozios_thesis_2021.pdf fig`.
- [ ] Pick the ones you need:
  - original vs. reconstructed frames (best result),
  - an anomalous frame and its reconstruction,
  - the false-positive example (optional).
- [ ] Put them in the app's static assets folder.
- [ ] Draft the text for each section in bullet points. Claude can turn it into plain English.

✅ **Done when:** you have the images and a text draft for all four sections.

## Part 5: The page (~2–3 hrs)
Build one page with four sections, each a small component:

1. **The problem:** what video anomaly detection is and the idea of the thesis, in 2–3 sentences.
2. **How it works:** a simple diagram of the unfolded network (an SVG or a drawn image is fine).
3. **Results:**
   - reconstructed frames next to the originals,
   - the key numbers: **44.37 dB** PSNR, **0.996** precision / **0.909** recall at 25 dB,
   - one honest line: without compression, detection failed, so compression is the key,
   - a note that the anomalies were synthetic and that Ped1 is future work.
4. **Links:** the code repo and the PDF (in Greek).

- [ ] Write at least one simple test per component, for example that each section renders.
- [ ] Every change goes through a **branch → PR → green CI → merge → auto-deploy**.

✅ **Done when:** the full page is live and was deployed only through the pipeline.

## Part 6: Extras (optional)
- [ ] Add a workflow status badge and the live link to this repo's README.
- [ ] Add the live link to the README of the `thesis` repo.
- [ ] Make the thresholds interactive: a small table or toggle for 20 / 25 / 30 dB.
- [ ] Protect `main`: require the CI check to pass before merging (Settings → Branches).
- [ ] Compare workflow run times with and without npm caching.

---

## When you finish
- Check `CI_NOTES.md` for at least 2–3 real problems you hit and how you solved them.
- Send Claude the repo link for a review.
- Update your profile notes: you've built a CI/CD pipeline end to end.

Docs: https://docs.github.com/en/actions · https://docs.github.com/en/pages
