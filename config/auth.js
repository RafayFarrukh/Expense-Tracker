module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).send({ error: "You need to login first" });
   
  }
  next()
}