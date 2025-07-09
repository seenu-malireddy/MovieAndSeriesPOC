# Firebase Setup Guide for ScreenScene

## Overview
ScreenScene now uses Firebase Authentication for real user authentication instead of localStorage mock authentication.

## Firebase Configuration Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `screenscene-app` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Optionally enable other providers (Google, Facebook, etc.)

### 3. Get Firebase Configuration

1. In your Firebase console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Enter app nickname: `ScreenScene Web App`
5. Click "Register app"
6. Copy the Firebase configuration object

### 4. Update Firebase Configuration

Replace the placeholder values in `src/config/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

### 5. Configure Firebase Security Rules (Optional)

If you plan to use Firestore later, set up basic security rules:

1. Go to "Firestore Database" in Firebase console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users

## Features Enabled

### ✅ Real Authentication
- Users can create accounts with email/password
- Secure password requirements (minimum 6 characters)
- Email verification (sent automatically on signup)
- Password reset functionality

### ✅ Better Security
- No more localStorage password storage
- Firebase handles all authentication securely
- Session management handled automatically

### ✅ Enhanced User Experience
- Persistent login across browser sessions
- Real-time authentication state changes
- Better error handling with specific messages

## Authentication Flow

### Sign Up Process:
1. User enters email, password, first name, last name
2. Firebase creates the account
3. Email verification is sent automatically
4. User profile is updated with display name
5. User is signed in automatically

### Sign In Process:
1. User enters email and password
2. Firebase validates credentials
3. User is authenticated and redirected
4. Authentication state persists across sessions

### Sign Out Process:
1. User clicks sign out button
2. Firebase signs out the user
3. User is redirected to home page
4. Authentication state is cleared

## Error Handling

The app now provides specific error messages for common authentication issues:

- **Email already in use**: "An account with this email already exists"
- **Weak password**: "Password should be at least 6 characters"
- **Invalid credentials**: "Invalid email or password"
- **User disabled**: "This account has been disabled"
- **Too many requests**: "Too many failed attempts. Please try again later"

## Development vs Production

### Development:
- Use Firebase test mode
- Enable email/password authentication
- Test with real email addresses

### Production:
- Configure proper security rules
- Enable email verification requirements
- Consider adding additional authentication providers
- Set up proper error monitoring

## Migration from localStorage

The app automatically migrated from localStorage authentication to Firebase. Key changes:

1. **AuthContext**: Now uses Firebase Auth services
2. **User Data**: Stored in Firebase instead of localStorage
3. **Authentication State**: Managed by Firebase Auth listeners
4. **Error Handling**: More specific Firebase error codes

## Testing Authentication

### Test User Creation:
```bash
# Run the development server
npm run dev

# Navigate to /signup
# Create a test account with:
# - Valid email address
# - Password (6+ characters)
# - First and last name
```

### Test Sign In:
```bash
# Navigate to /signin
# Use the credentials you created
# Verify you're signed in successfully
```

### Test Sign Out:
```bash
# Click the sign out button in the header
# Verify you're redirected to home page
# Verify authentication state is cleared
```

## Next Steps (Optional)

1. **Add Firestore Database** for user data, favorites, and reviews
2. **Add Firebase Storage** for profile pictures
3. **Enable Social Authentication** (Google, Facebook, etc.)
4. **Add Email Verification Requirements**
5. **Implement Password Reset Flow**

## Troubleshooting

### Common Issues:

1. **Firebase not configured**: Update `src/config/firebase.ts` with your config
2. **Authentication not enabled**: Enable Email/Password in Firebase console
3. **Domain not authorized**: Add your domain to authorized domains in Firebase
4. **CORS errors**: Ensure your domain is properly configured in Firebase

### Development Tips:

- Check browser console for detailed Firebase error messages
- Use Firebase Auth emulator for local development
- Monitor authentication state in React DevTools
- Test with different email providers to ensure compatibility

## Security Considerations

1. **Never commit Firebase config to public repositories** (if using sensitive data)
2. **Enable email verification** for production apps
3. **Configure proper Firestore security rules** if using database
4. **Monitor authentication logs** in Firebase console
5. **Set up proper CORS policies** for production domains

Firebase Authentication is now fully integrated and ready for production use!