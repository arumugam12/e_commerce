import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { signIn, logIn, updateUser, deleteUser, getUser, getAllUser } from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.post("/signin", signIn);
userRouter.post("/login", logIn);
userRouter.post("/update_user/:id", authenticate, updateUser);
userRouter.delete("/delete_user/:id", authenticate, deleteUser);
userRouter.get("/get_user/:id", authenticate, getUser);
userRouter.get("/get_all_user", getAllUser);

export default userRouter;