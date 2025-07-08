import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

interface TranslationResource {
  translation: Record<string, string>
}

interface Resources {
  en: TranslationResource
  ar: TranslationResource
}

const resources: Resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      favorites: 'Favorites',
      profile: 'Profile',
      search: 'Search',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      submit: 'Submit',
      
      // Authentication
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      
      // Movies & Shows
      movies: 'Movies',
      shows: 'TV Shows',
      genres: 'Genres',
      year: 'Year',
      rating: 'Rating',
      overview: 'Overview',
      cast: 'Cast',
      reviews: 'Reviews',
      addReview: 'Add Review',
      yourReview: 'Your Review',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      releaseDate: 'Release Date',
      runtime: 'Runtime',
      director: 'Director',
      
      // Filters
      allGenres: 'All Genres',
      allYears: 'All Years',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      popularity: 'Popularity',
      voteAverage: 'Rating',
      
      // Messages
      addedToFavorites: 'Added to favorites',
      removedFromFavorites: 'Removed from favorites',
      reviewAdded: 'Review added successfully',
      reviewUpdated: 'Review updated successfully',
      signInSuccess: 'Signed in successfully',
      signUpSuccess: 'Account created successfully',
      noResults: 'No results found',
      noFavorites: 'No favorites yet',
      
      // Language
      language: 'Language',
      english: 'English',
      arabic: 'العربية',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      favorites: 'المفضلة',
      profile: 'الملف الشخصي',
      search: 'بحث',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signOut: 'تسجيل الخروج',
      
      // Common
      loading: 'جاري التحميل...',
      error: 'خطأ',
      retry: 'إعادة المحاولة',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      submit: 'إرسال',
      
      // Authentication
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      welcomeBack: 'مرحباً بعودتك',
      createAccount: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      
      // Movies & Shows
      movies: 'أفلام',
      shows: 'مسلسلات',
      genres: 'التصنيفات',
      year: 'السنة',
      rating: 'التقييم',
      overview: 'نظرة عامة',
      cast: 'طاقم التمثيل',
      reviews: 'المراجعات',
      addReview: 'إضافة مراجعة',
      yourReview: 'مراجعتك',
      addToFavorites: 'إضافة للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      releaseDate: 'تاريخ الإصدار',
      runtime: 'مدة العرض',
      director: 'المخرج',
      
      // Filters
      allGenres: 'جميع التصنيفات',
      allYears: 'جميع السنوات',
      filterBy: 'تصفية حسب',
      sortBy: 'ترتيب حسب',
      popularity: 'الشعبية',
      voteAverage: 'التقييم',
      
      // Messages
      addedToFavorites: 'تم إضافته للمفضلة',
      removedFromFavorites: 'تم إزالته من المفضلة',
      reviewAdded: 'تم إضافة المراجعة بنجاح',
      reviewUpdated: 'تم تحديث المراجعة بنجاح',
      signInSuccess: 'تم تسجيل الدخول بنجاح',
      signUpSuccess: 'تم إنشاء الحساب بنجاح',
      noResults: 'لا توجد نتائج',
      noFavorites: 'لا توجد مفضلة حتى الآن',
      
      // Language
      language: 'اللغة',
      english: 'English',
      arabic: 'العربية',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  })

// Update document direction based on language
i18n.on('languageChanged', (lng: string) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lng
})

// Set initial direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
document.documentElement.lang = i18n.language

export default i18n