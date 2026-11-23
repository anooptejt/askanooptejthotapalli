import { createHmac } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'

// Only hashes are persisted; bucket records expire at the end of their window.
export function createRateLimitStore(path, key) {
  if (!key || key.length < 32) throw Error('Rate-limit key is required')
  const db = new DatabaseSync(path)
  db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=3000; CREATE TABLE IF NOT EXISTS rate_limits (id TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)')
  const clear = db.prepare('DELETE FROM rate_limits WHERE expires <= ?')
  const get = db.prepare('SELECT count FROM rate_limits WHERE id = ?')
  const total = db.prepare('SELECT COUNT(*) AS count FROM rate_limits')
  const insert = db.prepare('INSERT INTO rate_limits (id, count, expires) VALUES (?, 1, ?)')
  const increment = db.prepare('UPDATE rate_limits SET count = count + 1 WHERE id = ?')
  return {
    allow(keyForBucket, max, window, now) {
      const id = createHmac('sha256', key).update(keyForBucket).digest('hex')
      db.exec('BEGIN IMMEDIATE')
      try {
        clear.run(now)
        const item = get.get(id)
        let allowed
        if (!item) {
          allowed = total.get().count < 10_000
          if (allowed) insert.run(id, now + window)
        } else {
          allowed = item.count < max
          if (allowed) increment.run(id)
        }
        db.exec('COMMIT')
        return allowed
      } catch (error) { db.exec('ROLLBACK'); throw error }
    },
    close: () => db.close(),
  }
}
