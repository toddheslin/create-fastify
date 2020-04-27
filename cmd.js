#!/usr/bin/env node
const path = require('path')
const writePackage = require('write-pkg').sync
const generify = require('generify')
require('fastify-cli/generate').cli(['.'])


const source = path.join(__dirname, 'templates')

generify(source, '.', {}, console.error)

writePackage({
  scripts: {
    "start": "node server.js",
    "debug": "NODE_ENV=development PORT=4000 nodemon -r dotenv/config --inspect server.js"
  },
  dependencies: {
    "lib": "file:lib",
    "util": "file:util",
    "node-fetch": "^2.6.0",
    "fastify-cookie": "^3.6.0",
    "fastify-gql": "^3.2.0",
    "fastify-jwt": "^1.3.1",
    "fastify-sensible": "^2.1.1",
    "uuid": "^7.0.3"
  },
  devDependencies: {
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.1",
    "eslint-config-prettier": "^6.7.0",
    "eslint-config-standard": "^14.1.0",
    "eslint-config-toddheslin": "0.0.2",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1",
    "prettier": "1.19.1",
    "nodemon": "^2.0.3",
    "pino-pretty": "^4.0.0",
  }
})
