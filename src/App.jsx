import React from 'react'
import Carousel from './components/Carousel.jsx'
import { slides } from './data/carouselData.json'
import './App.css'

function App() {


  return (
    <div className='carousel-container'>
      <h2></h2>
      <Carousel imageData={slides}/>
    </div>
  )
}

export default App
