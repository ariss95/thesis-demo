import { TestBed } from '@angular/core/testing';
import {
  BEST_RECONSTRUCTION,
  DETECTION_WITH_COMPRESSION,
  DETECTION_WITHOUT_COMPRESSION_EXAMPLE,
} from '../../data/thesis-results';
import { Results } from './results';

describe('Results', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results],
    }).compileComponents();

    const fixture = TestBed.createComponent(Results);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('is a section labelled by its heading', () => {
    const section = compiled.querySelector('section');
    const headingId = section?.getAttribute('aria-labelledby');
    expect(headingId).toBeTruthy();
    expect(compiled.querySelector(`#${headingId}`)?.textContent).toContain('Results');
  });

  it('shows the headline numbers from the data file', () => {
    const values = [...compiled.querySelectorAll('.stats .value')].map((el) => el.textContent);
    expect(values).toEqual(['44.37 dB', '0.996', '0.909']);
    expect(BEST_RECONSTRUCTION.psnrDb).toBe(44.37);
  });

  it('lists every detection threshold in the table', () => {
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(DETECTION_WITH_COMPRESSION.length);
    expect(compiled.querySelector('tr.headline th')?.textContent).toContain('25 dB');
  });

  it('states the no-compression failure and that the anomalies are synthetic', () => {
    const text = compiled.textContent ?? '';
    expect(text).toContain(`recall was only ${DETECTION_WITHOUT_COMPRESSION_EXAMPLE.recall}`);
    expect(text).toContain('synthetic');
  });

  it('gives every figure image a meaningful alt text', () => {
    const images = [...compiled.querySelectorAll('figure img')];
    expect(images.length).toBe(6);
    for (const img of images) {
      expect(img.getAttribute('alt')?.trim().length).toBeGreaterThan(10);
      expect(img.getAttribute('src')).toMatch(/^figures\/.+\.png$/);
    }
  });
});
