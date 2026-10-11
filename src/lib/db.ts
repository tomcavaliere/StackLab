import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import schema from './schema.sql?raw';

const DB_PATH = 'data/stacklab.db';

let db: Database.Database | undefined;

/** Ouvre la base au premier appel et applique schema.sql (CREATE TABLE IF NOT EXISTS : crée les tables manquantes). */
export function getDb() {
  if (db) return db;
  mkdirSync('data', { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');
  db.exec(schema);
  return db;
}
