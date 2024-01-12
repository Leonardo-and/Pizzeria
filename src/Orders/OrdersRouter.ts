import { Router } from "express";
const routes = Router();

routes.get("/orders", (req, res) => {
  return res.send("Hello world from orders!");
});

export default routes;
