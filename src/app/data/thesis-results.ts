/**
 * The thesis results shown on the page. Every number on the page comes from here;
 * templates never contain hard-coded results.
 *
 * Source: Siozios, diploma thesis, University of Ioannina, September 2021.
 */

/** PSNR (dB) above which a reconstruction counts as good. */
export const GOOD_PSNR_DB = 30;

/** Best mean reconstruction quality and the settings that produced it. */
export const BEST_RECONSTRUCTION = {
  psnrDb: 44.37,
  compressionPercent: 50,
  hiddenLayers: 4,
  dictionaryAtoms: 1024,
  /** The sensing matrix A was divided by this value. */
  sensingMatrixDivisor: 200,
} as const;

export interface LayersResult {
  readonly hiddenLayers: number;
  readonly psnrDb: number;
}

/** More hidden layers gave better reconstructions (at 33% compression). */
export const PSNR_BY_HIDDEN_LAYERS = {
  compressionPercent: 33,
  results: [
    { hiddenLayers: 2, psnrDb: 34.3 },
    { hiddenLayers: 3, psnrDb: 36.88 },
    { hiddenLayers: 4, psnrDb: 39.2 },
  ],
} as const satisfies { compressionPercent: number; results: readonly LayersResult[] };

export interface DetectionResult {
  /** A frame is flagged as anomalous when its PSNR falls below this threshold. */
  readonly thresholdDb: number;
  readonly precision: number;
  readonly recall: number;
}

/** Anomaly detection with compression, for each PSNR threshold tried. */
export const DETECTION_WITH_COMPRESSION = [
  { thresholdDb: 20, precision: 1.0, recall: 0.856 },
  { thresholdDb: 25, precision: 0.996, recall: 0.909 },
  { thresholdDb: 30, precision: 0.747, recall: 0.946 },
] as const satisfies readonly DetectionResult[];

/** The threshold used for the headline result. */
export const HEADLINE_THRESHOLD_DB = 25;

/** Frame counts behind the headline result (with compression, 25 dB threshold). */
export const CONFUSION_AT_HEADLINE_THRESHOLD = {
  truePositives: 902,
  falsePositives: 3,
  falseNegatives: 90,
  trueNegatives: 18_845,
} as const;

/**
 * Negative result: without compression the network rebuilt even the anomalous frames
 * well, so detection failed. Example at a 30 dB threshold.
 */
export const DETECTION_WITHOUT_COMPRESSION_EXAMPLE = {
  thresholdDb: 30,
  recall: 0.062,
} as const;

/** Moving MNIST, downscaled. The anomalies were synthetic. */
export const DATASET = {
  name: 'Moving MNIST',
  videos: 10_000,
  framesPerVideo: 20,
  frameSizePx: 16,
  split: { train: 8_000, validation: 1_000, test: 1_000 },
} as const;
