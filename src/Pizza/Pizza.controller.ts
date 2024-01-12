import { Request, Response } from "express";
import PizzaRepository from "./Pizza.repository";
import { object, string, number } from "yup";
import { Sucess, apiError } from "../helpers/response";

interface IPizza {
  name: string;
  price: number;
  ingredients: string;
}

const pizzaSchema = object({
  name: string().required(),
  price: number().required().positive(),
  ingredients: string().required(),
});

class PizzaController {
  async getPizzas(_: Request, res: Response) {
    try {
      const pizzas = await PizzaRepository.getAll();
      const parsedPizzas = pizzas.map((pizza: IPizza) => {
        const ingredients = JSON.parse(pizza.ingredients.replace(/'/g, '"'));
        return { ...pizza, ingredients };
      });
      return res
        .status(200)
        .json(Sucess("Sucess", parsedPizzas, res.statusCode));
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json(
          apiError(`Internal Server Error: ${error.message}`, res.statusCode)
        );
    }
  }
  async createPizza(req: Request, res: Response) {
    try {
      const { name, price, ingredients } = await pizzaSchema.validate(req.body);
      const pizza = await PizzaRepository.createPizza(name, price, ingredients);
      return res
        .status(201)
        .json(Sucess("Sucessfully created", pizza, res.statusCode));
    } catch (error: any) {
      console.log(error);
      return res.status(400).json(apiError(error.message, res.statusCode));
    }
  }
  async updatePizza(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res
          .status(400)
          .json(apiError("Invalid pizza id", res.statusCode));
      const { id } = req.params;
      const data = req.body;
      const pizza = await PizzaRepository.updatePizza(parseInt(id), data);
      return res
        .json(Sucess("Sucessfully updated", pizza, res.statusCode))
        .status(200);
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json(
          apiError(`Internal Server Error: ${error.message}`, res.statusCode)
        );
    }
  }
  async deletePizza(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res
          .status(400)
          .json(apiError("Invalid pizza id", res.statusCode));

      const { id } = req.params;
      const pizza = await PizzaRepository.deletePizza(parseInt(id));
      return res
        .status(200)
        .json(Sucess("Sucessfully deleted", pizza, res.statusCode));
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(apiError(error.message, res.statusCode));
    }
  }

  async getPizza(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .json(apiError("Invalid pizza id", res.statusCode));
      const pizza = await PizzaRepository.getPizza(parseInt(id));
      if (!pizza) {
        return res
          .status(404)
          .json(apiError("Pizza not found", res.statusCode));
      }
      // if (pizza && pizza.ingredients) {
      //   const parsedPizza = JSON.parse(pizza.ingredients.replace(/'/g, '"'));
      // }
      return res.status(200).json(Sucess("Sucess", pizza, res.statusCode));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(apiError("Internal Server Error", res.statusCode));
    }
  }
}
export default new PizzaController();
