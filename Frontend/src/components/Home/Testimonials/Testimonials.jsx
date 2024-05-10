import React, { useState } from 'react'
import './Testimonials.css'
import {testimonialsData} from '../../../data/testimonialsData.js'
import leftArrow from '../../../assets/leftArrow.png'
import rightArrow from '../../../assets/rightArrow.png'
import {motion} from 'framer-motion'

const Testimonials = () => {
    const [selected, setSelected] = useState(0);
    const tLength = testimonialsData.length;
    const transition = {type: 'spring', duration: 3}

  return (
    <div className="Testimonials flex gap-4 py-0 px-8" id='testimonials'>
        <div className="left-t flex flex-1 gap-8 flex-col uppercase text-white">
            <span>Testimonials</span>
            <span className='stroke-text'>What they</span>
            <span>Say about us</span>
            <motion.span
            key={selected}
            initial={{opacity:0, x: -100}}
            animate={{opacity:1, x:0}}
            exit={{opacity:0, x:100}}
            transition={transition}
            >
                {testimonialsData[selected].review}
            </motion.span>
            <span>
                <span className='text-norange'>
                    {testimonialsData[selected].name}
                </span>{" "}
                - {testimonialsData[selected].status}
            </span>
        </div>
        <div className="right-t flex-1 relative">
            <motion.div
            initial={{opacity: 0, x: -100}}
            whileInView={{opacity: 1, x: 0}}
            transition={transition}
            ></motion.div>
            <motion.div
            initial={{opacity: 0, x: 100}}
            whileInView={{opacity: 1, x: 0}}
            transition={transition}
            ></motion.div>
            <motion.img 
            key={selected}
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -100}}
            transition={transition}
            src={testimonialsData[selected].image} alt="" />
            <div className="arrows flex gap-4 absolute bottom-4 left-12">
                <img
                    onClick={() => {
                        selected === 0
                        ? setSelected(tLength -1)
                        : setSelected((prev) => prev - 1);
                    }}
                    src={leftArrow} alt="" />
                <img
                    onClick={() => {
                        selected === tLength - 1
                        ? setSelected(0)
                        : setSelected((prev) => prev + 1)
                    }} 
                    src={rightArrow} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Testimonials