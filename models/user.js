import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email :{
    type: String,
    require:true,
    max:50,


  },
  password :{
    type: String,
    require:true,
    min: 6,
    max:50,
    unique: true

  }



  



} , {
  timestamps : true
})



const User = mongoose.model('User' , userSchema)
export default User;
