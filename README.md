# Admin Customization - Brand Colors Manager

A React SPA built with Vite, TypeScript, Tailwind CSS, and shadcn/ui for managing brand colors and customizing application appearance.

## Features

- 🎨 **Brand Color Management** - Define and manage 8 core brand colors
- 🎯 **UI Element Mapping** - Map colors to specific UI elements (buttons, navigation, etc.)
- 👁️ **Live Preview** - Real-time preview of color changes on homepage template
- 🧩 **shadcn/ui Components** - Built with modern, accessible UI components
- ⚡ **Vite** - Lightning-fast development and build tool
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Form Handling:** react-hook-form + zod
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone git@github.com:elizmdavis/design-test.git
cd design-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
Shad/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── pages/
│   │   └── AdminCustomization.tsx  # Main admin page
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles + Tailwind
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Brand Colors Section

- Manage up to 8 brand colors
- Visual color swatches with hex codes
- Edit colors using native color picker
- Upload brand guide to extract colors

### Color Mapping

Map brand colors to UI elements in three categories:

1. **Buttons/Links**
   - Primary Button & Hover
   - Secondary Button & Hover
   - Neutral Button
   - Links

2. **Navigation**
   - Nav Hover
   - Nav Selected
   - Stepper

3. **General**
   - Portal Background
   - Assist IQ
   - Bar Chart Color

### Live Preview

Real-time preview panel showing:
- Homepage template with applied colors
- Navigation bar
- Hero section
- Account cards
- Investment dashboard
- Transaction history

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

Components are installed to `src/components/ui/` and can be imported using the `@/` alias:

```tsx
import { Dialog } from "@/components/ui/dialog"
```

## Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```tsx
import { Button } from "@/components/ui/button"
import { AdminCustomization } from "@/pages/AdminCustomization"
```

## Customization

### Adding New Color Mappings

1. Add the mapping to the `colorMappings` state in `AdminCustomization.tsx`
2. Add the UI element to the appropriate section (Buttons/Links, Navigation, or General)
3. Use the color in the preview panel

### Modifying the Preview

The preview panel is located in the `AdminCustomization.tsx` file under the "Preview Panel" section. Update the preview to reflect your application's design.

## Building for Production

Build the project:
```bash
npm run build
```

The build output will be in the `dist/` directory, ready to be deployed to any static hosting service.

## Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages:**
   - Go to your repository: `https://github.com/elizmdavis/design-test`
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Click **Save**

2. **Deploy:**
   - Push your code to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be live at: `https://elizmdavis.github.io/design-test/`

3. **Check Deployment Status:**
   - Go to the **Actions** tab in your repository
   - Watch the deployment progress

### Other Deployment Options

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop `dist/` folder
- **Any Static Hosting** - Upload `dist/` folder

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

This project is private and proprietary.

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Testing Branch Protection Workflow

This is a test change to verify the branch protection workflow is working correctly.
