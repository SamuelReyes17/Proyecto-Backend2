import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../config/index.js";
const router = Router();

router.post("/register", passport.authenticate("create"), (req, res) => {
  const payload = { email: req.email };
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "5m" });
  res.cookie("accesToken", token, { httpOnly: true });
  console.log("entre");
});

router.post("/login", (req, res) => {
  console.log("login");
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ fatal_error: "view console" });
    }
    return res.redirect("/");
  });
});

export default router;
