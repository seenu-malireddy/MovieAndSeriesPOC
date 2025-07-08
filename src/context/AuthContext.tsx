import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AuthContextType, User, SignUpData } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('screenscene_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('screenscene_user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true)
      
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get users from localStorage or create empty array
      const users = JSON.parse(localStorage.getItem('screenscene_users') || '[]')
      
      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (!foundUser) {
        throw new Error('Invalid email or password')
      }
      
      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = foundUser
      
      setUser(userWithoutPassword)
      localStorage.setItem('screenscene_user', JSON.stringify(userWithoutPassword))
      toast.success(t('signInSuccess'))
      
      return userWithoutPassword
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData: SignUpData): Promise<User> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get existing users or create empty array
      const users = JSON.parse(localStorage.getItem('screenscene_users') || '[]')
      
      // Check if user already exists
      if (users.find((u: any) => u.email === userData.email)) {
        throw new Error('User with this email already exists')
      }
      
      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      // Save to users array
      users.push(newUser)
      localStorage.setItem('screenscene_users', JSON.stringify(users))
      
      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = newUser
      
      setUser(userWithoutPassword)
      localStorage.setItem('screenscene_user', JSON.stringify(userWithoutPassword))
      toast.success(t('signUpSuccess'))
      
      return userWithoutPassword
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = (): void => {
    setUser(null)
    localStorage.removeItem('screenscene_user')
    toast.success('Signed out successfully')
  }

  const updateProfile = async (updatedData: Partial<User>): Promise<User> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!user) {
        throw new Error('No user logged in')
      }
      
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem('screenscene_user', JSON.stringify(updatedUser))
      
      // Also update in users array
      const users = JSON.parse(localStorage.getItem('screenscene_users') || '[]')
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData }
        localStorage.setItem('screenscene_users', JSON.stringify(users))
      }
      
      toast.success('Profile updated successfully')
      return updatedUser
    } catch (error) {
      toast.error('Failed to update profile')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}