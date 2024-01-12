import express from "express";
import morgan from "morgan";
import pizzaRoutes from "./Pizza/Pizza.routes";
import orderRoutes from "./Orders/OrdersRouter";

class Application {
  app: express.Application;
  constructor() {
    this.app = express();
    this.start();
  }

  setExpress() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  setRoutes() {
    // this.app.use("/api");
    this.app.use("/api", pizzaRoutes);
    this.app.use("/api", orderRoutes);
  }

  start() {
    this.setExpress();
    this.setRoutes();
    this.app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  }
}

new Application();
