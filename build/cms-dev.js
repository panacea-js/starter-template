import cmsBuild from '@panaceajs/cms/build/build'
import cmsBuildCleanup from '@panaceajs/cms/build/build-cleanup'
import path from 'path'
import chokidar from 'chokidar'
import _ from 'lodash'

/**
 * Build Panacea CMS with live reload.
 */
export default (function () {
  const panaceaConfigFile = path.resolve('./panacea.js')
  const nuxtConfigFile = require.resolve('@panaceajs/cms/nuxt.config')
  const panaceaCmsDir = `${process.cwd()}/cms`

  const startDev = (oldNuxt) => {
    // Get build objects.
    const { builder, config, nuxt } = cmsBuild({
      dev: true
    })

    const port = parseInt(process.env.APP_SERVE_PORT) + 1
    const host = process.env.APP_SERVE_HOST

    return Promise.resolve()
      .then(() => builder.build()) // 1- Start build
      .then(() => oldNuxt ? oldNuxt.close() : Promise.resolve()) // 2- Close old nuxt after successful build
      .then(() => nuxt.listen(port, host)) // 3- Start listening
      .then(() => nuxt) // 4- Pass new nuxt to watch chain
  }

  // Start dev
  let dev = startDev()


  // Start watching for panacea.js and nuxt.config.js changes
  chokidar
    .watch([panaceaConfigFile, nuxtConfigFile, panaceaCmsDir], {
      ignoreInitial: true,
      ignored: /(^|[\/\\])\../,
    })
    .on('all', _.debounce((event, file) => {
      console.log("CALLED")
      console.log(`${file} changed`)
      console.log('Rebuilding the app...')
      dev = dev.then(startDev)
    }), 2500)

})()
