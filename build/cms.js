import cmsBuild from '@panaceajs/cms/build/build'

/**
 * Build Panacea CMS once-only and exit.
 */
export default (async function () {
  // Get build objects.
  const { builder, config } = await cmsBuild({dev: false})
  const { chalk } = Panacea.container

  // Execute build.
  console.log(chalk.green(`Building Panacea CMS at path ${config.build.publicPath} ...`))
  builder.build()
})()
