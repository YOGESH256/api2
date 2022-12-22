import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import { allTrips , getUserTrips , getTripById , createTrip , deleteUserTrip , updateUserTrip  , searchTrip , customizeInt , saveInt} from '../controllers/tripController.js'





router
  .route('/')
  .get(allTrips);


router.route('/search').post(auth , searchTrip);

router.route('/custom/:id').post(auth , customizeInt);
router.route('/saveInt').post(auth , saveInt);

//
router
  .route('/getUserTrips')
  .get(auth , getUserTrips)
  .post(auth , createTrip);

//
// router
// .route('/review/:id')
// .delete(auth ,deleteReview)

router
  .route('/usertrips/:id')
  .get(getTripById)
  .delete(auth, deleteUserTrip)
  .put(auth, updateUserTrip)










export default router;
