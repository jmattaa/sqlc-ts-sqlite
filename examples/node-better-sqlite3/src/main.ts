import Database from "better-sqlite3";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  listAuthors,
  updateAuthor,
} from "./db/query_sql";

interface Author {
  id: string;
  name: string;
  bio: string | null;
}

async function main() {
  const ddl = await readFile(join(__dirname, "../../authors/sqlite/schema.sql"), { encoding: 'utf-8' });
  const database = new Database(":memory:");

  // Create tables
  database.exec(ddl);

  // Create an author
  await createAuthor(database, {
    name: "Seal",
    bio: "Kissed from a rose",
    someTing: 69,
  });

  // List the authors
  const authors = await listAuthors(database);
  console.log(authors);

  // Get that author
  const seal = await getAuthor(database, { id: authors[0].id });
  if (seal === null) {
    throw new Error("seal not found");
  }
  console.log(seal);

  // Update the author
  await updateAuthor(database, {
    name: "Nah it's me",
    bio: "Kissed from a rose",
    id: seal.id,
  });
  const authors2 = await listAuthors(database);
  console.log(authors2);

  // Delete the author
  await deleteAuthor(database, { id: seal.id });
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
