import express from "express";

import {routes} from "./src/util/HttpAnnotation";
import searchCtrl from "./src/controller/SearchController";
import homeCtrl from "./src/controller/HomeController";
import Costants from "./src/config/Costants";


//all the requests will be handled by routes middleware
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Movies services path
app.use(Costants.BASE_PATH, routes(searchCtrl));
app.use(Costants.BASE_PATH, routes(homeCtrl));

//all the requests will be error handled by above method
app.use((err, req, res, next) => res.send(err));


let port = 3001;
app.listen(port, () => {
    console.log(" server is started and listen on port [" + port + "]");
});
