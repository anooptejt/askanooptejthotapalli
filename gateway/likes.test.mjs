import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createLikeStore } from './likes.mjs'

test('likes are per article and browser, idempotent, and can be removed', () => {
  const store = createLikeStore(':memory:')
  try {
    assert.deepEqual(store.get('career/first', 'visitor-a'), { count: 0, liked: false })
    assert.deepEqual(store.set('career/first', 'visitor-a', true), { count: 1, liked: true })
    assert.deepEqual(store.set('career/first', 'visitor-a', true), { count: 1, liked: true })
    assert.deepEqual(store.get('career/first', 'visitor-b'), { count: 1, liked: false })
    assert.deepEqual(store.set('career/first', 'visitor-b', true), { count: 2, liked: true })
    assert.deepEqual(store.get('career/second', 'visitor-a'), { count: 0, liked: false })
    assert.deepEqual(store.set('career/first', 'visitor-a', false), { count: 1, liked: false })
    assert.deepEqual(store.set('career/first', 'visitor-a', false), { count: 1, liked: false })
  } finally { store.close() }
})
