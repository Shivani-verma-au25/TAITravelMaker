import { getPlaceDetails } from '@/aiServices/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCArdITem({userTripInfo}) {
    const [photoUrl, setPhotoUrl] = useState(null);



      useEffect(() => {
        GEtPlacePhoto();
      }, [userTripInfo]);
    
      const GEtPlacePhoto = async () => {
        const data = {
          textQuery: trip?.userSelection?.location?.label,
        };
    
        try {
          const result = await getPlaceDetails(data);
          // console.log("API Response:", result.data);
    
          const photoData = result?.data?.places?.[0]?.photos?.[0]?.name; // Use first photo
    
          if (photoData) {
            const newPhotoUrl = `https://places.googleapis.com/v1/${photoData}/media?maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
            setPhotoUrl(newPhotoUrl);
          } else {
            console.error("No valid photo reference found.");
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };


  return (
    <Link to={`/view-trip/${userTripInfo?.id}`}>
        <div className='hover:scale-105 transition-all hoverLshadow-lg'>

            <img className='object-cover rounded-xl' src={photoUrl || "https://img.freepik.com/premium-photo/travel_1173594-2266.jpg?semt=ais_hybrid"} alt="" />
            <div>
                <h2 className='font-bold text-lg'>{userTripInfo?.userSelection?.location?.label}</h2>
                <h2>{userTripInfo?.userSelection.noOfDays}  Days trip with <span className='font-medium text-red-700'>{userTripInfo?.userSelection?.budget}</span> Budget</h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCArdITem