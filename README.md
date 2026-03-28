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
- **School ERP + RFID Attendance** – Full attendance management system connected to Google Sheets via ESP32 RFID

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
│   ├── navbar/              # Glass sticky navbar with mobile menu
│   ├── hero/                # Full-screen 3D WebGL hero section
│   ├── services/            # 3D tilt service cards
│   ├── projects/            # Interactive project portfolio
│   ├── why-boostnut/        # Stats with animated counters
│   ├── contact/             # Glassmorphism contact form
│   ├── cursor/              # Custom animated cursor
│   ├── scroll-progress/     # Top scroll progress bar
│   ├── landing/             # Landing page wrapper component
│   └── erp/
│       ├── login/           # ERP login (admin + student)
│       ├── admin-dashboard/ # Admin view: table, search, filter, export, chart
│       └── student-panel/   # Student view: personal attendance history
├── services/
│   ├── attendance.service.ts # Fetches RFID records from Google Sheets
│   └── auth.service.ts       # Session-based authentication
├── guards/
│   └── auth.guard.ts         # Route protection
├── app.routes.ts             # Application routes
├── app.ts                    # Root component (RouterOutlet)
└── app.config.ts             # App configuration
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

## 🏫 School ERP – RFID Attendance System

The app includes a built-in School ERP at `/erp/login` for managing RFID-based attendance data stored in Google Sheets.

### Features
| Feature | Details |
|---|---|
| Admin Dashboard | View all records, search by name/UID, filter by date, export CSV, bar chart |
| Student Panel | Personal attendance history with on-time/late breakdown |
| Auto-refresh | Data re-fetched from Google Sheets every 5 seconds |
| Late detection | Entries after 09:00 are highlighted as "Late" |
| Authentication | Session-based login (admin credentials + student UID lookup) |

### Google Sheets Integration

The ESP32 firmware sends RFID scans to a Google Apps Script endpoint, which writes rows to a sheet named **`RFID_Attendance`** with columns `Date`, `Time`, `UID`, `Name`.

The web app reads data via [opensheet](https://opensheet.elk.sh):

```
https://opensheet.elk.sh/{SHEET_ID}/RFID_Attendance
```

**Steps to connect your own sheet:**

1. Create a Google Sheet with sheet name `RFID_Attendance` and the four column headers above.
2. **Share the sheet publicly** (Viewer access — required for opensheet).
3. Open `src/app/services/attendance.service.ts` and replace `DEFAULT_SHEET_ID` with your Sheet ID (the long string in the sheet URL).
4. Optionally add your Apps Script `doGet` handler (see issue body) for write-back.

### Demo credentials

| Role | Credential |
|---|---|
| Admin | username: `admin` / password: `admin123` |
| Student | Enter RFID UID, e.g. `B3EA6756` |

> 💡 To register more students, add entries to the `STUDENT_CARDS` map in `src/app/services/auth.service.ts`.

## 🌐 Deployment

Deploy to any static hosting:

- **Netlify**: Connect GitHub repo, set build command to `npm run build`, publish directory to `dist/boostnut/browser`
- **Vercel**: Import repo, framework preset Angular
- **Firebase**: `firebase init hosting` → `firebase deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
