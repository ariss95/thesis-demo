import { TestBed } from '@angular/core/testing';
import { Problem } from './problem';

describe('Problem', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Problem],
    }).compileComponents();

    const fixture = TestBed.createComponent(Problem);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('is a section labelled by its heading', () => {
    const section = compiled.querySelector('section');
    const headingId = section?.getAttribute('aria-labelledby');
    expect(headingId).toBeTruthy();
    expect(compiled.querySelector(`#${headingId}`)?.textContent).toContain('The problem');
  });

  it('explains training on normal videos and the PSNR threshold', () => {
    const text = compiled.textContent ?? '';
    expect(text).toContain('trained only on normal videos');
    expect(text).toContain('PSNR falls below a threshold');
  });
});
