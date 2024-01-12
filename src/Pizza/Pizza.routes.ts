import { Router } from "express";
const routes = Router();
import PizzaController from "./Pizza.controller";

routes.get("/pizzas", PizzaController.getPizzas);
routes.post("/pizzas", PizzaController.createPizza);
routes.delete("/pizzas/:id", PizzaController.deletePizza);
routes.put("/pizzas/:id", PizzaController.updatePizza);
routes.get("/pizzas/:id", PizzaController.getPizza);

export default routes;
