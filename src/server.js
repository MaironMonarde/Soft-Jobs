const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Soft Jobs escuchando en http://localhost:${PORT}`);
});
