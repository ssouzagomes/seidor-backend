import fs from "fs";
import path from "path";

const fileName =
  process.env.NODE_ENV === "test" ? "data-test.json" : "data.json";

const databasePath = path.resolve("./src/database", fileName);

const database = JSON.parse(fs.readFileSync(databasePath, "utf8"));

export {
  database,
  databasePath
}