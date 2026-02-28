import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WhyBoostnutComponent } from './components/why-boostnut/why-boostnut.component';
import { ContactComponent } from './components/contact/contact.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'BoostNut';
}
