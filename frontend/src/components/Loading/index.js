import React from 'react'

export default ({ isLoading }) => {
  if (isLoading) return <div>Loading...</div>

  return null;
}