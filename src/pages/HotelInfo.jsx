import React from 'react'
import { Link } from 'react-router-dom'

function HotelInfo({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-4'>Recommendation Hotels</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-hidden ' >
        {trip?.tripData?.hotel_options?.map((hotel,index) => (
          <Link to={`${import.meta.env.VITE_GOOGLE_MAP_LOCATION_SEARCH_API}?api=1&query=${hotel?.hotel_name + hotel?.hotel_address}`} target='_blank'>
            <div key={index} className='hover:scale-110 transition-all cursor-pointer ' >
              <img className='rounded-xl' src="https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg" alt="" />
              <div className='my-3 flex gap-1 flex-col'>
                <h2 className='font-medium '>{hotel?.hotel_name}</h2>
                <h2 className='text-gray-500 text-xs '>📍{hotel?.hotel_address}</h2>
                <h2 className=' text-sm mt-2 font-bold'>💰{hotel?.price}</h2>
                <h2 className=' text-sm mt-2 font-bold'>⭐{hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HotelInfo