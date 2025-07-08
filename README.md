# Vite + React + TypeScript Project

A modern web application built with Vite, React, and TypeScript.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type-safe JavaScript
- 🎨 **Modern CSS** - Responsive design with CSS variables
- 🧹 **ESLint** - Code linting and formatting
- 🔥 **Hot Module Replacement (HMR)** - Instant updates during development

## Project Structure

```
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── App.css              # App component styles
│   ├── App.tsx              # Main App component
│   ├── index.css            # Global styles
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── .eslintrc.cjs            # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript config for build tools
└── vite.config.ts           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Technologies Used

- **Vite 5** - Build tool and development server
- **React 18** - UI library
- **TypeScript 5** - Type checking
- **ESLint** - Code linting
- **CSS3** - Styling with modern features

## Key Features

### TypeScript Configuration
- Strict type checking enabled
- Modern ES2020 target
- React JSX support
- Path mapping support

### Vite Configuration
- React plugin enabled
- Fast HMR
- Optimized build output
- Modern browser targeting

### ESLint Setup
- TypeScript-aware linting
- React hooks rules
- React refresh plugin
- Consistent code formatting

## Development Tips

1. **Hot Module Replacement**: Changes to React components will update instantly without losing state
2. **TypeScript**: Take advantage of type checking for better code quality
3. **Import aliases**: You can configure path aliases in `vite.config.ts` for cleaner imports
4. **CSS Modules**: Rename `.css` files to `.module.css` for scoped styles

## Customization

### Adding Dependencies

```bash
npm install package-name
npm install -D dev-package-name  # for dev dependencies
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Adding CSS Frameworks

For Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

For styled-components:
```bash
npm install styled-components
npm install -D @types/styled-components
```

## Deployment

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Upload dist/ folder to Vercel or use Vercel CLI
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## License

This project is open source and available under the [MIT License](LICENSE).