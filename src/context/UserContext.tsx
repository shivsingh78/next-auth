'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'

type userContextType={
     user:userType |null | undefined,
     setUser:(user:userType)=>void

}
type userType={
     name:string,
     image?:string,
     email:string,
     id:string
}

export const userDataContext=React.createContext<userContextType |undefined>(undefined)

function UserContext({children}:{children:ReactNode}) {
     const [user,setUser]=useState<userType |null>()
     const session = useSession()

     const data={
          user,setUser
     }



     useEffect(()=>{
          async function getUser(){
               try {
                    const result = await axios.get("/api/user")
                    setUser(result.data)

                    
               } catch (error) {
                    
               }
          }
          getUser()
     },[session])
   
  return (
    <userDataContext.Provider value={data}>
{children}
    </userDataContext.Provider>
  )
}

export default UserContext