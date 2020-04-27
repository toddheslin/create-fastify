const isDev = process.env.NODE_ENV === 'development'
const Fastify = require('fastify')

function build () {
  const opts = isDev
    ? {
      pluginTimeout: 1000,
      logger: { level: 'info', prettyPrint: true }
    }
    : {
      trustProxy: true,
      logger: true
    }

  const app = Fastify(opts)

  // register applicaiton as regular plugin
  app.register(require('./app.js'))

  return app
}

async function start () {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 3000

  try {
    const server = build()
    server.listen(port, '0.0.0.0').then((address) => {
      console.log(`Listening on ${address}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = build

if (require.main === module) {
  start()
}
