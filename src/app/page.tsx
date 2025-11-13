'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'

function Page() {
  const {data} = useSession()
  console.log(data)
  const [loading,setLoading]=useState(false)
  const handleSignOut = async ()=>{
    setLoading(true)
    try {
      await signOut()
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      console.log(error)
      
    }
  }
  
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white px-4'>
      {!data && <div className='text-white text-2xl '> Loading...</div>}
      {data && 
      <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center '>
        {data.user.image && <div className='relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden '>
          <Image src={data.user.image} alt='user profile img' fill/>
          </div>}
          <h1 className='text-2xl font-semibold mb-4 pt-2'>Welcome , {data.user.name}</h1>
          <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors ' onClick={handleSignOut}>Sign Out</button>


        </div>}
          
      

    </div>
  )
}

export default Page