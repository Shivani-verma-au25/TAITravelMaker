import { db } from '@/aiServices/fireBseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'
import UserTripCArdITem from './UserTripCArdITem'

function MyTrips() {
    const navigate = useNavigate()
    const [userTrips ,setUserTrips] = useState([])

    useEffect(() => {
        getUserTrips()
    },[])

    // getting user details
    const getUserTrips = async () =>{
        const user =  JSON.parse(localStorage.getItem('user'))
        // console.log("user" ,user);
        
         
        if (!user) {
            navigate('/')
            return ; 
        }

        const q = query(collection(db ,'AITrips') , where ('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([])
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips((prev) => [...prev,doc.data()])
            });
    }

    console.log(userTrips,"trips");
 
  return (
    <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My trips</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-20'>
            {userTrips?.length > 0 ? (
                userTrips.map((trip, index) => (
                    <UserTripCArdITem key={index} userTripInfo={trip} />
                ))
            ) : (
                [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className='h-[300px] w-full bg-stone-200 animate-pulse'></div>
                ))
            )}
        </div>
    </div>
);

}

export default MyTrips