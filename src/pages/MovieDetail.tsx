import React from 'react'

const MovieDetail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Movie Details
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Detailed movie information will be displayed here.
      </p>
    </div>
  )
}

export default MovieDetail