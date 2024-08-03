import { Request, Response, NextFunction } from "express";
import { Connection, ResultSetHeader } from "mysql2/promise";
import {
  Posts,
  Params,
  QueryString,
  ResBody,
  ReqBody,
  PatchParams,
} from "../types";

export default class PostController<T extends Connection, D extends Posts, A extends ResultSetHeader> {
  private sql: string = "";
  private rows: D | A | null = null;
  public constructor(
    private readonly connection: T,
    private readonly port: number
  ) {}

  public sendHelloWorldMessage = (
    { query: { limit, search } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): void => {
    if (limit !== undefined || search !== undefined) return next();
    res.send("Hello World.");
  };

  public getData = async (
    { query: { limit, search } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (limit !== undefined || search !== undefined) return next();
    try {
      this.sql = "SELECT id, title, description, date FROM post;";
      [this.rows] = await this.connection.query<D>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getDataById = async (
    {
      params: { id },
      query: { limit, search },
    }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (limit !== undefined || search !== undefined) return next();
    try {
      this.sql = `SELECT id, title, description, date FROM post WHERE id = ${id};`;
      [this.rows] = await this.connection.query<D>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getAllData = async (
    { query: { limit, search } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (limit !== undefined || search !== undefined) return next();
    try {
      this.sql = "SELECT * FROM post;";
      [this.rows] = await this.connection.query<D>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getLimitData = async (
    { query: { limit, search } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (search !== undefined) return next();
    try {
      this.sql = `SELECT id, title, description, date FROM post LIMIT ${limit};`;
      [this.rows] = await this.connection.query<D>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public search = async (
    { query: { search } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    search = search as string;
    try {
      this.sql = `SELECT id, title, description, date FROM post WHERE title IN("${search}") OR title LIKE "${search.substring(
        0,
        5
      )}%";`;
      [this.rows] = await this.connection.query<D>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public insert = async (
    { body }: Request<Params, ResBody, ReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const data = { ...body };
    data.id = data.id !== 0 ? data.id : 0;
    const now: Date = new Date();
    const formatDate: string = `${now.getFullYear()}-${
      now.getMonth() + 1 < 9 ? "0" + (now.getMonth() + 1) : now.getMonth()
    }-${now.getDate() < 9 ? "0" + now.getDate() : now.getDate()}`;
    try {
      this.sql = `INSERT INTO post VALUES(${data.id}, '${formatDate}', '${data.author_id}', ${data.title}, ${data.description}, ${data.content});`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(201).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public update = async (
    { body }: Request<Params, ResBody, ReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET date = '${body.date}', author_id = ${body.author_id}, title = '${body.title}', description = '${body.description}', content = '${body.content}' WHERE id = ${body.id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public updateDate = async (
    { params: { id, date } }: Request<PatchParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET date = '${date}' WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public updateAuthorId = async (
    { params: { id, author_id } }: Request<PatchParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET author_id = '${author_id}' WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public updateTitle = async (
    { params: { id, title } }: Request<PatchParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET title = '${title}' WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public updateDescription = async (
    { params: { id, description } }: Request<PatchParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET description = '${description}' WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public updateContent = async (
    { params: { id, content } }: Request<PatchParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `UPDATE post SET content = '${content}' WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public delete = async (
    { params: { id } }: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `DELETE FROM post WHERE id = ${id};`;
      [this.rows] = await this.connection.query<A>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public notFoundPage = (
    { baseUrl }: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res
      .type("html")
      .status(404)
      .send(
        `Not found 404 in path: <b>${baseUrl}</b><br>Go back to <a href="/">homepage</a>`
      );
  };

  public run = (): [port: number, callback: () => void] => {
    return [
      this.port,
      (): void => console.log(`Server is runnig at http://localhost:${this.port}`),
    ];
  };
}
