import  express from 'express';

import dotenv from 'dotenv'
import ConnectDB from './config/db.js'
import  tripRoutes from './routes/tripRoutes.js'
import  userRoutes from './routes/userRoutes.js'


import redis from "redis";


const client = redis.createClient();

(async() => {

await client.connect().then(console.log("connect"))
})();

dotenv.config()

ConnectDB()

const app = express()

app.use(express.json())




app.use('/api/trip' , tripRoutes)
app.use('/api/users' , userRoutes)







const PORT = process.env.PORT || 5000

app.listen(PORT , () =>{
  console.log(`Server is listening  on ${PORT}` );
})
