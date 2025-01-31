import { getPlaceDetails } from '@/aiServices/GlobalApi';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaShare } from "react-icons/fa6";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    GEtPlacePhoto();
  }, [trip]);

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
    <div>
      <img 
        className="h-[350px] w-full object-cover rounded-xl" 
        src={photoUrl || "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"} 
        alt="Place" 
      />

      <div className="flex justify-between items-center">
        <div className="my-5 gap-2 flex flex-col">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 bg-gray-200 rounded-full text-gray-500 px-4 text-sm md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 bg-gray-200 rounded-full text-gray-500 px-4 text-sm md:text-md">
              💰 {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 bg-gray-200 rounded-full text-gray-500 px-4 text-sm md:text-md">
              🧑🏻‍🤝‍🧑🏻 No. Of travelers: {trip?.userSelection?.people}
            </h2>
          </div>
        </div>
        <Button><FaShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
