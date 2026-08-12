import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabaseSync(
  "craftflow.db",
);
