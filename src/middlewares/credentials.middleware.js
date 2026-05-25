const requireFields = (...fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Faltan campos obligatorios: ${missingFields.join(", ")}`
      });
    }

    next();
  };
};

module.exports = {
  requireFields
};
