// Favorites Service - manages favorite movies and TV shows
export const favoritesService = {
  // Get all favorites for a user
  getFavorites: (userId) => {
    if (!userId) return []
    
    try {
      const favorites = localStorage.getItem(`screenscene_favorites_${userId}`)
      return favorites ? JSON.parse(favorites) : []
    } catch (error) {
      console.error('Error getting favorites:', error)
      return []
    }
  },

  // Add item to favorites
  addToFavorites: (userId, item) => {
    if (!userId || !item) return false
    
    try {
      const favorites = favoritesService.getFavorites(userId)
      
      // Check if item is already in favorites
      const exists = favorites.some(fav => 
        fav.id === item.id && fav.media_type === item.media_type
      )
      
      if (exists) return false
      
      // Add timestamp and ensure media_type is set
      const favoriteItem = {
        ...item,
        media_type: item.media_type || (item.title ? 'movie' : 'tv'),
        addedAt: new Date().toISOString()
      }
      
      const updatedFavorites = [favoriteItem, ...favorites]
      localStorage.setItem(
        `screenscene_favorites_${userId}`, 
        JSON.stringify(updatedFavorites)
      )
      
      return true
    } catch (error) {
      console.error('Error adding to favorites:', error)
      return false
    }
  },

  // Remove item from favorites
  removeFromFavorites: (userId, itemId, mediaType) => {
    if (!userId || !itemId) return false
    
    try {
      const favorites = favoritesService.getFavorites(userId)
      const updatedFavorites = favorites.filter(fav => 
        !(fav.id === itemId && fav.media_type === mediaType)
      )
      
      localStorage.setItem(
        `screenscene_favorites_${userId}`, 
        JSON.stringify(updatedFavorites)
      )
      
      return true
    } catch (error) {
      console.error('Error removing from favorites:', error)
      return false
    }
  },

  // Check if item is in favorites
  isFavorite: (userId, itemId, mediaType) => {
    if (!userId || !itemId) return false
    
    const favorites = favoritesService.getFavorites(userId)
    return favorites.some(fav => 
      fav.id === itemId && fav.media_type === mediaType
    )
  },

  // Get favorites count
  getFavoritesCount: (userId) => {
    return favoritesService.getFavorites(userId).length
  },

  // Clear all favorites
  clearFavorites: (userId) => {
    if (!userId) return false
    
    try {
      localStorage.removeItem(`screenscene_favorites_${userId}`)
      return true
    } catch (error) {
      console.error('Error clearing favorites:', error)
      return false
    }
  },

  // Get favorites by type
  getFavoritesByType: (userId, mediaType) => {
    const favorites = favoritesService.getFavorites(userId)
    return favorites.filter(fav => fav.media_type === mediaType)
  },

  // Export favorites (for backup/sharing)
  exportFavorites: (userId) => {
    const favorites = favoritesService.getFavorites(userId)
    return {
      userId,
      exportDate: new Date().toISOString(),
      favorites,
      count: favorites.length
    }
  },

  // Import favorites (from backup)
  importFavorites: (userId, favoritesData) => {
    if (!userId || !favoritesData || !Array.isArray(favoritesData.favorites)) {
      return false
    }
    
    try {
      localStorage.setItem(
        `screenscene_favorites_${userId}`, 
        JSON.stringify(favoritesData.favorites)
      )
      return true
    } catch (error) {
      console.error('Error importing favorites:', error)
      return false
    }
  }
}

export default favoritesService