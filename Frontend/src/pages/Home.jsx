import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import Header from '../components/Home/Header/Header'
import '../App.css'
import Programs from '../components/Home/Programs/Programs'
import Reasons from '../components/Home/Reasons/Reasons'
import Plans from '../components/Home/Plans/Plans'
import Testimonials from '../components/Home/Testimonials/Testimonials'
import Footer from '../components/Home/Footer/Footer'

const Home = () => {
  return (
    <div className='Home'>
       <Hero/>
       <Programs/>
       <Reasons/>
       <Plans/>
       <Testimonials/>
       <Footer/>
    </div>
  )
}

export default Home