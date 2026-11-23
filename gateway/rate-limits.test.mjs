import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { createRateLimitStore } from './rate-limits.mjs'

test('rate limits persist across restarts and expire without storing raw identifiers', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ask-rate-'))
  const path = join(dir, 'limits.sqlite')
  const secret = 'x'.repeat(64)
  try {
    let store = createRateLimitStore(path, secret)
    assert.equal(store.allow('send-ip:192.0.2.1', 2, 1000, 100), true)
    assert.equal(store.allow('send-ip:192.0.2.1', 2, 1000, 101), true)
    store.close()
    store = createRateLimitStore(path, secret)
    assert.equal(store.allow('send-ip:192.0.2.1', 2, 1000, 102), false)
    assert.equal(store.allow('send-ip:192.0.2.2', 2, 1000, 102), true)
    const db = new DatabaseSync(path)
    const ids = db.prepare('SELECT id FROM rate_limits').all().map(row => row.id)
    assert.ok(ids.every(id => /^[a-f0-9]{64}$/.test(id)))
    db.close()
    assert.equal(store.allow('send-ip:192.0.2.1', 2, 1000, 1100), true)
    store.close()
  } finally { rmSync(dir, { recursive: true, force: true }) }
})
