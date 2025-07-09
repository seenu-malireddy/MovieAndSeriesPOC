# ScreenScene

A movie and TV show website made with React, TypeScript, and Firebase Authentication.

## What it does

- Browse movies and TV shows
- Search for movies
- Sign up and login with Firebase Auth
- Save favorites
- Add reviews
- Works in English and Arabic

## How to run

1. Install stuff:
```
npm install
```

2. Start the app:
```
npm run dev
```

3. Open http://localhost:3000

## What I used

- React
- TypeScript  
- Vite
- Tailwind CSS
- Firebase Authentication
- Movie database API

## Features

- Home page with movies
- Search page
- Movie detail pages
- User accounts
- Favorites list
- Reviews
- Language switching

## Notes

The movie data comes from TMDb API. The API key is already included in the code. You can browse movies, save them to favorites, and write reviews. 

**Authentication**: Uses Firebase Authentication for real user accounts. See `FIREBASE_SETUP.md` for configuration instructions.

**Data Storage**: Favorites and reviews are currently stored in your browser. User accounts are managed by Firebase.