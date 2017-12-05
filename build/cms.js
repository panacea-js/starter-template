import cmsBuild from '@panaceajs/cms/build/build'
import { pathExistsSync } from 'fs-extra'
import path from 'path'

/**
 * Build Panacea CMS once-only and exit.
 */
export default (function () {
  const panaceaConfigFile = path.resolve('./panacea.js')

  if (!pathExistsSync(panaceaConfigFile)) {
    throw new Error('panacea.js could not be found')
  }

  // Get Panacea CMS configuration options.
  const panaceaConfig = require(panaceaConfigFile).default()
  const cmsGenerateOptions = panaceaConfig.cms

  cmsGenerateOptions.dev = false

  // Get build objects.
  const { builder, config } = cmsBuild(cmsGenerateOptions)

  // Execute build.
  console.log(`Building Panacea CMS at path ${config.build.publicPath} ...`)
  builder.build()
})()