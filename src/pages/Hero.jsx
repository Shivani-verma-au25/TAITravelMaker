import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex items-center flex-col mx-56 gap-9 mt-20'>
      <h2 className='font-extrabold text-5xl text-center'><span className='text-[#4356]'>Discover your next adventure with AI:</span> Personalized Itineraries at your finguretips </h2>
      <p className='text-xl text-center font-mono'>Your Personal trip planner and travel curator , creating custom itineraries tailored to your intrests and budget.</p>
      <Link to={'/create-trip'} >
        <Button>Get Started, It's free</Button>
      </Link>
    </div>
  )
}

export default Hero