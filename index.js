'uses trict'

const fp = require('fastify-plugin')
const massive = require('massive')

module.exports = fp(async function (fastify, opts) {
  let db = await massive(opts.massive)

  if (opts.onLoad) {
    await opts.onLoad(db)
    db = await db.reload()
  }

  fastify.decorate('massive', db)

  fastify.onClose(async () => {
    await db.pgp.end()
  })
}, '^2.0.0')
