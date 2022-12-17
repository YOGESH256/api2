import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

const ConnectDB = async () => {
  try {
    
    const  conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error : ${e.message}`);
    process.exit(1);

  }
}

export default ConnectDB;
