import { Request, Response, NextFunction } from "express";
import { Connection, ResultSetHeader } from "mysql2/promise";
import {
  Post,
  Params,
  QueryString,
  ResBody,
  ReqBody,
  PatchParams,
} from "../types";

export default class PostController {
  private sql: string = "";
  private rows: Post[] | ResultSetHeader = [];
  public constructor(private readonly connection: Connection) {}

  public sendHelloWorldMessage = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.send("Hello World.");
  };

  public getData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = "SELECT id, title, description, date FROM post;";
      [this.rows] = await this.connection.query<Post[]>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getDataById = async (
    { params: { id } }: Request<Params>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `SELECT id, title, description, date FROM post WHERE id = ${id};`;
      [this.rows] = await this.connection.query<Post[]>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getAllData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = "SELECT * FROM post;";
      [this.rows] = await this.connection.query<Post[]>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };

  public getLimitData = async (
    { query: { limit } }: Request<Params, any, any, QueryString>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.sql = `SELECT id, title, description, date FROM post LIMIT ${limit};`;
      [this.rows] = await this.connection.query<Post[]>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
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
      [this.rows] = await this.connection.query<ResultSetHeader>(this.sql);
      res.type("json").status(200).json(this.rows);
    } catch (e: unknown) {
      res.status(400).send(e);
    }
  };
}
