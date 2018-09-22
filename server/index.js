import express from "express";

import { routes } from "./src/util/ctrl-routs";
import homeCtrl from "./src/controller/HomeController";


//all the requests will be handled by routes middleware
const app = express();
app.use("/", routes(homeCtrl));

let port = 3001;
app.listen(port, () => {
  console.log(" server is started and listen on port [" + port + "]");
});