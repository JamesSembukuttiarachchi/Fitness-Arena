import React from 'react'
import './Plans.css'
import {plansData} from '../../../data/plansData.jsx'
import whiteTick from '../../../assets/whiteTick.png'

const Plans = () => {
  return (
    <div className="plans-container mt-[-4rem] py-0 px8 flex flex-col gap-16 relative" id='plans'>
        <div className="blurr plans-blur-1 w-[32rem] h-[23rem] top-24 left-0"></div>
        <div className="blurr plans-blur-2 w-[32rem] h-[23rem] top-40 right-0"></div>
        <div className="program-header flex gap-20 font-bold text-[3rem] justify-center text-white uppercase italic" style={{gap: '2rem'}}>
            <span className='stroke-text'>READY TO START</span>
            <span>YOUR JOURNEY</span>
            <span className='stroke-text'>NOW WITH US</span>
        </div>

        {/*plans*/}
        <div className="plans flex items-center justify-center gap-12">
            {plansData.map((plan, i) => (
                <div className="plan" key={i}>
                    {plan.icon}
                    <span>{plan.name}</span>
                    <span>$ {plan.price}</span>

                    <div className="features flex flex-col gap-4">
                        {plan.features.map((feature, i) => (
                            <div className="feature flex items-center gap-4">
                                <img src={whiteTick} alt="" className='w-4'/>
                                <span key={i}>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <span>See more benefits -> </span>
                    </div>
                    <button className='bttn text-black'>Join now</button>
                </div>
            ))}

            
        </div>

    </div>
  )
}

export default Plans