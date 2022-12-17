import mongoose from 'mongoose'
import dotenv from 'dotenv'

import trip from './data/trips.js'
import User from './models/user.js'
import Trip from './models/trip.js'

import ConnectDB from './config/db.js'

dotenv.config();

ConnectDB()

const importData  = async () =>{
  try {

    ConnectDB()

    await Trip.deleteMany()






    await Trip.insertMany(trip)

    console.log('Data imported')
    process.exit()


  } catch (e) {
    console.error(e.message);
    process.exit(1)

  }
}


const destroyData = async() => {
  try {

    await Trip.deleteMany()



    console.log('Data Destroyed')
    process.exit()


  } catch (e) {
    console.error(e.message);
    process.exit(1)

  }


}
if(process.argv[2] === "-d")
{
  destroyData()
}
else {
  importData()
}
