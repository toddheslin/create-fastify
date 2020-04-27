const fp = require('fastify-plugin')

/**
 * https://github.com/fastify/fastify-jwt
 * https://github.com/fastify/fastify-cookie
 */
module.exports = fp(async function(fastify, opts) {
  fastify.register(require('fastify-cookie'))
  fastify.register(require('fastify-jwt'), {
    secret: 'a_pretty_long_secret_key',
    sign: {
      expiresIn: '15m',
    },
    cookie: {
      cookieName: 'token',
    },
    messages: {
      badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
      noAuthorizationInHeaderMessage: 'Autorization header is missing!',
      authorizationTokenExpiredMessage: 'Authorization token expired',
      // for the below message you can pass a sync function that must return a string as shown or a string
      authorizationTokenInvalid: err => {
        return `Authorization token is invalid: ${err.message}. Are you only sending a cookie without Authorization header?`
      },
    },
  })

  /**
   The plugin will fallback to looking for the token in the authorization header if either of the following happens (even if the cookie option is enabled):
    1) The request has both the authorization and cookie header
    2) Cookie is empty, authorization header is present

    Note that in our implementation we want the REFRESH TOKEN set as a cookie but the JWT to only be sent using the Authorization header.

    Any routes implementing this decorator are ensuring the JWT is active and not expired. If it is, the client will need to use the refresh_token cookie to fetch a new JWT
   */
  fastify.decorate('authenticate', async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
