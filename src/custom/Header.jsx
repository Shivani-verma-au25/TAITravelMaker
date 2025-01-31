import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'


function Header() {
  const users = JSON.parse(localStorage.getItem('user'))
  const [openDialogue , setOpenDialogue] = useState(false)


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
  toast("Generation plans for you...")
  localStorage.setItem('user',JSON.stringify(resp.data))
  setOpenDialogue(false)
  // OnGenerateTrip()  
  window.location.reload()
  })
}


  // logout
  const userLogout = () =>{
    googleLogout()
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() =>{
    console.log("user",users);
    
  },[]) 
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src="/logo.svg" alt="" />
        <div>
            {
              users 
              ? 
              <div className='flex justify-center items-center gap-5'>
                 <a href="/create-trip">
                  <Button variant='outline' className='rounded-full' >+ Add create trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button variant='outline' className='rounded-full' >My Trip
                  </Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <img src={users?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 onClick={userLogout}>Log out</h2>
                  </PopoverContent>
                </Popover>

              </div> 
              : 
              <Button onClick={()=>setOpenDialogue(true)}>Sign in </Button>
            }
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

export default Header