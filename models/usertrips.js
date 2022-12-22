import mongoose from "mongoose"

const  userTripSchema = mongoose.Schema({

  trip_name : {
    type:String,
    required : true,
  },

tripid : {
  type: mongoose.Schema.Types.ObjectId, ref: 'Trip'
},
userId : {
  type: mongoose.Schema.Types.ObjectId, ref: 'User'
}
,
  Route : {
    type:String,
    required: true,


  },
  itinerary: [{

   name : String,
     done : [{
      date : String,
      point: String,
    }]


  }],

  activities : [{
      point : String,
      duration : String,

    }]




} , {
  timestamps:true
})


const UserTrip = mongoose.model('UserTrip' , userTripSchema)
userTripSchema.index( {'$**': 'text'} );
export default UserTrip
