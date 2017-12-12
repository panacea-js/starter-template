import panacea from '@panaceajs/core'
import cmsMiddleware from '@panaceajs/cms/expressMiddleware'

panacea().then(config => {
  const { app, options } = config
  cmsMiddleware(app, options)
  app.listen(`${options.main.port}`)
  console.log(`Server started. Listening on port ${options.main.port}`)
})
