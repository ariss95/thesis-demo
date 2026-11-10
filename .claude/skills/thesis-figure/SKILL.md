---
name: thesis-figure
description: Use when adding, replacing or captioning a figure from the thesis PDF on this page (reconstructed frames, anomaly example, network diagram, false-positive example), or when writing any result text or number next to a figure.
---

# Add a thesis figure to the page

Facts and numbers come **only** from the "About the thesis" section of `CLAUDE.md`. If a caption needs something that isn't there, stop and ask. Don't read numbers off the PDF yourself.

## 1. Find and extract the image

The PDF is at `../thesis/Siozios_thesis_2021.pdf` (in Greek).

```bash
pdfimages -list ../thesis/Siozios_thesis_2021.pdf          # page, size, type of every image
pdftotext -f 26 -l 26 ../thesis/Siozios_thesis_2021.pdf -  # read the caption around a page
pdfimages -png -f 26 -l 26 ../thesis/Siozios_thesis_2021.pdf /tmp/fig
```

- Every image has a matching `smask` row (its transparency mask, a grey image). Keep the `image` file and ignore the `smask` file.
- Look at the extracted PNG with the Read tool before using it, to confirm it's the figure you want.
- If the right figure is unclear, list the candidates (page, size, what it shows) and ask me.

## 2. Put it in `public/figures/`

- Use a descriptive kebab-case name, such as `reconstruction-50pct.png` or `anomaly-frame.png`, never `fig-003.png`.
- `public/` is copied to the build root. In templates, reference the file as `figures/<name>.png`, with no leading `/`.
- Keep files small. These are 16×16 frames upscaled into figures, so PNGs should stay well under 100 kB.

## 3. Show it

Use `NgOptimizedImage`, with the real pixel size taken from `pdfimages -list`:

```html
<figure>
  <img
    ngSrc="figures/reconstruction-50pct.png"
    width="690"
    height="511"
    alt="Original moving-MNIST frames above, reconstructed frames below"
  />
  <figcaption>…text built only from CLAUDE.md facts…</figcaption>
</figure>
```

- Add `NgOptimizedImage` to the component's `imports`.
- The `alt` text says what the image shows. The caption says why it matters.
- Never place a number directly in the template. Import it from `src/app/data/thesis-results.ts`, and add it there first if it's missing (copied exactly from CLAUDE.md).
- For the first image on the page (above the fold), add `priority`.

## 4. Keep it honest

Wherever results appear, the page must still say:

- the anomalies were **synthetic** (white blocks painted onto one frame);
- **without compression, detection failed**;
- **UCSD Ped1** is future work, with no results.

## 5. Verify

Add or extend the section's spec to check that the `<img>` renders with a non-empty `alt`. Then run the `ng-verify` skill.
