import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Settings, LogOut, Globe, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getInitials } from '../utils';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { currentLanguage, languages, changeLanguage, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'reviews'>('profile');

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('pleaseSignIn')}</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  const tabs = [
    { id: 'profile', label: t('myProfile'), icon: User },
    { id: 'settings', label: t('accountSettings'), icon: Settings },
    { id: 'reviews', label: t('myReviews'), icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('myProfile')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {getInitials(user.username)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {user.username}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  {t('signOut')}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Tab Content */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('myProfile')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('username')}
                      </label>
                      <input
                        type="text"
                        value={user.username}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('accountSettings')}
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Language Settings */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Globe size={20} />
                          {t('language')}
                        </div>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => changeLanguage(language.code)}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                              currentLanguage.code === language.code
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <span className="text-2xl">{language.flag}</span>
                            <div className="text-left">
                              <div className="font-medium">{language.name}</div>
                              <div className="text-sm text-gray-500">
                                {language.dir.toUpperCase()}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* RTL Support Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">
                        RTL Support
                      </h4>
                      <p className="text-blue-800 text-sm">
                        {isRTL 
                          ? 'Right-to-left layout is currently active for Arabic language support.'
                          : 'Left-to-right layout is currently active for English language support.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {t('myReviews')}
                  </h3>
                  
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t('noReviews')}
                    </h3>
                    <p className="text-gray-500">
                      {t('noReviewsDescription')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;