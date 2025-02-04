import express from 'express'
// import { createReview } from '../controllers/reviewController.js'
const router=express.Router()
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

router.post('/',verifyUser,createBooking)
router.get('/:id',verifyUser,getBooking)

router.get('/',verifyAdmin,getAllBooking)


export default router