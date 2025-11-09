import connectDb from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
     try {
          const  {name,email,password}= await request.json()
          await connectDb()
          if(!name || !email || !password){
               return NextResponse.json("All fields required")
          }
          let user = await User.findOne({email})
          if(user){
                return NextResponse.json(
                    {message:"user already exist"},
                    {status:400}
               )
          }
          const hashPassword = await bcrypt.hash(password,10)

          //create user
          user = await User.create({
               name,
               email,
               password:hashPassword

          })
          const instanceUser = user.toObject()
        delete  instanceUser.password

          return NextResponse.json({
               message:"User created sucessfully",
               user:instanceUser
          },
          {status:201},
         
     )
          

          
     } catch (error) {
           console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
          
     }
}