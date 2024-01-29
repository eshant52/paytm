const { Router } = require("express");
const { authorization } = require("../controllers/auth");
const isAuth = require("../middleswares/isAuth");

const authRouter = Router();

authRouter.get("/validate", isAuth, authorization);

module.exports = authRouter;
