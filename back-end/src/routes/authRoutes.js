import express from 'express';
import {checkAuth, login, logout, signup, updateProfile} from "../controllers/authController.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
});

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/update-profile',protectRoute, updateProfile)
router.get('/check',protectRoute, checkAuth)
// router.get('/check', checkAuth)

export default router;