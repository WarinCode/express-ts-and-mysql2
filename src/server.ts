import express, { Express, json, urlencoded } from "express";
import { Connection, ResultSetHeader } from "mysql2/promise";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import connection from "./db/connection";
import PostController from "./controllers/post.controller";
import { Posts } from "./types";

configDotenv();
const { SERVER_PORT }: NodeJS.ProcessEnv = process.env;
const app: Express = express();
const port: number = parseInt(<string>SERVER_PORT) || 4000;

app.use(json());
app.use(urlencoded({ extended: true, parameterLimit: 20 }));
app.use(morgan("dev"));

const postController: PostController<Connection, Posts, ResultSetHeader> = new PostController(connection, port);
app
  .get("/", postController.sendHelloWorldMessage)
  .get("/api/data", postController.getData)
  .get("/api/data/id/:id", postController.getDataById)
  .get("/api/data/all", postController.getAllData)
  //? /api/data/?limit=:limit
  .get("/api/data/", postController.getLimitData) 
  //? /api/data/?search=:search
  .get("/api/data/", postController.search) 
  .post("/api/insert", postController.insert)
  .put("/api/update", postController.update)
  .patch("/api/update/id/:id/date=:date", postController.updateDate)
  .patch("/api/update/id/:id/author_id=:author_id", postController.updateAuthorId)
  .patch("/api/update/id/:id/title=:title", postController.updateTitle)
  .patch("/api/update/id/:id/description=:description", postController.updateDescription)
  .patch("/api/update/id/:id/content=:content", postController.updateContent)
  .delete("/api/delete/id/:id", postController.delete)
  .use("*", postController.pageNotFound)
  .listen(...postController.run());
