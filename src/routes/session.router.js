import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../config/index.js";
import { createHash } from "../utils/encryption.js";
import userModel from "../models/user.model.js";
const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, avatar } = req.body;
  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    avatar,
  };
  const user = await userModel.create(newUser);
  const payload = { email: req.email };
  const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "5m" });
  res.cookie("access_token", token, { httpOnly: true });
  console.log("entre");
  res.json(
    { message: `El usuario se registro ${user.email} correctamente ` },
    token
  );
});

router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("login");
  }
);

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
