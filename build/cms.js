import cmsBuild from '@panaceajs/cms/build/build'
import cmsBuildCleanup from '@panaceajs/cms/build/build-cleanup'

/**
 * Build Panacea CMS once-only and exit.
 */
export default (async function () {
  await cmsBuildCleanup()
  // Get build objects.
  const { builder, config } = await cmsBuild({dev: false})

  // Execute build.
  console.log(`Building Panacea CMS at path ${config.build.publicPath} ...`)
  builder.build()
})()
