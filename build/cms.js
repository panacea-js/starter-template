import cmsBuilder from '@panaceajs/cms/build'
import { pathExistsSync } from 'fs-extra'
import { resolve } from 'path'

export default (function () {
  const panaceaConfigFile = resolve('./panacea.js')

  if (!pathExistsSync(panaceaConfigFile)) {
    throw new Error('panacea.js could not be found')
  }

  const panaceaConfig = require(panaceaConfigFile).default()
  const cmsGenerateOptions = panaceaConfig.cms
  cmsBuilder(cmsGenerateOptions)
})()