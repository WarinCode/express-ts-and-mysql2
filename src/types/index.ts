import { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
    readonly id: number;
    readonly date: Date;
    readonly author_id: string;
    readonly title: string;
    readonly description: string;
    readonly content: string;
}

export interface QueryString {
    limit: string;
}

export interface Params {
    id: string;
}

export interface PatchParams extends Post{}
export interface ReqBody extends Post{}
export interface ResBody extends ReqBody{}
export type Posts = Post[];