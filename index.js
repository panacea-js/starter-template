import panacea from '@panaceajs/core'
import { panaceaCMSmiddleware } from '@panaceajs/cms'

// See documentation for full list of options.
panacea().then(config => {
  const { app, options } = config
  panaceaCMSmiddleware(app)
  app.listen(`${options.main.port}`)
  console.log(`Server started. Listening on port ${options.main.port}`)
})
