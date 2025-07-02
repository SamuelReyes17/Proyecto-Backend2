import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://samuel:aDPAq4gNg065aTWs@backend2.frvvtqq.mongodb.net/?retryWrites=true&w=majority&appName=Backend2",
  SECRET_KEY: process.env.SECRET_KEY || "N0S3cr3tKe44orTh1sApp((&",
};
