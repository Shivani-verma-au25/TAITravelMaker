import { db } from '@/aiServices/fireBseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from './InfoSection'
import HotelInfo from './HotelInfo'

function ViewTrip() {
    const {tripId} = useParams()
    const [trip,setTrip] = useState([])

    // to get trip info from firebase
    const getripData = async() =>{
        const docRef = doc(db,'AITrips',tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap) {
        console.log("doc",docSnap.data());
        setTrip(docSnap.data())
        
        }else{
            console.log("No serach document");
            toast("No trip found!")    
        }

    }

    // side effects hook
    useEffect(() =>{
        tripId && getripData()
    },[tripId])

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* {information} */}
        <InfoSection trip={trip} />
        {/* {recommended hotels} */}
        <HotelInfo trip={trip} />
        {/* itinerary  daily plan */}
        {/* footer */}
    </div>
  )
}

export default ViewTrip