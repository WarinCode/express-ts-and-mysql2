import express, { Express, Request, Response, json, urlencoded } from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import { ResultSetHeader } from "mysql2/promise";
import connection from "./db/connection";
import { Post, Params, ReqBody, ResBody, PatchParams } from "./types";

configDotenv();
const { SERVER_PORT }: NodeJS.ProcessEnv = process.env;
const app: Express = express();
const port: number = parseInt(<string>SERVER_PORT) || 4000;
 
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello world.");
});

app.get("/api/data", async (req: Request, res: Response): Promise<void> => {
  try {
    const sql: string = "SELECT id, title, description, date FROM post;";
    const [rows] = await connection.query<Post[]>(sql);
    res.type("json").status(200).json(rows);
  } catch (e: unknown) {
    res.status(400).send(e);
  }
});

app.get(
  "/api/data/id/:id",
  async ({ params: { id } }: Request<Params>, res: Response): Promise<void> => {
    try {
      const sql: string = `SELECT id, title, description, date FROM post WHERE id = ${id};`;
      const [rows] = await connection.query<Post[]>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.get("/api/data/all", async (req: Request, res: Response): Promise<void> => {
  try {
    const sql: string = "SELECT * FROM post;";
    const [rows] = await connection.query<Post[]>(sql);
    res.type("json").status(200).json(rows);
  } catch (e: unknown) {
    res.status(400).send(e);
  }
});

app.get(
  "/api/data/limit/:limit",
  async (
    { params: { limit } }: Request<Params>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `SELECT id, title, description, date FROM post LIMIT ${limit};`;
      const [rows] = await connection.query<Post[]>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.post(
  "/api/insert",
  async (
    { body }: Request<Params, ResBody, ReqBody>,
    res: Response
  ): Promise<void> => {
    const data = { ...body };
    data.id = data.id !== 0 ? data.id : 0;
    const now: Date = new Date();
    const formatDate: string = `${now.getFullYear()}-${
      now.getMonth() + 1 < 9 ? "0" + (now.getMonth() + 1) : now.getMonth()
    }-${now.getDate() < 9 ? "0" + now.getDate() : now.getDate()}`;
    try {
      const sql: string = `INSERT INTO post VALUES(${data.id}, '${formatDate}', '${data.author_id}', ${data.title}, ${data.description}, ${data.content});`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(201).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.put(
  "/api/update",
  async (
    { body }: Request<Params, ResBody, ReqBody>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET date = '${body.date}', author_id = ${body.author_id}, title = '${body.title}', description = '${body.description}', content = '${body.content}' WHERE id = ${body.id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.patch(
  "/api/update/id/:id/date=:date",
  async (
    { params: { id, date } }: Request<PatchParams>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET date = '${date}' WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.patch(
  "/api/update/id/:id/author_id=:author_id",
  async (
    { params: { id, author_id } }: Request<PatchParams>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET author_id = '${author_id}' WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.patch(
  "/api/update/id/:id/title=:title",
  async (
    { params: { id, title } }: Request<PatchParams>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET title = '${title}' WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.patch(
  "/api/update/id/:id/description=:description",
  async (
    { params: { id, description } }: Request<PatchParams>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET description = '${description}' WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.patch(
  "/api/update/id/:id/content=:content",
  async (
    { params: { id, content } }: Request<PatchParams>,
    res: Response
  ): Promise<void> => {
    try {
      const sql: string = `UPDATE post SET content = '${content}' WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.delete(
  "/api/delete/id/:id",
  async ({ params: { id } }: Request<Params>, res: Response): Promise<void> => {
    try {
      const sql: string = `DELETE FROM post WHERE id = ${id};`;
      const [rows] = await connection.query<ResultSetHeader>(sql);
      res.type("json").status(200).json(rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  }
);

app.listen(port, (): void =>
  console.log(`Server is runnig at http://localhost:${port}`)
);