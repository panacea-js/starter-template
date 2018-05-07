export default {
  register: function (hooks) {
    hooks.on('core.cors.whitelist', ({ whitelist, options }) => {
      // Allow access on to origin as set in .env file.
      // This allows production access to the graphql server by graphiql and voyager.
      whitelist.push(`${options.main.protocol}://${options.main.host}:${options.main.port}`)
      // Allow access on to origin as set in .env file, but with port 3001 for cms development.
      whitelist.push(`${options.main.protocol}://${options.main.host}:3001`)

      // Optional - allow access from all hosts.
      //whitelist.push('*')
    })
  }
}
