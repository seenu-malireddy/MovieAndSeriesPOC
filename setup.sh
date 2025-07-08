#!/bin/bash

echo "🚀 Setting up ScreenScene - Movie & Series Community Hub"
echo "=================================================="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your TMDb API key"
    echo "   Get your API key from: https://www.themoviedb.org/settings/api"
fi

# Type check
echo "🔍 Running TypeScript type check..."
npm run type-check

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the VITE_TMDB_API_KEY in .env file"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🔗 Useful commands:"
echo "   npm run dev      - Start development server"
echo "   npm run build    - Build for production"
echo "   npm run preview  - Preview production build"
echo "   npm run lint     - Run ESLint"
echo ""
echo "Happy coding! 🎬✨"