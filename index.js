import panacea from '@panaceajs/core'

// See documentation for full list of options.
const options = {
  main: { deferListen: true }
}

panacea(options).then(app => {

  // Add other express middleware here if required.

  // Start the express app listening on port 3000.
  app.listen(3000) && console.log(`Server listening on port 3000`)

}).catch(error => console.log(`An error occurred: ${error}`))
