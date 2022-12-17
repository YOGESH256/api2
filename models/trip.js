import mongoose from "mongoose"

const  tripSchema = mongoose.Schema({

  trip_name : {
    type:String,
    required : true,
  },

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


const Trip = mongoose.model('Trip' , tripSchema)
tripSchema.index( {'$**': 'text'} );
export default Trip
