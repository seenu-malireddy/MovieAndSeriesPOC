# ScreenScene – Movie & Series Community Hub

A modern, responsive web application for discovering, reviewing, and managing your favorite movies and TV shows. Built with Vite, React, TypeScript, and integrated with TMDb API.

## 🌟 Features

### Authentication
- **Sign Up & Sign In**: Secure user authentication with form validation
- **User Profiles**: Personal profile management with avatar support
- **Session Persistence**: Automatic login state management

### Movie & TV Show Discovery
- **Browse Content**: Explore trending movies and TV shows
- **Search Functionality**: Real-time search with debounced input
- **Advanced Filtering**: Filter by genre, year, and media type
- **Responsive Design**: Optimized for mobile and desktop

### Personal Features
- **Favorites System**: Save and manage your favorite content
- **Review System**: Rate and review movies/TV shows
- **Local Storage**: Data persists across browser sessions

### Internationalization
- **Multi-language Support**: English and Arabic
- **RTL Support**: Full right-to-left layout for Arabic
- **Language Toggle**: Easy language switching

### Modern UI/UX
- **Mobile-First Design**: Optimized for mobile devices
- **Beautiful Interface**: Clean, modern design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Internationalization**: React i18next
- **HTTP Client**: Axios
- **API**: TMDb (The Movie Database)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd screen-scene
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up TMDb API**
   - Get your API key from [TMDb](https://www.themoviedb.org/settings/api)
   - Replace `YOUR_TMDB_API_KEY` in `src/services/tmdb.ts` with your actual API key

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### TMDb API Setup
1. Visit [TMDb](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Update the API key in `src/services/tmdb.ts`:
   ```typescript
   const API_KEY = 'your_actual_api_key_here';
   ```

### Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## 📱 Pages & Features

### Public Pages
- **Home** (`/`): Browse trending movies and TV shows
- **Sign In** (`/signin`): User authentication
- **Sign Up** (`/signup`): User registration
- **Movie/TV Detail** (`/movie/:id`, `/tv/:id`): Detailed content information

### Protected Pages (Require Authentication)
- **Favorites** (`/favorites`): Manage saved content
- **Profile** (`/profile`): User settings and preferences

### Key Features
- **Search & Filter**: Find content by title, genre, or year
- **Reviews**: Rate and comment on movies/TV shows
- **Favorites**: Save content for later viewing
- **Language Toggle**: Switch between English and Arabic
- **RTL Support**: Full Arabic language support

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter (system fallback)
- **Responsive**: Mobile-first approach
- **Accessibility**: High contrast ratios

## 🌐 Internationalization

### Supported Languages
- **English** (LTR)
- **Arabic** (RTL)

### Adding New Languages
1. Add language configuration in `src/contexts/LanguageContext.tsx`
2. Add translations in `src/i18n/index.ts`
3. Update RTL support if needed

## 📊 Data Management

### Local Storage
- User authentication state
- Favorites list
- User reviews
- Language preference

### API Integration
- TMDb API for movie/TV show data
- Real-time search and filtering
- Image optimization with multiple sizes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment

## 🔍 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Lazy loading and multiple sizes
- **Debounced Search**: Reduced API calls
- **Caching**: Local storage for user data
- **Bundle Optimization**: Tree shaking and minification

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie and TV show data
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the amazing UI library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy watching! 🎬🍿**
