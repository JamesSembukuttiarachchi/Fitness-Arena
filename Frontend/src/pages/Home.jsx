import React from 'react'
import Banner from '../components/Banner';
import PopularCategories from './PopularCategories'
import Latest from '../components/Latest';


export const Home = () => {
  return (
    <div>
      <Banner />
      <Latest />
      <PopularCategories />
    </div>
  )
}
