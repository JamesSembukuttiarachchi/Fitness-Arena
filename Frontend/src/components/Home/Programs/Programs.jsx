import React from 'react'
import './Programs.css'
import { programsData} from '../../../data/programsData'
import RightArrow from '../../../assets/rightArrow.png'

const Programs = () => {
  return (
    <div className="programs flex flex-col gap-8 py-0 px-8" id="programs">
        {/*header*/}
        <div className="program-header flex gap-20 font-bold text-[3rem] justify-center text-white uppercase italic">
            <span className='stroke-text'>Explore our</span>
            <span>Programs</span>
            <span className='stroke-text'>To Shape You</span>
        </div>

        <div className="program-categories flex gap-4">
            {programsData.map((program) =>(
                <div className="category flex flex-col bg-gray p-8 gap-4 text-white justify-between hover:custom-gradient">
                    {program.image}
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <div className="join-now flex items-center gap-8">
                        <span>Join Now</span>
                        <img src={RightArrow} alt="" className='w-4'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Programs