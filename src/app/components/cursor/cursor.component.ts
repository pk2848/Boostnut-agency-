import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css',
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  cursorX = signal(0);
  cursorY = signal(0);
  trailX = signal(0);
  trailY = signal(0);
  isHovering = signal(false);

  private isBrowser: boolean;
  private animationId = 0;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    window.addEventListener('mousemove', this.onMouseMove);
    this.animateTrail();

    // Detect hoverable elements
    document.addEventListener('mouseover', this.onMouseOver);
    document.addEventListener('mouseout', this.onMouseOut);
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('mouseout', this.onMouseOut);
    cancelAnimationFrame(this.animationId);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.cursorX.set(e.clientX);
    this.cursorY.set(e.clientY);
  };

  private onMouseOver = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      this.isHovering.set(true);
    }
  };

  private onMouseOut = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      this.isHovering.set(false);
    }
  };

  private animateTrail = () => {
    this.trailX.update((x) => x + (this.cursorX() - x) * 0.15);
    this.trailY.update((y) => y + (this.cursorY() - y) * 0.15);
    this.animationId = requestAnimationFrame(this.animateTrail);
  };
}
