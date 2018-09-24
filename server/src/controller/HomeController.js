import {Action, Get} from "../util/HttpAnnotation";

class HomeController {

    constructor() {

    }

    @Get("/")
    index(req, res) {
        let message = "Service is running healthily...";
        res.json({message});
    }

}

export default HomeController;