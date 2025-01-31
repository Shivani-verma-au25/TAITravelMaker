import { getPlaceDetails } from '@/aiServices/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotelInfomation, index}) {
    const [photoUrl, setPhotoUrl] = useState(null);

    const fetchHotelPhoto = async () => {
        const photoRef = await getPlaceDetails(hotelInfomation?.hotel_name);
        if (photoRef) {
            setPhotoUrl(
                `https://places.googleapis.com/v1/${photoRef}?maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`
            );
        }
    };

    useEffect(() => {
        if (hotelInfomation?.hotel_name) fetchHotelPhoto();
    }, [hotelInfomation]);


    return (
        <Link
            key={index}
            to={`${import.meta.env.VITE_GOOGLE_MAP_LOCATION_SEARCH_API}?api=1&query=${hotelInfomation?.hotel_name} ${hotelInfomation?.hotel_address}`}
            target='_blank'
        >
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img
                    className='rounded-xl'
                    src={photoUrl || "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"}
                    alt="Hotel"
                />
                <div className='my-3 flex gap-1 flex-col'>
                    <h2 className='font-medium'>{hotelInfomation?.hotel_name}</h2>
                    <h2 className='text-gray-500 text-xs'>📍{hotelInfomation?.hotel_address}</h2>
                    <h2 className='text-sm mt-2 font-bold'>💰{hotelInfomation?.price}</h2>
                    <h2 className='text-sm mt-2 font-bold'>⭐{hotelInfomation?.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
