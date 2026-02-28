import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  services: Service[] = [
    {
      icon: '🌐',
      title: 'Web Development',
      description:
        'Building scalable, high-performance web applications with modern frameworks and cutting-edge technologies.',
      color: '#2563eb',
    },
    {
      icon: '🤖',
      title: 'AI Solutions',
      description:
        'Integrating intelligent AI systems to automate workflows, enhance decision-making, and drive innovation.',
      color: '#7c3aed',
    },
    {
      icon: '⚡',
      title: 'Automation Systems',
      description:
        'Streamlining business processes with custom automation pipelines that save time and reduce errors.',
      color: '#2563eb',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description:
        'Crafting beautiful, intuitive interfaces that deliver exceptional user experiences and drive engagement.',
      color: '#7c3aed',
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
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.service-card').forEach((card) => {
      this.observer?.observe(card);
    });
  }

  onCardMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  onCardMouseLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  }
}
