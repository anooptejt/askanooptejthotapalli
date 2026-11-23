import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGateway } from './server.mjs'
import { createLikeStore } from './likes.mjs'

test('public gateway likes isolate articles and browsers and reject invalid requests', async () => {
  const store = createLikeStore(':memory:')
  const origin = 'https://anooptejt.github.io'
  const server = createGateway({ apiKey: 'test', signingKey: 'x'.repeat(64), origins: [origin], likeStore: store })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
  const root = `http://127.0.0.1:${server.address().port}`
  const visitor = '12345678-1234-4567-8912-123456789abc'
  const other = '22345678-1234-4567-8912-123456789abc'
  const send = (body, source = origin) => fetch(`${root}/v1/likes`, { method: 'POST', headers: { Origin: source, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  try {
    const body = { article: 'career/test', visitor, liked: true }
    assert.equal((await send(body, 'https://evil.example')).status, 403)
    assert.equal((await send({ ...body, article: '../private' })).status, 400)
    assert.equal((await send({ ...body, visitor: 'invalid' })).status, 400)
    assert.equal((await send({ ...body, liked: 'true' })).status, 400)
    assert.deepEqual(await (await send(body)).json(), { count: 1, liked: true })
    assert.deepEqual(await (await send(body)).json(), { count: 1, liked: true })
    const get = await fetch(`${root}/v1/likes?article=career%2Ftest&visitor=${other}`, { headers: { Origin: origin } })
    assert.deepEqual(await get.json(), { count: 1, liked: false })
    assert.deepEqual(await (await send({ ...body, liked: false })).json(), { count: 0, liked: false })
    assert.equal((await fetch(`${root}/rest/workflows`, { headers: { Origin: origin } })).status, 404)
  } finally {
    await new Promise(resolve => server.close(resolve))
    store.close()
  }
})
