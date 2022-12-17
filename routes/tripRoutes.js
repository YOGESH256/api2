import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {getTrip , getTripById , createTrip , deleteTrip , updateTrip , createReview , deleteReview , allTheReviews , searchTrip , customizeInt} from '../controllers/tripController.js'




router.route('/').get(getTrip).post(auth , createTrip);


router.route('/search').post(auth , searchTrip);

router.route('/custom/:id').post(auth , customizeInt);


router
  .route('/review')
  .get(allTheReviews)
  .post(auth ,createReview)

router
.route('/review/:id')
.delete(auth ,deleteReview)

router
  .route('/:id')
  .get(getTripById)
  .delete(auth, deleteTrip)
  .put(auth, updateTrip)










export default router;
