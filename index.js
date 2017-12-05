import panacea from '@panaceajs/core'
import cmsMiddleware from '@panaceajs/cms/expressMiddleware'

// See documentation for full list of panacea() options.
const panaceaOptions = {}
panacea(panaceaOptions).then(config => {
  const { app, options } = config
  cmsMiddleware(app, options)
  app.listen(`${options.main.port}`)
  console.log(`Server started. Listening on port ${options.main.port}`)
})
