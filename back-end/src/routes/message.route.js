import express from 'express';
import {protectRoute} from "../middleware/auth.middleware.js";
import {getAllUsers, getMessages, sendMessage} from "../controllers/message.controller.js";

const router = express.Router();

router.get('/get-all-users',protectRoute,getAllUsers);
// router.get('/users/:userId',getUser);// message/users
router.get('/users/getMessages',getMessages);///users/getMessages
router.post('/send/:userId',sendMessage);// message/send/${selectedUser.id}

export default router;