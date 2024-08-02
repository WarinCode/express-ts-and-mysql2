import express, { Express, json, urlencoded } from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import connection from "./db/connection";
import ApiEndpoints from "./apis/apiendpoint";
import PostController from "./controllers/post.controller";

configDotenv();
const { SERVER_PORT }: NodeJS.ProcessEnv = process.env;
const app: Express = express();
const port: number = parseInt(<string>SERVER_PORT) || 4000;

app.use(json());
app.use(urlencoded({ extended: true, parameterLimit: 20 }));
app.use(morgan("dev"));

const postController: PostController = new PostController(connection);
app
  .get(ApiEndpoints.RootPath, postController.sendHelloWorldMessage)
  .get(ApiEndpoints.DataPath, postController.getData)
  .get(ApiEndpoints.IDDataPath, postController.getDataById)
  .get(ApiEndpoints.AllDataPath, postController.getAllData)
  .get(ApiEndpoints.LimitDataPath, postController.getLimitData)
  .post(ApiEndpoints.InsertPath, postController.insert)
  .put(ApiEndpoints.UpdatePath, postController.update)
  .patch(ApiEndpoints.UpdateDatePath, postController.updateDate)
  .patch(ApiEndpoints.UpdateAuthorIdPath, postController.updateAuthorId)
  .patch(ApiEndpoints.UpdateTitlePath, postController.updateTitle)
  .patch(ApiEndpoints.UpdateDescriptionPath, postController.updateDescription)
  .patch(ApiEndpoints.UpdateContentPath, postController.updateContent)
  .delete(ApiEndpoints.DeletePath, postController.delete)
  .listen(port, (): void =>
    console.log(`Server is runnig at http://localhost:${port}`)
  );
