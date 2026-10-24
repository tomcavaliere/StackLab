import { createClient, type Client } from '@libsql/client';
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from 'astro:env/server';
import { mkdirSync } from 'node:fs';
import schema from './schema.sql?raw';

let db: Promise<Client> | undefined;

/**
 * Ouvre la base au premier appel et applique schema.sql (CREATE TABLE IF NOT EXISTS : crée les tables manquantes).
 * Turso si TURSO_DATABASE_URL est défini, sinon le fichier local data/stackpolitique.db.
 * Pas de PRAGMA foreign_keys : en HTTP chaque requête est indépendante, et l'app ne supprime jamais de ligne.
 */
export function getDb() {
  db ??= (async () => {
    if (TURSO_DATABASE_URL.startsWith('file:')) mkdirSync('data', { recursive: true });
    const client = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });
    await client.executeMultiple(schema);
    return client;
  })();
  return db;
}
