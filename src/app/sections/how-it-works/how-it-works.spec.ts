import { TestBed } from '@angular/core/testing';
import { HowItWorks } from './how-it-works';

describe('HowItWorks', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorks],
    }).compileComponents();

    const fixture = TestBed.createComponent(HowItWorks);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('is a section labelled by its heading', () => {
    const section = compiled.querySelector('section');
    const headingId = section?.getAttribute('aria-labelledby');
    expect(headingId).toBeTruthy();
    expect(compiled.querySelector(`#${headingId}`)?.textContent).toContain('How it works');
  });

  it('shows the network diagram with a meaningful alt text', () => {
    const img = compiled.querySelector('figure img');
    expect(img?.getAttribute('src')).toBe('figures/unfolded-rnn-vs-rnn.png');
    expect(img?.getAttribute('alt')?.trim().length).toBeGreaterThan(10);
    expect(compiled.querySelector('figcaption')?.textContent).toContain('stacked RNN');
  });
});
