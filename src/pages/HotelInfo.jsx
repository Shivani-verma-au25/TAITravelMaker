import React from 'react'
import HotelCardItem from './HotelCardItem'

function HotelInfo({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-4'>Recommendation Hotels</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-hidden ' >
        {trip?.tripData?.hotelOptions?.map((hotel,index) => (
          <HotelCardItem hotelInfomation={hotel} index={index} />
        ))}
      </div>
    </div>
  )
}

export default HotelInfo