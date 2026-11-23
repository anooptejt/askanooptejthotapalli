import { createHash } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'

// Anonymous browser IDs prevent accidental duplicate votes, but do not verify people.
export function createLikeStore(path) {
  const db = new DatabaseSync(path)
  db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=3000; CREATE TABLE IF NOT EXISTS article_likes (article TEXT NOT NULL, visitor_hash TEXT NOT NULL, PRIMARY KEY(article, visitor_hash))')
  const hash = visitor => createHash('sha256').update(visitor).digest('hex')
  const lookup = db.prepare('SELECT COUNT(*) AS count, COALESCE(MAX(visitor_hash = ?), 0) AS liked FROM article_likes WHERE article = ?')
  const add = db.prepare('INSERT OR IGNORE INTO article_likes (article, visitor_hash) VALUES (?, ?)')
  const remove = db.prepare('DELETE FROM article_likes WHERE article = ? AND visitor_hash = ?')
  const get = (article, visitor) => { const row = lookup.get(hash(visitor), article); return { count: Number(row.count), liked: Boolean(row.liked) } }
  return {
    get,
    set(article, visitor, liked) {
      db.exec('BEGIN IMMEDIATE')
      try {
        ;(liked ? add : remove).run(article, hash(visitor))
        const result = get(article, visitor)
        db.exec('COMMIT')
        return result
      } catch (error) { db.exec('ROLLBACK'); throw error }
    },
    close: () => db.close(),
  }
}
