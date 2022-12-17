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

  },

  usertrips: {

   trips : [{type:mongoose.Schema.Types.ObjectId,
   required:true,
   ref:'Trip'
 }]


  }



} , {
  timestamps : true
})



const User = mongoose.model('User' , userSchema)
export default User;
