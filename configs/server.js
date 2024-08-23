"use strict"
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import User from "../src/modules/user/user.routes.js";
import { dbConnection } from "./mongo.js";

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = "/hospital/user";
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(
          express.urlencoded({
            extended: false,
          })
        );
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan("dev"));
      }

      routes(){
        this.app.use(this.userPath, User);
      }

      listen(){
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
          });
      }
}

export default Server;