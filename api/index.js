const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index");

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require("./middlewares/error.handler");

const app = express();

app.use(express.json());
app.use(cors());

routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Exportamos la aplicación para Vercel
module.exports = app;

// Para ejecutar localmente con Node
if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}
