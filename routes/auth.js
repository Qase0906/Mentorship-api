import express from "express"
import { login, register } from "../controllers/auth.js"
import { protect } from "../middleWares/auth.js"
import { createUserSchema } from "../Schemas/userSchema.js"
import { validator } from "../middleWares/validator.js"
const router = express.Router()


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */

router.post('/register',validator(createUserSchema), register)

router.post('/login', login)


// Protected Routes
router.get('/profile', protect, (req, res) => {
    console.log("req.user", req.user)
    res.json(req.user)
})


export default router