import prisma from "../services/prisma";
interface IPizza {
  name?: string;
  price?: number;
  ingredients?: string;
}

class PizzaRepository {
  async pizzaExists(data: any): Promise<boolean> {
    try {
      const pizza = await prisma.pizza.findMany({
        where: {
          ...data,
        },
      });
      return pizza.length > 0;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to check if pizza exists");
    }
  }
  async getAll(): Promise<[] | IPizza[] | any> {
    try {
      const pizzas = await prisma.pizza.findMany();
      if (pizzas) return pizzas;
      throw new Error("No pizzas found");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get pizzas");
    }
  }

  async createPizza(name: string, price: number, ingredients: string) {
    try {
      const pizzaExists = await this.pizzaExists({ name });
      if (pizzaExists) {
        throw new Error("Pizza already exists");
      }
      const pizza = await prisma.pizza.create({
        data: {
          name,
          price,
          ingredients,
        },
      });
      return pizza;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create pizza");
    }
  }

  async deletePizza(id: number) {
    try {
      if (!id) throw new Error("Invalid pizza id");
      await prisma.pizza.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete pizza");
    }
  }

  async updatePizza(id: number, data: IPizza) {
    try {
      const pizzaExists = await this.pizzaExists({ id });
      if (pizzaExists) {
        const pizza = await prisma.pizza.update({
          where: {
            id,
          },
          data,
        });
        return pizza;
      } else {
        throw new Error("Pizza not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update pizza");
    }
  }

  async getPizza(id: number) {
    try {
      if (!id) throw new Error("Invalid pizza id");
      const pizza = await prisma.pizza.findUnique({
        where: {
          id,
        },
      });
      return pizza;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get pizza");
    }
  }
}

export default new PizzaRepository();
