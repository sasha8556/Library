const express = require("express");
const app = express();
require('dotenv').config();
const routes = require("./routes/index");

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


module.exports=app;
