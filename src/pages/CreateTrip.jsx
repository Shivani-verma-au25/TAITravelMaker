import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOption, SelectTravelList } from '@/constanst/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast, { Toaster } from 'react-hot-toast';


function CreateTrip() {
  const   [place , setPlace] = useState('')
  const [formData ,setFormData] = useState([])

  const handleInputChange = (name,value) =>{
   
    setFormData({
      ...formData,
      [name]:value
    })
  }


  useEffect(()=>{
  console.log(formData, 'formData'); // Correctly reference the state variable
    
  },[formData])


  const OnGenerateTrip = () =>{
    if (formData?.noOfDays > 10) {
        toast.error("Please make a trip for 10 days or under 10 days!")
      return
    }
  console.log("Places" , formData);

  }



  
  return (
    <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10 '>
      <Toaster/>
      <h2 className='font-bold text-3xl'>Tell us your Travel preferences 🏕️🌲</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information , and our trip planner will generate a customized  itinerary based on your preferences.</p>
    
      <div className='mt-20 flex flex-col gap-10 '>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination choice ?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place , 
              onChange:(v) =>{ 
                console.log(v);
                
                setPlace(v); 
                handleInputChange('location',v)
                console.log(v,"v");
                
                }}}
           />
        </div>

        {/*  */}
        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for trip?</h2>
          <Input type='number' placeholder={'Ex.3'}
          onChange={(e)=> handleInputChange('noOfDays' , e.target.value)}
           />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-7'>
            {SelectBudgetOption.map((budget,index) => (
              <div className ={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == budget.title}&&'shadow-xl`} key={index}
               onClick={() => handleInputChange('budget',budget.title)}
               >
                  <h2 className='text-4xl'>{budget.icon}</h2>
                  <h2 className='font-bold text-lg'>{budget.title}</h2>
                  <h2 className='text-sm text-gray-500'>{budget.description}</h2>
              </div>
            ))}
          </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How do you plan on traveleing with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-7'>
            {SelectTravelList.map((person,index) => (
              <div className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.person === person.title && 'shadow-lg border-black' }`} key={index}
                  onClick={() => handleInputChange('people',person.people)}

              >
                  <h2 className='text-4xl'>{person.icon}</h2>
                  <h2 className='font-bold text-lg'>{person.title}</h2>
                  <h2 className='text-sm text-gray-500'>{person.description}</h2>
              </div>
            ))}
          </div>
      </div>

    <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
    </div>

    </div>
  )
}

export default CreateTrip