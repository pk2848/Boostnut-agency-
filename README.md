# BoostNut – 3D Digital Growth Studio

A fully 3D animated, production-ready agency website built with **Angular**, **Three.js**, **GSAP**, and **Tailwind CSS**.

![BoostNut Hero](https://github.com/user-attachments/assets/9a42a96a-920b-433d-84ac-1de2e66c9ae3)

## 🚀 Features

- **Three.js 3D Scene** – Rotating glowing sphere with floating particles in the hero section
- **Mouse Interactive Camera** – Camera movement responds to mouse position
- **Scroll-Triggered Animations** – IntersectionObserver-powered smooth section reveals (GSAP available for advanced animations)
- **Glassmorphism UI** – Modern glass-effect cards and navbar
- **3D Tilt Cards** – Interactive service and project cards with tilt on hover
- **Custom Animated Cursor** – Dot + trail cursor with hover effects
- **Scroll Progress Bar** – Top progress indicator
- **Animated Counters** – Number counters that animate on scroll
- **Responsive Design** – Fully mobile-friendly with hamburger menu
- **Dark Futuristic Theme** – Neon blue + purple gradient design

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Angular (standalone components) | Frontend framework |
| Three.js | 3D WebGL scenes |
| GSAP | Animation library (available for advanced animations) |
| Tailwind CSS v3 | Utility-first styling |
| TypeScript | Type safety |

## 📁 Project Structure

```
src/app/
├── components/
│   ├── navbar/         # Glass sticky navbar with mobile menu
│   ├── hero/           # Full-screen 3D WebGL hero section
│   ├── services/       # 3D tilt service cards
│   ├── projects/       # Interactive project portfolio
│   ├── why-boostnut/   # Stats with animated counters
│   ├── contact/        # Glassmorphism contact form
│   ├── cursor/         # Custom animated cursor
│   └── scroll-progress/# Top scroll progress bar
├── app.ts              # Root component
├── app.html            # App template
└── app.config.ts       # App configuration
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/pk2848/Development-agency.git
cd Development-agency

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/`. The application will auto-reload on file changes.

### Build for Production

```bash
npm run build
```

Build artifacts are stored in the `dist/` directory.

### Run Tests

```bash
npm test
```

## 🎨 Design Theme

- **Background**: Dark (#0a0a0a)
- **Primary**: Neon Blue (#2563eb)
- **Accent**: Purple gradient (#7c3aed)
- **Effects**: Glassmorphism, glow borders, smooth transitions

## 🌐 Deployment

Deploy to any static hosting:

- **Netlify**: Connect GitHub repo, set build command to `npm run build`, publish directory to `dist/boostnut/browser`
- **Vercel**: Import repo, framework preset Angular
- **Firebase**: `firebase init hosting` → `firebase deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
