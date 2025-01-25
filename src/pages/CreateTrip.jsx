import { chatSession } from '@/aiServices/AiModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOption, SelectTravelList } from '@/constanst/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { db } from '@/aiServices/fireBseConfig';







function CreateTrip() {
  const   [place , setPlace] = useState('')
  const [formData ,setFormData] = useState([])
  const [openDialogue , setOpenDialogue] = useState(false)
  const [loading ,setLoading] = useState(false)

  const handleInputChange = (name,value) =>{
   
    setFormData({
      ...formData,
      [name]:value
    })
  }


  useEffect(()=>{
  console.log(formData, 'formData'); // Correctly reference the state variable
    
  },[formData])

// login 
const loginUser = useGoogleLogin({
  onSuccess :(res) => getUSerProfile(res),
  onError : (error) => console.log(error)
  })


// get user profile

const getUSerProfile = (tokenInfo) =>{
  axios.get(`${import.meta.env.VITE_GOOGLE_API_FOR_GET_USER} ${tokenInfo?.access_token}`,{
    headers : {
      Authorization :`Bearer ${tokenInfo?.access_token}`,
      Accept : 'Appliction/json'
    }
  }).then((resp) =>{
    console.log(resp);
  localStorage.setItem('user',JSON.stringify(resp.data))
  setOpenDialogue(false)
  OnGenerateTrip()  
  })
}



// trip maker
  const OnGenerateTrip = async() =>{

    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialogue(true)
      return ;
    }

    if (formData?.noOfDays > 10) {
      toast('You can make a trip for 10 days or under the 10 days.')
      return
    }

  if (!formData?.location || !formData?.budget || !formData?.people) {
      toast('Please fill all details')
      return

  }    
  setLoading(true)

  const finalPrompt = AI_PROMPT.
  replace('{location}',formData?.location?.label)
  .replace('{TotalDays}',formData?.noOfDays)
  .replace('{People}',formData?.people)
  .replace('{budget}',formData?.budget)

  console.log("fomdata" , formData);
  console.log("prompt" , finalPrompt);

  const result = await chatSession.sendMessage(finalPrompt)
  // console.log("result : -",result?.response.text());
  setLoading(false)
  saveAiTrip(result?.response.text())  

  }


// save into database
const saveAiTrip = async (tripData) => {
  setLoading(true)
  const user = JSON.parse(localStorage.getItem('user'))
  const docID = Date.now().toString()

    await setDoc(doc(db, "AITrips", docID), {
      userSelection : formData,
      tripData : JSON.parse(tripData),
      userEmail : user.email,
      id : docID
    });
    setLoading(false)
}


  
  return (
    <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10 '>
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
        <Button onClick={OnGenerateTrip} disabled={loading }> {loading ? <LiaTruckLoadingSolid className='h-7 w-7 animate-spin' /> : 'Generate Trip '}</Button>
    </div>


    <Dialog open={openDialogue}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <img src="/google.svg" alt="" />
            <h2 className='font-bold text-lg'>Sign in with Google</h2>
            <p>Sign in to a app with Google authentication secure</p>
            <Button className='w-full mt-5 flex gap-2 items-center justify-center'
              onClick={loginUser}> <FcGoogle className=''/> Sign in with Google
            </Button> 
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>


    </div>
  )
}

export default CreateTrip