const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/usuarios.model");
const { validateToken } = require("../middlewares/auth.middleware");
const { requireFields } = require("../middlewares/credentials.middleware");

const router = Router();

router.post(
  "/usuarios",
  requireFields("email", "password", "rol", "lenguage"),
  async (req, res, next) => {
    try {
      const { email, password, rol, lenguage } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await createUser({
        email,
        password: encryptedPassword,
        rol,
        lenguage
      });

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/usuarios", validateToken, async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
