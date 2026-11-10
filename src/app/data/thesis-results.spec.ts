import {
  CONFUSION_AT_HEADLINE_THRESHOLD,
  DATASET,
  DETECTION_WITH_COMPRESSION,
  HEADLINE_THRESHOLD_DB,
} from './thesis-results';

describe('thesis results data', () => {
  const headline = DETECTION_WITH_COMPRESSION.find((r) => r.thresholdDb === HEADLINE_THRESHOLD_DB);
  const {
    truePositives: tp,
    falsePositives: fp,
    falseNegatives: fn,
  } = CONFUSION_AT_HEADLINE_THRESHOLD;

  it('has a detection result for the headline threshold', () => {
    expect(headline).toBeDefined();
  });

  // The thesis reports these values cut to 3 decimals, so allow up to 0.001 difference.
  it('headline precision matches the frame counts', () => {
    expect(Math.abs(tp / (tp + fp) - headline!.precision)).toBeLessThan(0.001);
  });

  it('headline recall matches the frame counts', () => {
    expect(Math.abs(tp / (tp + fn) - headline!.recall)).toBeLessThan(0.001);
  });

  it('dataset split adds up to the number of videos', () => {
    const { train, validation, test } = DATASET.split;
    expect(train + validation + test).toBe(DATASET.videos);
  });
});
