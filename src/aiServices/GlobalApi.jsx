import axios from "axios";

const BASE_URL = `https://places.googleapis.com/v1/places:searchText?key=`;
// `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`

const config = {
    headers: {  // ✅ Corrected key name
        "Content-Type": "application/json",  // ✅ Corrected case
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // ✅ Ensure it's loaded
        "X-Goog-FieldMask": "places.photos,places.displayName,places.id" // ✅ Fixed format
    }
    
};

// console.log(import.meta.env.VITE_GOOGLE_PLACE_API_KEY ,"api");

export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config);



export const getPlaceDetailsOFhelesimages = async (hotelName) => {
    try {
        const response = await axios.post(
            `https://places.googleapis.com/v1/places:searchText?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`,
            { textQuery: hotelName },
            { headers: { "Content-Type": "application/json" } }
        );
        
        const place = response.data?.places?.[0]; // First result
        if (!place) return null;

        const photoRef = place.photos?.[0]?.name; // Get first photo
        return photoRef ? photoRef : null;
    } catch (error) {
        console.error("Error fetching hotel details:", error);
        return null;
    }
};
