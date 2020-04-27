const fetch = require('node-fetch')

const { HASURA_ENDPOINT } = process.env

/**
 *
 * @param {Object} HasuraRequest
 * @param {string} HasuraRequest.query
 * @param {object} HasuraRequest.input
 * @param {import('../services/actions').SessionVariables} HasuraRequest.session
 * @returns {Object}
 */
module.exports = async function utilsHasuraRequest({ query, input, session }) {
  // if we receive a graphql-tag, grab the underlying string
  if (typeof query === 'object') {
    query = query.loc.source.body
  }

  const fetchResponse = await fetch(HASURA_ENDPOINT, {
    method: 'POST',
    headers: session
      ? {
          'X-Hasura-User-Id': session['x-hasura-user-id'],
          'X-Hasura-Role': session['x-hasura-role'],
        }
      : null,
    body: JSON.stringify({ query, variables: input }),
  })

  const { data, errors } = await fetchResponse.json()

  if (errors && errors.length === 1) throw errors[0]
  if (errors && errors.length > 1) throw JSON.stringify(errors)

  return data
}
