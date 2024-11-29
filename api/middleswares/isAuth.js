const { verify } = require("jsonwebtoken");

async function isAuth(req, res, next) {
  try {
    const jsonBody = req.body;
    const authHeader = req.headers.authorization;
    const [bearer, jwtToken] = authHeader.split(" ");

    if (bearer !== "Bearer") {
      return res.status(403).json({ message: "Invalid header" });
    }

    // validate token
    const decoded = verify(jwtToken, process.env.JWT_SECRETE);

    if (!decoded) {
      return res.status(403).json({ message: "invalid token" });
    }

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: err });
  }
}

module.exports = isAuth;
