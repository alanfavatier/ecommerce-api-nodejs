const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = 3000;

app.use(express.json());
const whitelist = ["http://localhost:8080", "https://myapp.com"];
const option = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("acceso denegado"));
    }
  },
};
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log("mi port" + port);
});
