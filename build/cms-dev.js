import cmsBuild from '@panaceajs/cms/build/build'
import path from 'path'
import chokidar from 'chokidar'
import _ from 'lodash'
import glob from 'glob'

/**
 * Build Panacea CMS with live reload.
 */
export default (function () {
  const panaceaConfigFile = path.resolve('./panacea.js')
  const panaceaCmsDirs = glob.sync(path.resolve(process.cwd(), 'node_modules/@panaceajs/cms') + '/*')
    .filter(dir => path.basename(dir) !== 'node_modules')

  const applicationCmsDir = `${process.cwd()}/cms`

  // Error handler
  const onError = (err, instance) => {
    debug('Error while reloading [nuxt.config.js]', err)
    return Promise.resolve(instance) // Wait for next reload
  }

  const startDev = (oldNuxt) => {
    // Get build objects.
    const { builder, nuxt } = cmsBuild({
      dev: true
    })

    const port = parseInt(process.env.APP_SERVE_PORT) + 1
    const host = process.env.APP_SERVE_HOST

    return Promise.resolve()
      .then(() => builder.build()) // 1- Start build
      .then(() => oldNuxt ? oldNuxt.close() : Promise.resolve()) // 2- Close old nuxt after successful build
      .then(() => nuxt.listen(port, host)) // 3- Start listening
      .then(() => nuxt) // 4- Pass new nuxt to watch chain
      .catch((err) => onError(err, instance))
  }

  // Start dev
  let dev = startDev()

  // Start watching for panacea.js and nuxt.config.js changes
  chokidar
    .watch([panaceaConfigFile, ...panaceaCmsDirs, applicationCmsDir], {
      ignoreInitial: true,
      ignored: /(^|[/\\])\../
    })
    .on('all', _.debounce((event, file) => {
      console.log(`${file} changed`)
      console.log('Rebuilding the app...')
      dev = dev.then(startDev)
    }), 0)
})()
