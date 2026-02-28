import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  title: string;
  category: string;
  description: string;
  gradient: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  projects: Project[] = [
    {
      title: 'AI Analytics Dashboard',
      category: 'AI Solutions',
      description: 'Real-time analytics platform powered by machine learning algorithms for predictive insights.',
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Full-stack e-commerce solution with seamless payment integration and inventory management.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Process Automation Suite',
      category: 'Automation',
      description: 'Enterprise automation system reducing manual workflows by 80% with intelligent routing.',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Health Tech App',
      category: 'UI/UX Design',
      description: 'Award-winning health monitoring application with intuitive design and real-time tracking.',
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      title: 'FinTech Trading Platform',
      category: 'Web Development',
      description: 'High-frequency trading platform with real-time data visualization and secure transactions.',
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      title: 'Smart IoT Dashboard',
      category: 'AI Solutions',
      description: 'IoT monitoring dashboard connecting thousands of devices with AI-powered anomaly detection.',
      gradient: 'from-blue-600 to-indigo-600',
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

    document.querySelectorAll('.project-card').forEach((card) => {
      this.observer?.observe(card);
    });
  }

  onCardMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
  }

  onCardMouseLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  }
}
