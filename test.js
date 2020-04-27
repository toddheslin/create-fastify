const { test } = require('tap')
const { join, basename } = require('path')
const { mkdtempSync, readdirSync } = require('fs')
const { tmpdir } = require('os')
const { spawnSync } = require('child_process')

test('generates a fastify project in the current folder', async ({ same, is }) => {
  const dir = mkdtempSync(join(tmpdir(), 'create-fastify-test'))
  spawnSync('node', [join(__dirname, 'cmd.js')], { cwd: dir })
  same(readdirSync(dir), [
    '.dockerignore',
    '.env',
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore',
    '.vscode',
    'Dockerfile',
    'Taskfile.yml',
    'apollo.config.js',
    'app.js',
    'cloudbuild.yaml',
    'lib',
    'package.json',
    'plugins',
    'server.js',
    'services',
    'test',
    'util',
  ])
  const { name } = require(join(dir, 'package.json'))
  is(name, `@heslin/${basename(dir)}`)
})
