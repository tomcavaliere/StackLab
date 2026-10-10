import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import schema from './schema.sql?raw';

const DB_PATH = 'data/stacklab.db';

let db: Database.Database | undefined;

/** Ouvre la base au premier appel ; la crée avec schema.sql si le fichier n'existe pas. */
export function getDb() {
  if (db) return db;
  const isNew = !existsSync(DB_PATH);
  mkdirSync('data', { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');
  if (isNew) db.exec(schema);
  return db;
}
