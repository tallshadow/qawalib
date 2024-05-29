import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
// import { Note } from "../model/Note";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB || '';
  private POSTGRES_USER = process.env.POSTGRES_USER || '';
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
  private POSTGRES_HOST = process.env.POSTGRES_HOST || '';
  private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432', 10);

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      // models:[Note]
      dialectOptions: {
        ssl: {
          require: true, // This will ensure SSL is used
          rejectUnauthorized: false // If you are using self-signed certificates, this line may be necessary
        }
      }
    });
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully."
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err);
      });
  }
}

export default Database;
