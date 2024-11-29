const { Router } = require("express");
const userRoute = require("./users");
const accountRouter = require("./account");
const authRouter = require("./auth");


const mainRouter = Router();

mainRouter.use("/user", userRoute);
mainRouter.use('/account', accountRouter);
mainRouter.use('/auth', authRouter);

module.exports = mainRouter;
