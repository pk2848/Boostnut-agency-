import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-why-boostnut',
  standalone: true,
  templateUrl: './why-boostnut.component.html',
  styleUrl: './why-boostnut.component.css',
})
export class WhyBoostnutComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;
  private animated = false;

  stats = signal<Stat[]>([
    { value: 50, suffix: '+', label: 'Projects Delivered', current: 0 },
    { value: 99, suffix: '%', label: 'Client Satisfaction', current: 0 },
    { value: 24, suffix: '/7', label: 'Support Available', current: 0 },
    { value: 3, suffix: 'x', label: 'Faster Delivery', current: 0 },
  ]);

  reasons = [
    {
      icon: '🎯',
      title: 'Result-Driven Approach',
      description: 'Every project is designed with clear KPIs and measurable outcomes in mind.',
    },
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Enterprise-grade security practices built into every solution from day one.',
    },
    {
      icon: '🚀',
      title: 'Rapid Delivery',
      description: 'Agile methodology ensures quick iterations and faster time-to-market.',
    },
    {
      icon: '💡',
      title: 'Innovation Hub',
      description: 'Cutting-edge technologies and creative solutions for complex challenges.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.setupScrollAnimation();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupScrollAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(statsSection);
  }

  private animateCounters() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.stats.update((stats) =>
        stats.map((s) => ({
          ...s,
          current: Math.round(s.value * easeOut),
        }))
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
  }
}
