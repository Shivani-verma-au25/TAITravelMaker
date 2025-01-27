import { Button } from '@/components/ui/button'
import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from 'react-router-dom';


function PlaceCArdItem({place}) {
  return (
    <Link  to={`${import.meta.env.VITE_GOOGLE_MAP_LOCATION_SEARCH_API}?api=1&query=${place?.placeName }`} target='_blank' >
        <div className='shadow-md border rounded-xl p-3 my-2 flex gap-6 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img  className='w-[150px] h-[120px] rounded-lg  ' src="https://media.istockphoto.com/id/858917054/photo/happy-friends-travel-expedition-concept.jpg?s=612x612&w=0&k=20&c=ATiu_Nvrt5Rs5NYo6mib-e35MvsyR-caaXlQ1BIiq00=" alt="" />
            <div className='flex flex-col justify-between items-start'> 
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                <p className=''>🕰️{place.timeTravel}</p>
                <p className='font-bold text-xs text-green-600 mt-1'>{place.bestTimeToVisit}</p>
                {/* <Button size='sm' className=''><FaLocationArrow /></Button> */}
            </div>
        </div>
    </Link>
  )
}

export default PlaceCArdItem