const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando en Vercel",
  });
});

app.get("/api/v1/products", (req, res) => {
  res.json([
    {
      id: "1",
      name: "Producto de prueba",
      price: 100,
    },
  ]);
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
  });
}
