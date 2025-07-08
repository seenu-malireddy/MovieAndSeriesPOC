# ScreenScene - Movie & Series Community Hub

A modern, responsive web application built with **Vite + React + TypeScript** that allows users to browse, search, and review movies and TV shows using the TMDb API. Features multilingual support (English/Arabic) with RTL layout support.

## 🚀 Features

### ✅ Completed Features

- **Authentication System**
  - Sign up and Sign in pages with form validation
  - Persistent user sessions
  - User profile management

- **Browse & Search**
  - Browse trending movies and TV shows
  - Search with filters (genre, year, rating)
  - Responsive grid and list view modes
  - Advanced filtering and sorting options

- **Movie/TV Show Details**
  - Detailed information pages
  - Cast and crew information
  - User reviews and ratings
  - Add reviews that persist on app restart

- **Favorites System**
  - Save movies/shows to favorites
  - Persistent favorites across sessions
  - Remove from favorites functionality

- **Multilingual Support**
  - English and Arabic language support
  - RTL (Right-to-Left) layout for Arabic
  - Language toggle in navigation

- **Responsive Design**
  - Mobile-first responsive design
  - Dark mode support
  - Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **State Management:** React Query for server state
- **Forms:** React Hook Form with validation
- **Internationalization:** react-i18next
- **API:** TMDb (The Movie Database) API
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDb API key (free registration required)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd screenscene
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

The project is already configured with a TMDb API key. The `.env` file will be automatically created during setup with the necessary configuration.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Main layout wrapper
│   ├── MovieCard.tsx    # Movie/TV show card component
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Home.tsx        # Home page with trending content
│   ├── SignIn.tsx      # Authentication pages
│   ├── SignUp.tsx
│   ├── Favorites.tsx   # User favorites
│   ├── Profile.tsx     # User profile
│   ├── MovieDetail.tsx # Movie details
│   ├── TVShowDetail.tsx # TV show details
│   └── Search.tsx      # Search page
├── context/            # React context providers
│   └── AuthContext.tsx # Authentication context
├── services/           # API and data services
│   ├── tmdbApi.ts      # TMDb API integration
│   ├── favoritesService.ts # Favorites management
│   └── reviewsService.ts   # Reviews management
├── locales/            # Internationalization
│   └── i18n.ts         # i18n configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
└── utils/              # Utility functions
```

## 🎯 Pages & Routes

- **`/`** - Home page with trending movies and TV shows
- **`/search`** - Search and filter movies/TV shows
- **`/movie/:id`** - Movie details page
- **`/tv/:id`** - TV show details page
- **`/favorites`** - User's favorite movies/shows (protected)
- **`/profile`** - User profile page (protected)
- **`/signin`** - Sign in page
- **`/signup`** - Sign up page

## 🔧 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm run type-check`** - Run TypeScript type checking

## 🌍 Internationalization

The app supports English and Arabic languages:

- **English (Default):** LTR layout
- **Arabic:** RTL layout with proper text direction
- Language can be toggled from the header navigation
- All UI text is translatable through i18n configuration

## 💾 Data Persistence

The application uses localStorage for data persistence:

- **User Authentication:** User sessions and account data
- **Favorites:** Saved movies and TV shows
- **Reviews:** User reviews and ratings
- **Language Preference:** Selected language preference

## 🎨 Styling & Theming

- **Tailwind CSS** for utility-first styling
- **Custom CSS variables** for theming
- **Responsive design** with mobile-first approach
- **Dark mode support** (system preference)
- **RTL support** for Arabic language

## 🚀 Features Demo

### Authentication
```typescript
// Sign up with validation
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "securepassword"
}
```

### Search & Filter
```typescript
// Filter movies by genre and year
const filters = {
  genre: "28", // Action
  year: "2023",
  sortBy: "popularity.desc"
}
```

### Reviews (Persistent)
```typescript
// Add review that survives app restart
const review = {
  rating: 5,
  title: "Amazing movie!",
  content: "Great storyline and acting..."
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TMDb API](https://www.themoviedb.org/documentation/api) for movie and TV show data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [React Query](https://react-query.tanstack.com/) for data fetching

## 🐛 Known Issues

- TMDb API rate limiting may apply for heavy usage
- Some movie/TV show images may not load if TMDb servers are down

## � API Configuration

This project is configured with a TMDb API key for demonstration purposes. In production:
- Use your own TMDb API key from [TMDb API Settings](https://www.themoviedb.org/settings/api)
- Store API keys securely using environment variables
- Never commit API keys to version control

## �🔮 Future Enhancements

- [ ] User watchlists
- [ ] Social features (following users)
- [ ] Movie/TV show recommendations
- [ ] Offline support
- [ ] Push notifications for new releases

---

**Built with ❤️ using React + TypeScript + Vite**