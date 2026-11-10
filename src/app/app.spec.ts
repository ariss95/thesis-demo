import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('renders one page heading', () => {
    const headings = compiled.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('Video Anomaly Detection');
  });

  it('has header, main and footer landmarks', () => {
    expect(compiled.querySelector('header')).not.toBeNull();
    expect(compiled.querySelector('main')).not.toBeNull();
    expect(compiled.querySelector('footer')).not.toBeNull();
  });

  it('has a skip link that points to the main content', () => {
    const skipLink = compiled.querySelector<HTMLAnchorElement>('a.skip-link');
    const target = skipLink?.getAttribute('href')?.slice(1);
    expect(target).toBeTruthy();
    expect(compiled.querySelector('main')?.id).toBe(target);
  });
});
