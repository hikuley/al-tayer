import { action, get } from "../util/ctrl-routs";
import RequestHandlerService from "../service/RequestHandlerService";

export default class HomeController {

  constructor() {

  }

  @get("/")
  async index(req, res) {
    let message = await  RequestHandlerService.handleHttpRequest(req.method, req.path);
    res.json({ message });
  }


  //
  // @get("/test")
  // test(req, res) {
  //   res.json(
  //     {
  //       name: "Test",
  //       surname: "Test",
  //       test: "Test"
  //     }
  //   );
  // }
  //
  // @action("post", "/foo")
  // foo(req, res) {
  //   res.json("bar");
  // }

}