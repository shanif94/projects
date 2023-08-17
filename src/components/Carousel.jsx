import React from 'react'
import './Carousel.css'
import { useState } from 'react'

import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs" 
// allows us import icons from react-icons

export default function Carousel({ imageData }) {
    const [slide, setSlide] = useState(0)

    function nextSlide() {
        // if slide is at last index, then go back to 0 index, else increment slide by 1
        setSlide(slide === imageData.length - 1 ? 0 : slide + 1)
    }

    function prevSlide() {
        // if slide is at first index, then go back to last index, else decrement by 1
        setSlide(slide === 0 ? imageData.length - 1 : slide -  1)
    }
    
    return (
        <div className='carousel'>

            <BsFillArrowLeftCircleFill className='arrow left-arrow' onClick={prevSlide}/>

            {imageData.map((item, index) => {
                return <img 
                    src={item.image} 
                    alt={item.alt} 
                    key={index} 
                    className={slide === index ? 'slide' : 'slide slide-hidden'}>
                    
                </img>
            })}

            <BsFillArrowRightCircleFill className='arrow right-arrow' onClick={nextSlide} />

            <span className='indicators'>
                {imageData.map((_, index) => {
                    return <button 
                    key={index} 
                    className={slide === index ? 'indicator' : 'indicator indicator-inactive'}
                    // for being able to click on the circle indicators
                    onClick={() => setSlide(index)}>

                </button>
                })}
            </span>
        </div>
    )
}
