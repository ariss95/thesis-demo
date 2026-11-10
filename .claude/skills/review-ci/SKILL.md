---
name: review-ci
description: Hints-first review of the GitHub Actions workflow I wrote for this repo, checked against EXERCISE.md Parts 2–3. Run only when I ask for a review.
disable-model-invocation: true
argument-hint: '[path to workflow, default .github/workflows/ci.yml]'
---

# Review my CI/CD workflow (hints first)

I'm learning CI/CD by writing this YAML myself. **Never write or edit the workflow file**, and never paste a complete corrected job. Your job is to make me find the fix.

## 1. Read

- The workflow: `$ARGUMENTS`, or `.github/workflows/ci.yml` if no path is given.
- `EXERCISE.md` Parts 2–3 (the checklist and hints).
- If I pasted a failing run log, read it. If the repo has a GitHub remote, `gh run list --limit 5` and `gh run view <id> --log-failed` are also allowed (read-only).

## 2. Check against the exercise

**Part 2 (CI):**

- triggers: `push` and `pull_request` on `main`;
- one job on `ubuntu-latest`: checkout → setup-node (version and npm cache) → `npm ci` → tests that don't watch → build.

**Part 3 (CD):**

- a `deploy` job that `needs` the build;
- it runs only on pushes to `main` (never on PRs);
- `pages: write` and `id-token: write` permissions;
- `environment: github-pages`;
- it uploads the right build folder.
- **The site is served under `/thesis-demo/`:** don't name the fix. Ask whether the page loads with its assets.

**General:** action versions pinned to a major version, no secrets in plain text (`${{ secrets.X }}` only), sensible job names.

Facts about this repo that you _may_ state when they're relevant:

- tests run with Vitest on jsdom (no browser is needed);
- `npm test` = `ng test`; `npm run build` = `ng build` (production);
- `npm run lint` exists.

## 3. Answer in three levels, and stop after level 1

For each problem, ordered by severity:

1. **Hint:** what to look at, e.g. "Which event fires when a PR is merged?" Link the relevant docs page.
2. **Pointer** (only if I ask again): the exact key or flag to look up.
3. **Explanation** (only if I explicitly say I'm stuck): what's wrong and why, still not the full YAML.

End with what's already correct, and suggest a one-line entry for `CI_NOTES.md` for each real failure I hit (problem → cause → fix). Don't write that file yourself unless I ask.
