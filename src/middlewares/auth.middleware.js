const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || "soft_jobs_secret";

const getTokenFromHeader = (authorization = "") => {
  const [type, token] = authorization.split(" ");
  return type && type.toLowerCase() === "bearer" ? token : authorization;
};

const validateToken = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = getTokenFromHeader(authorization);

  try {
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalido" });
  }
};

module.exports = {
  getJwtSecret,
  validateToken
};
