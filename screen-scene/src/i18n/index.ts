import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
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

      // Auth
      email: 'Email',
      password: 'Password',
      username: 'Username',
      confirmPassword: 'Confirm Password',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signUpHere: 'Sign up here',
      signInHere: 'Sign in here',

      // Movies & TV Shows
      movies: 'Movies',
      tvShows: 'TV Shows',
      trending: 'Trending',
      popular: 'Popular',
      topRated: 'Top Rated',
      upcoming: 'Upcoming',
      nowPlaying: 'Now Playing',
      onTheAir: 'On The Air',
      airingToday: 'Airing Today',

      // Movie Details
      overview: 'Overview',
      cast: 'Cast',
      crew: 'Crew',
      reviews: 'Reviews',
      similar: 'Similar',
      recommendations: 'Recommendations',
      watchTrailer: 'Watch Trailer',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      rateThis: 'Rate this',
      writeReview: 'Write a review',
      yourReview: 'Your Review',
      submitReview: 'Submit Review',
      editReview: 'Edit Review',
      deleteReview: 'Delete Review',

      // Filters
      filterBy: 'Filter by',
      genre: 'Genre',
      year: 'Year',
      rating: 'Rating',
      sortBy: 'Sort by',
      allGenres: 'All Genres',
      allYears: 'All Years',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',

      // Common
      loading: 'Loading...',
      error: 'Error',
      noResults: 'No results found',
      tryAgain: 'Try again',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      more: 'More',
      less: 'Less',

      // Profile
      myProfile: 'My Profile',
      accountSettings: 'Account Settings',
      myReviews: 'My Reviews',
      myFavorites: 'My Favorites',
      changeAvatar: 'Change Avatar',
      updateProfile: 'Update Profile',

      // Language
      language: 'Language',
      english: 'English',
      arabic: 'العربية',
      
      // Additional
      welcome: 'Welcome',
      pleaseSignIn: 'Please sign in to continue',
      noFavorites: 'No favorites yet',
      noFavoritesDescription: 'Start adding movies and TV shows to your favorites to see them here.',
      noReviews: 'No reviews yet',
      noReviewsDescription: 'Start reviewing movies and TV shows to see them here.',
      item: 'item',
      items: 'items',
      details: 'Details',
      releaseDate: 'Release Date',
      voteCount: 'Vote Count',
    },
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      favorites: 'المفضلة',
      profile: 'الملف الشخصي',
      search: 'البحث',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      signOut: 'تسجيل الخروج',

      // Auth
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      username: 'اسم المستخدم',
      confirmPassword: 'تأكيد كلمة المرور',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      forgotPassword: 'نسيت كلمة المرور؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      signUpHere: 'إنشاء حساب هنا',
      signInHere: 'تسجيل الدخول هنا',

      // Movies & TV Shows
      movies: 'الأفلام',
      tvShows: 'المسلسلات',
      trending: 'الرائج',
      popular: 'الشائع',
      topRated: 'الأعلى تقييماً',
      upcoming: 'قريباً',
      nowPlaying: 'يعرض الآن',
      onTheAir: 'على الهواء',
      airingToday: 'يعرض اليوم',

      // Movie Details
      overview: 'الملخص',
      cast: 'طاقم التمثيل',
      crew: 'طاقم العمل',
      reviews: 'التقييمات',
      similar: 'مشابه',
      recommendations: 'التوصيات',
      watchTrailer: 'مشاهدة الإعلان',
      addToFavorites: 'إضافة إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      rateThis: 'قيّم هذا',
      writeReview: 'اكتب تقييماً',
      yourReview: 'تقييمك',
      submitReview: 'إرسال التقييم',
      editReview: 'تعديل التقييم',
      deleteReview: 'حذف التقييم',

      // Filters
      filterBy: 'تصفية حسب',
      genre: 'النوع',
      year: 'السنة',
      rating: 'التقييم',
      sortBy: 'ترتيب حسب',
      allGenres: 'جميع الأنواع',
      allYears: 'جميع السنوات',
      applyFilters: 'تطبيق التصفية',
      clearFilters: 'مسح التصفية',

      // Common
      loading: 'جاري التحميل...',
      error: 'خطأ',
      noResults: 'لا توجد نتائج',
      tryAgain: 'حاول مرة أخرى',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      more: 'المزيد',
      less: 'أقل',

      // Profile
      myProfile: 'ملفي الشخصي',
      accountSettings: 'إعدادات الحساب',
      myReviews: 'تقييماتي',
      myFavorites: 'مفضلتي',
      changeAvatar: 'تغيير الصورة',
      updateProfile: 'تحديث الملف الشخصي',

      // Language
      language: 'اللغة',
      english: 'English',
      arabic: 'العربية',
      
      // Additional
      welcome: 'مرحباً',
      pleaseSignIn: 'يرجى تسجيل الدخول للمتابعة',
      noFavorites: 'لا توجد مفضلات بعد',
      noFavoritesDescription: 'ابدأ بإضافة الأفلام والمسلسلات إلى مفضلتك لرؤيتها هنا.',
      noReviews: 'لا توجد تقييمات بعد',
      noReviewsDescription: 'ابدأ بتقييم الأفلام والمسلسلات لرؤيتها هنا.',
      item: 'عنصر',
      items: 'عناصر',
      details: 'التفاصيل',
      releaseDate: 'تاريخ الإصدار',
      voteCount: 'عدد الأصوات',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;