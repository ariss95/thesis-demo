# CLAUDE.md: thesis demo page

## What this repo is
A small static Angular page that explains my diploma thesis and shows its results, deployed to GitHub Pages with GitHub Actions. It's also my exercise for learning CI/CD. The steps are in `EXERCISE.md`.

- Thesis code: https://github.com/ariss95/thesis (Python, PyTorch 1.4)
- Thesis PDF (in Greek): https://github.com/ariss95/thesis/blob/main/Siozios_thesis_2021.pdf
- This repo contains **only the web page**. No model, no training code.
- The page is in English.

## How Claude should help
- **I write the GitHub Actions workflow myself.** Don't write it for me. Review it, explain errors, and give hints before solutions.
- Help freely with the Angular code and the page text, and explain anything non-obvious.
- Never invent results or claims. Use only the facts below. If something is missing, ask me.
- Keep the page text short and in plain English.

## About the thesis
Source: the thesis PDF (University of Ioannina, Sept 2021, advisor Prof. Lisimachos P. Kondi).

- **Idea:** a recurrent neural network built with deep unfolding. The steps of a proximal gradient method for an l1-l1 problem become the network's layers. It reconstructs video frames captured with compressed sensing, using the similarity between consecutive frames.
- **Anomaly detection:** train only on normal videos. A frame counts as anomalous when its reconstruction quality (PSNR) falls below a threshold.
- **Data:** moving MNIST (10,000 videos, 20 frames each, downscaled to 16×16; split 8,000 / 1,000 / 1,000). Anomalies were **synthetic**: in some test videos, one random frame had blocks of background pixels painted white.

**Key results (use these exact numbers):**
- Reconstruction: best mean PSNR **44.37 dB** at 50% compression (4 hidden layers, 1024-atom dictionary, A divided by 200). Above ~30 dB counts as good.
- More hidden layers helped: 2 → 34.30 dB, 3 → 36.88 dB, 4 → 39.20 dB (33% compression).
- Anomaly detection with compression, 25 dB threshold: precision **0.996**, recall **0.909** (902 true positives, 3 false positives, 90 missed, 18,845 true negatives).
- Other thresholds: 20 dB → precision 1.0 / recall 0.856; 30 dB → 0.747 / 0.946.
- **Negative result:** without compression, the model rebuilt even the anomalous frames well, so detection failed (e.g. 30 dB → recall 0.062). Compression is what makes the method work.
- **UCSD Ped1:** tried, but not completed because of memory limits, and downscaling made anomalies hard to see. Future work. No Ped1 results exist.

## Page structure
1. **The problem:** 2–3 sentences.
2. **How it works:** one simple diagram of the unfolded network.
3. **Results:** original vs. reconstructed frames, the anomaly example, the key numbers, and the "without compression it fails" finding.
4. **Links:** the code repo and the PDF (mention it's in Greek).

Figures come from the thesis PDF (`pdfimages -png`) and live in `public/` or `src/assets/`.
