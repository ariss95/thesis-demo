import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BEST_RECONSTRUCTION,
  CONFUSION_AT_HEADLINE_THRESHOLD,
  DATASET,
  DETECTION_WITH_COMPRESSION,
  DETECTION_WITHOUT_COMPRESSION_EXAMPLE,
  GOOD_PSNR_DB,
  HEADLINE_THRESHOLD_DB,
  PSNR_BY_HIDDEN_LAYERS,
} from '../../data/thesis-results';

function findHeadlineDetection() {
  const result = DETECTION_WITH_COMPRESSION.find((r) => r.thresholdDb === HEADLINE_THRESHOLD_DB);
  if (!result) {
    throw new Error(`No detection result for the ${HEADLINE_THRESHOLD_DB} dB headline threshold`);
  }
  return result;
}

@Component({
  selector: 'app-results',
  imports: [NgOptimizedImage, DecimalPipe],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  protected readonly best = BEST_RECONSTRUCTION;
  protected readonly goodPsnrDb = GOOD_PSNR_DB;
  protected readonly byLayers = PSNR_BY_HIDDEN_LAYERS;
  protected readonly dataset = DATASET;
  protected readonly detection = DETECTION_WITH_COMPRESSION;
  protected readonly headline = findHeadlineDetection();
  protected readonly confusion = CONFUSION_AT_HEADLINE_THRESHOLD;
  protected readonly withoutCompression = DETECTION_WITHOUT_COMPRESSION_EXAMPLE;
}
