async function authorization(req, res, next) {
  const user = req.userId;
  res.status(200).json({ message: "authorized user", authorized: true });
}

module.exports = {
  authorization,
};
