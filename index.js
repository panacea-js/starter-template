import panacea from '@panaceajs/core'
import cmsMiddleware from '@panaceajs/cms/expressMiddleware'

panacea().then(() => {
  const { app, options } = Panacea.container
  if (!app) {
    console.error('There was an error loading Panacea core')
    return
  }
  cmsMiddleware(app, options)
  app.listen(`${options.main.port}`)
  console.log(`Server started. Listening on port ${options.main.port}`)
}).catch(error => console.error(error))
