import express from "express";

export function Action(method, path) {
  return (target, name, descriptor) => {
    let routes = target._routes || (target._routes = []);
    routes.push( {method, path, fn: descriptor.value} );
  }
}

export let Get = path => Action('get', path);
export let Post = path => Action('post', path);
export let Put = path => Action('put', path);

export function routes(ctrl) {
  let instance = new ctrl();

  let router = express.Router();
  instance._routes.forEach( r => router[r.method](r.path, r.fn.bind(instance)));
  return router;
}