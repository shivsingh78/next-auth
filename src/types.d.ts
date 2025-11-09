import { Connection } from "mongoose";

declare global{
     var _mongoose:{
          conn:Connection | null,
          promise:Promise<Connection> | null
     }
}

export {}