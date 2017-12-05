import fs from 'fs-extra'
import crypto from 'crypto'

function randomKey (length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length)
}

/**
 * Copies .env.example to .env and set a random APP_KEY.
 */
export default (function () {
  if (fs.pathExistsSync('.env')) {
    console.error('.env file already exists. Delete this file first to regenerate, however...')
    console.error('BEWARE: altering the APP_KEY on existing installation will cause data loss.')
    return
  }

  var key = randomKey(64);

  const envContent = fs.readFileSync('.env.example', 'UTF-8')
    .replace('APP_KEY=', 'APP_KEY=' + key)

  fs.writeFileSync('.env', envContent)

  console.log('Wrote .env file and generated APP_KEY.')

})()