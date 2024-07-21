import {
  createConnection,
  Connection,
  ConnectionOptions,
} from "mysql2/promise";
import { configDotenv } from "dotenv";

configDotenv();
const { DB_NAME, DB_PORT, USER, PASSWORD }: NodeJS.ProcessEnv = process.env;
const config: ConnectionOptions = {
  host: "localhost",
  database: DB_NAME,
  port: parseInt(<string>DB_PORT),
  user: USER,
  password: PASSWORD,
  rowsAsArray: false,
  multipleStatements: true,
};

const connection: Connection = await createConnection(config);
export default connection;
