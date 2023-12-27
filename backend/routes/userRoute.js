import express from 'express'
const router=express.Router()
import userAuthCheck from '../middleware/authMiddleware.js'
import { authUser,registerUser,getUserProfile,updateUserProfile } from '../controllers/userController.js'
import { upload } from '../middleware/multer.js'

router.post('/register',registerUser)
router.post('/auth',authUser)
router.route('/profile').get(userAuthCheck,getUserProfile).put(userAuthCheck,upload.single('image'),updateUserProfile)




export default router