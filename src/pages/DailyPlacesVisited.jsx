import React from 'react'
import PlaceCArdItem from './PlaceCArdItem'

function DailyPlacesVisited({trip}) {
    // console.log(trip?.tripData?.itinerary,"daily");
    
    
   
    
  return ( 
    <div>
        <h2 className='font-bold text-lg'>Places to visit</h2>
        <div>
            {trip.tripData?.itinerary.map((item,index) =>(
                <div key={index} className=''>
                    <div className='mt-3'>
                        <h2 className='font-medium text-lg'>Day {item.day} - </h2>
                            <div className='grid md:grid-cols-2 gap-5'>
                                {item.activities.map((place,index) => (
                                <div className='my-3' key={index}>
                                    <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                                <PlaceCArdItem place={place} />
                                </div>
                                ))}
                            </div>
                    </div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default DailyPlacesVisited