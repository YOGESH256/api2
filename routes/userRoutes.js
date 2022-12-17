import express from 'express'
const router = express.Router()
import {getToken} from '../controllers/userController.js'

router.route('/').post(getToken);






export default router;
