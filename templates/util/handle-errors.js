module.exports = function catchErrors(handler) {
  return async function wrapped(request, reply) {
    try {
      await handler(request, reply)
    } catch (error) {
      reply.status(error.code || 400).send(error)
    }
  }
}
