const { Router } = require("express");
const { postSignup, postSignin, putUser, getBulk, getUser } = require("../controllers/users");
const isAuth = require("../middleswares/isAuth");

const userRoute = Router();

userRoute.post("/signup", postSignup);
userRoute.post("/signin", postSignin);

userRoute.put("/", isAuth ,putUser);
userRoute.get("/", isAuth ,getUser);
userRoute.get("/bulk", isAuth, getBulk);

module.exports = userRoute;
