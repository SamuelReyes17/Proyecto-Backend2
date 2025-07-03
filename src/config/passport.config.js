import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/encryption.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import env from "./index.js";

/*const initializePassport = () => {
  passport.use(
    "register",
    new LocalStragety(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age, avatar } = req.body;
        try {
          let userFound = await userModel.findOne({ email });

          if (userFound) {
            console.error("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            avatar,
          };

          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};
*/
function initializePassport(passport) {
  const options = {
    secretOrKey: env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  };
  passport.use(
    "getRegister",
    new JwtStrategy(options, async (payload, done) => {
      const email = payload.email;
      const userFound = await userModel.findOne({ email: email });
      if (userFound) {
        return done(null, payload.email);
      } else {
        return done(null, false, "User not found");
      }
    })
  );
  passport.use(
    "create",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        console.log("entre");
        const { first_name, last_name, age, avatar } = req.body;
        try {
          let userFound = await userModel.findOne({ email });

          if (userFound) {
            console.error("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            avatar,
          };

          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["acces_token"];
  }
  return token;
}
export default initializePassport;
