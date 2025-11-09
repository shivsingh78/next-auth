import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
const authOptions:NextAuthOptions = {
     providers:[
          CredentialsProvider({
               name:"Credentials",
               credentials:{
                    email:{label:'Email',type:'text'},
                    password:{label:'password',type:'password'}
               },
              async authorize(credentials,req){
                    let email = credentials?.email
                    let password = credentials?.password

                    if(!email || !password){
                         throw new Error("email or password is not found")
                    }
                    await connectDb()
                    let user = await User.findOne({email})
                    if(!user){
                         throw new Error("user not found")
                    }
                  let isMatch=  await bcrypt.compare(password,user.password)

                  if(!isMatch){
                    throw new Error("password is incorrect")
                  }
                  return {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    image:user.image
                  }


               }
          })

     ],
     callbacks:{
          async jwt({token,user}){
               if(user){
                 token.id=user.id
                 token.name=user.name
                 token.email=user.email
                 token.image=user.image


               }
               return token
             
          },
          session({session,token}){
               if(session.user){
                    session.user.id=token.id as string

                    session.user.name = token.name
                    session.user.email = token.email
                    session.user.image = token.image as string
               }
               return session
          }

     },session:{
          strategy:'jwt',
          maxAge:30*24*60*60*1000

     },
     pages:{
          signIn:'/login',
          error:'/login'

     },
     secret: process.env.NEXT_AUTH_SECRET
}
export default authOptions