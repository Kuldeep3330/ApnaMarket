import express from 'express'

import { registerUser, loginUser } from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser);

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax", // Or 'None' with Secure if cross-site
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });

export default router