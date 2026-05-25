const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../models/usuarios.model");
const { requireFields } = require("../middlewares/credentials.middleware");
const { getJwtSecret } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/login", requireFields("email", "password"), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const token = jwt.sign(
      { email: user.email },
      getJwtSecret(),
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
