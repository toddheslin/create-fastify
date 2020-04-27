// https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      name: 'hasura',
      url: 'http://localhost:8080/v1/graphql',
    },
    includes: ['./services/**/*.js'],
  },
}
