import React from 'react'
import { Hero } from '../components/Hero'
import SearchResults from '../components/SearchResults'
import ImagesContextProvider, { useImagesContext } from '../context/ImagesContext'
import '../styles/home.scss'

export const HomePage = () => {

  return (
    <ImagesContextProvider>
    <div>
        <Hero />
        <h1 className='new-arrival'>New arrival</h1>
        <SearchResults/>
    </div>
    </ImagesContextProvider>
  )
}
