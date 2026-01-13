import express from 'express'
import { protect } from '../middleWares/auth.js'
import { authorize } from '../middleWares/authorize.js'

const router = express.Router()



router.get('/dashboard', protect, authorize('admin'), (req, res) => {
    res.json(`Welcome to admin dashboard: ${req.user.name}`)
})



export default router