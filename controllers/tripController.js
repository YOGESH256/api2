import Trip from '../models/trip.js'
import Review from '../models/reviewBlog.js'



import redis from 'redis'





const getTrip = async(req, res) => {
  try {
    const trip = await Trip.find({});
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

if(io !== null)
{
  console.log("JKKKK");
console.log(io);



var uj = JSON.parse(io);
// console.log(JSON.parse(uj).activities);




console.log(uj.activities);



    uj.activities = [...uj.activities , {
       "point" : "Auckland Scavenger Hunt: Reasons To Love Auckland",
        "duration" : "1 day"

   }];







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



        trip.activities = data;


    // save the record in the cache for subsequent request
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

  const user = User.findById(ui.user._id);
  




} catch (e) {

}



 }





const deleteTrip  =  async(req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
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






const updateTrip  = async(req, res) => {

const {title , body  } = req.body

const trip = await Trip.findById(req.params.id)

if(trip)
{
  trip.title = title,
  trip.body = body
}
else {
  res.status(404)
  res.json("Error : no product of this id")
}

  const updatedTrip = await trip.save()
  res.status(201)
  res.json(updatedTrip);
}




const createReview  = async(req, res) => {
 const {  user : loggedInuser} = req.user;

  try {
    console.log(loggedInuser);

    const review =  new Review({
      userId: loggedInuser._id,
      description :req.body.description,

    })

    const createdReview = await review.save()

    res.status(201).json(createdReview)

  } catch (e) {

res.status(401).json(e.message)
  }


}



const deleteReview  =  async(req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    console.log(review);

    if(review)
    {
      await review.remove()
    res.json({message : 'Review Removed'})
  }
  else {
    res.status(404);
    res.json("Not Found")

  }

  } catch (e) {
    res.status(500).json(e.message)

  }


}

const allTheReviews  =  async(req, res) => {
  try {

console.log("Jo");
    const reviews = await Review.find({}).populate("userId")
    console.log(reviews);

    if(reviews)
    {
    res.status(200).json(reviews)
  }


  } catch (e) {
    console.log(e);


  }


}





export {getTrip , getTripById , deleteTrip , updateTrip , createTrip , createReview , deleteReview , allTheReviews , searchTrip , customizeInt}
