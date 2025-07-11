import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Heart, User, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/favorites', label: t('favorites'), icon: Heart, requiresAuth: true },
    { path: '/profile', label: t('profile'), icon: User, requiresAuth: true },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ScreenScene</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => {
              if (item.requiresAuth && !isAuthenticated) return null;
              
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Globe size={16} />
                <span>{currentLanguage.flag}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 ${
                        currentLanguage.code === language.code
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t('signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {t('signUp')}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {t('welcome')}, {user?.username}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                if (item.requiresAuth && !isAuthenticated) return null;
                
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Language Toggle Mobile */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-700 mb-2">{t('language')}</div>
                <div className="space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        changeLanguage(language.code);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                        currentLanguage.code === language.code
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons Mobile */}
              {!isAuthenticated ? (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 text-center"
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-center"
                  >
                    {t('signUp')}
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-2">
                  <div className="text-sm text-gray-700">
                    {t('welcome')}, {user?.username}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;