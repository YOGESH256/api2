import Trip from '../models/trip.js'

import UserTrip from '../models/usertrips.js'


import redis from 'redis'



const allTrips = async(req, res) => {
  try {


    const trip = await Trip.find();

    console.log(trip);

    if(trip)
    {
    res.status(200).json(trip);

    }
  } catch (e) {
      res.status(500).json(e.message)
  }

}






const getUserTrips = async(req, res) => {
  try {

    const loggedInuser = req.user

    console.log(loggedInuser.user._id);


    const trip = await UserTrip.find({userId : loggedInuser.user._id});

    console.log(trip);

    if(trip)
    {
    res.status(200).json(trip);

    }
  } catch (e) {
      res.status(500).json(e.message)
  }

}



//@desc Fetch A Single products
//@route GET /api/products/:id
//@access  Public
const getTripById = async(req, res) => {
  try {
    console.log(",");
    const trip = await Trip.findById(req.params.id)

    if(trip)
    {
    res.status(200).json(trip);
    }
  } catch (e) {

res.status(500).json(e.message)


  }
}


const customizeInt = async(req , res) => {
console.log("JK");
try {

const client = redis.createClient();

(async() => {

await client.connect().then(console.log("connect"))
})();


var ui = req.user

console.log(ui.user._id);

// await client.del(JSON.stringify(ui.user._id));


var io = await client.get(JSON.stringify(ui.user._id));
console.log(io);

console.log(JSON.parse(io)._id);

if(io !== null && JSON.parse(io)._id === req.params.id)
{
  console.log("JKKKK");
console.log(io);



var uj = JSON.parse(io);

console.log(uj);

console.log(io + "kl");
// console.log(JSON.parse(uj).activities);




// console.log(uj.activities);




    uj.activities = [...uj.activities , {
       "point" : "Auckland Scavenger Hunt: Reasons To Love Auckland",
        "duration" : "1 day"

   }];


console.log(uj.activities.length);






   await client.set(JSON.stringify(ui.user._id), JSON.stringify((uj)));

  return res.status(200).json({
    error: false,
    message: "Hi",
    data: uj
  })


}
else {
  const trip = await Trip.findById(req.params.id);

       var data = [...trip.activities , {
            "point" : "Auckland Scavenger Hunt: Reasons To Love Auckland",
             "duration" : "1 day"

        }];

        console.log(data.length);



        trip.activities = data;


    // save the record in the cache for subsequent request

    console.log(trip);
    console.log(ui.user._id);
    await client.set(JSON.stringify(ui.user._id), JSON.stringify(trip)).catch(e => console.log(e));

    // return the result to the client
    return res.status(200).json({
      error: false,
      message: "Hi",
      data: trip
    });

}
}

catch(e)
{
  console.log(e.message);
}




}




 const saveInt = async( req , res) => {

try {


  const client = redis.createClient();

  (async() => {

  await client.connect().then(console.log("connect"))
  })();

const ui = req.user;


  var io = await client.get(JSON.stringify(ui.user._id));

var uj = JSON.parse(io);
console.log(uj);


const usertrip = await UserTrip.find({tripid : req.body.tripId});
console.log(usertrip);

console.log(uj._id , req.body.tripId);
if(usertrip.length === 0 && uj._id === req.body.tripId)
{



const usertrip1 = new UserTrip({
  trip_name: uj.trip_name ,
  itinerary: uj.itinerary ,
  activities: uj.activities ,
  Route: uj.Route,
  tripid: uj._id,
  userId: ui.user._id

})

usertrip1.save()

console.log("saved");

res.json("done")

}
else  if(req.body.tripId === uj._id ){




const yu = await UserTrip.find({tripid : req.body.tripId})
console.log(yu);



console.log(yu[0].activities.length);
console.log(uj.activities.length);
  yu[0].activities = uj.activities;
  console.log(yu[0].activities.length);

  await  yu[0].save().catch(e => console.log(e));





res.json("hi");


}
else {
  res.json("Please customize the itinerary first")
}
console.log(uj.trip_name , uj.itinerary , uj.activities , uj.Route);
console.log(req.user);








} catch (e) {

}



 }





const deleteUserTrip  =  async(req, res) => {
  try {
    const trip = await UserTrip.findById(req.params.id);
    console.log(trip);

    if(trip)
    {
      await trip.remove()
    res.json({message : 'Trip Removed'})
  }
  else {
    res.status(404);
    res.json("Not Found")

  }

  } catch (e) {
    res.status(500).json(e.message)

  }


}


const searchTrip = async ( req  , res) => {

  try {

    console.log(req.body);

    const results =   await Trip.find({$text: {$search: req.body.query}})









    res.status(201).json(results)

  } catch (e) {

res.status(401).json(e.message)
  }
}





const createTrip  = async(req, res) => {

  try {

    console.log(req.body);

    const trip =  new Trip(req.body)

    const createdTrip = await trip.save()

    res.status(201).json(createdTrip)

  } catch (e) {

res.status(401).json(e.message)
  }


}






const updateUserTrip  = async(req, res) => {

const { data  } = req.body

// console.log(data);
var trip = await UserTrip.find({_id: req.params.id});


if(trip)
{
  trip[0].trip_name = data.trip_name;
  trip[0].Route = data.Route;
  trip[0].itinerary = data.itinerary;
  trip[0].activities = data.activities;


  console.log(trip[0]);
const jk =   await trip[0].save();

res.json(jk);

}
else {
  res.status(404)
  res.json("Error : no product of this id")
}




}











export {allTrips , getUserTrips , getTripById , deleteUserTrip , updateUserTrip , createTrip , searchTrip , customizeInt , saveInt}
