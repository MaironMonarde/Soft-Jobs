const handleNotFound = (req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
};

const handleErrors = (error, _req, res, _next) => {
  console.error(error);

  if (error.code === "23505") {
    return res.status(409).json({ error: "El email ya se encuentra registrado" });
  }

  if (error.code === "23502") {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Error interno del servidor";

  return res.status(statusCode).json({ error: message });
};

module.exports = {
  handleErrors,
  handleNotFound
};
