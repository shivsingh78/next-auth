import mongoose from "mongoose"

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
     throw new Error("mongodb url is not found.")
}
 
let cached = global._mongoose
if(!cached){
     cached=global._mongoose={conn:null,promise:null}
}
 
const connectDb = async () => {
     if(cached.conn){
          console.log("cache db connected")
          return cached.conn
     }
     if(!cached.promise){
       cached.promise = mongoose.connect(mongodbUrl,{bufferCommands:false}).then((c)=>c.connection)
     }
    try {
     cached.conn = await cached.promise
     console.log("db connected")

     
    } catch (error) {
     throw error
     
    }
    return cached.conn
}

export default connectDb