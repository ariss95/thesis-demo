# CLAUDE.md: thesis demo page

## What this repo is

A small static Angular **21.2** page (standalone, zoneless, SCSS, Vitest) that explains my diploma thesis and shows its results, deployed to GitHub Pages with GitHub Actions. It's also my exercise for learning CI/CD. The steps are in `EXERCISE.md`.

- Thesis code: https://github.com/ariss95/thesis (Python, PyTorch 1.4)
- Thesis PDF (in Greek): https://github.com/ariss95/thesis/blob/main/Siozios_thesis_2021.pdf (local copy: `../thesis/Siozios_thesis_2021.pdf`)
- This repo contains **only the web page**. No model, no training code.
- The page is in English.

## How Claude should help

- **I write the GitHub Actions workflow myself.** Don't write it for me. Review it, explain errors, and give hints before solutions.
- Help freely with the Angular code and the page text, and explain anything non-obvious.
- Never invent results or claims. Use only the facts below. If something is missing, ask me.
- Keep the page text short and in plain English.

## Commands (run from this folder)

| Task             | Command                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Serve            | `npm start` → http://localhost:4200                                                      |
| Build            | `npm run build` (production)                                                             |
| Test, full suite | `npx ng test --watch=false`                                                              |
| Test, one file   | `npx ng test --watch=false --include src/app/sections/results/results.spec.ts`           |
| Lint             | `npm run lint` (angular-eslint, incl. template accessibility rules)                      |
| Format           | `npx prettier --write <files>` · check: `npx prettier --check "src/**/*.{ts,html,scss}"` |

## Layout

```
src/main.ts, index.html, styles.scss   bootstrap, host page, global styles only
src/app/app.ts|html|scss|spec.ts        root component: page shell, renders the sections in order
src/app/app.config.ts, app.routes.ts    providers; routes stay empty (one page)
src/app/sections/<name>/                one folder per section: problem, how-it-works, results, links
src/app/shared/                         UI used by 2+ sections (e.g. a captioned figure); create only when needed
src/app/data/thesis-results.ts          the key numbers as typed constants, written only here
public/figures/                         images from the thesis PDF
```

- New section → `src/app/sections/<name>/` (skill: `ng-component`). New figure → skill `thesis-figure`.
- No services or HTTP; everything is static. If a service is ever needed: `src/app/core/`.

## Angular & TypeScript rules (v21)

The `angular-developer` skill is written for v22. Where it differs, these win:

- Every new component sets `changeDetection: ChangeDetectionStrategy.OnPush` (the default only from v22).
- Services: `@Injectable({ providedIn: 'root' })` + `inject()`. No `@Service` (v22+).
- No Signal Forms (experimental in v21). The page needs no forms; the 20/25/30 dB toggle is a `signal` + buttons.
- Separate `.html`/`.scss` next to the `.ts`, not inline (matches `app.ts` and `ng g c`).

Always:

- No `standalone: true`, NgModules or `CommonModule`; import only what the template uses.
- Signals for state: `signal`, `computed`, `input()`/`output()`/`model()`; `set`/`update`, never `mutate`.
- `@if` / `@for` (with `track`) / `@switch`; `class`/`style` bindings, not `ngClass`/`ngStyle`; `host: {}`, not `@HostBinding`/`@HostListener`.
- `NgOptimizedImage` (`ngSrc` + `width`/`height`) for every figure.
- Accessibility: pass AXE checks and WCAG AA (contrast, focus, ARIA); every figure has a meaningful `alt`.
- Strict TS + `strictTemplates`: no `any` (use `unknown`); rely on inference when the type is obvious.

## Conventions (from the existing code)

- **Naming:** suffixless, v20+ style: `app.ts` → `class App` + `app.html`/`app.scss`/`app.spec.ts`; selector prefix `app-` (`angular.json`, enforced by ESLint). So `sections/results/results.ts` → `class Results`, `<app-results />`.
- **State:** template fields are `protected readonly` signals (`title = signal(...)` in `app.ts`).
- **Data:** no HTTP (`app.config.ts` has no `provideHttpClient`). Numbers come from `data/thesis-results.ts`, never typed into templates.
- **Styling:** SCSS per component, globals only in `src/styles.scss`. Component style budget: 4 kB warning / 8 kB error (`angular.json`). The placeholder markup and `<style>` block in `app.html` get replaced.
- **Static files:** `public/` is copied to the build root; reference as `figures/x.png` (no leading `/`).
- **Tests:** Vitest globals on jsdom, one spec next to each component. Pattern from `app.spec.ts`: `TestBed.configureTestingModule({ imports: [X] })` → `createComponent` → `await fixture.whenStable()` → query `fixture.nativeElement`. No `fixture.detectChanges()`.
- **Formatting:** Prettier (`.prettierrc`: width 100, single quotes, Angular HTML parser); 2-space indent.

## Looking things up

For Angular APIs, first use the `angular-cli` MCP server (docs search, best practices, examples), then the `angular-developer` skill, then https://angular.dev/assets/context/llms-full.txt (index: https://angular.dev/llms.txt). Don't rely on memory for newer APIs (signals, Signal Forms, control flow, zoneless, resources), and check that the answer applies to v21.

## Definition of done

A task is finished only when the change builds, the relevant tests pass and lint is clean. Run these (skill: `ng-verify`) and report the result before saying it's done:

1. `npm run build`
2. `npx ng test --watch=false` (the relevant spec while working, the full suite before finishing)
3. `npm run lint` and `npx prettier --check "src/**/*.{ts,html,scss}"`

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

Figures come from the thesis PDF (`pdfimages -png`) and live in `public/figures/`.
