import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { ProjectsComponent } from '../projects/projects.component';
import { WhyBoostnutComponent } from '../why-boostnut/why-boostnut.component';
import { ContactComponent } from '../contact/contact.component';
import { CursorComponent } from '../cursor/cursor.component';
import { ScrollProgressComponent } from '../scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    ProjectsComponent,
    WhyBoostnutComponent,
    ContactComponent,
    CursorComponent,
    ScrollProgressComponent,
  ],
  template: `
    <app-cursor />
    <app-scroll-progress />
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-projects />
      <app-why-boostnut />
      <app-contact />
    </main>
  `,
})
export class LandingComponent {}
