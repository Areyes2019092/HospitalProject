"use strict"
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import Personal from "../src/modules/personal/personal.routes.js";
import User from "../src/modules/user/user.routes.js";
import UrgencyLevel from "../src/modules/urgencyLevel/urgencyLevel.routes.js";
import { dbConnection } from "./mongo.js";

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = "/hospital/user";
        this.personalPath = "/hospital/personal";
        this.urgencyPath = "/hospital/urgency";
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
        this.app.use(this.personalPath, Personal);
        this.app.use(this.urgencyPath, UrgencyLevel);
      }

      listen(){
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
          });
      }
}

export default Server;