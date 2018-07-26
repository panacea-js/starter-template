export default {
  register: function (hooks) {
    hooks.on('core.cors.whitelist', ({ whitelist, options }) => {
      // Allow access on to origin as set in .env file.
      // This allows production access to the graphql server by graphiql and voyager.
      whitelist.push(`${options.main.protocol}://${options.main.host}:${options.main.port}`)
      // Allow access on to origin as set in .env file, but with port 3001 for cms development.
      whitelist.push(`${options.main.protocol}://${options.main.host}:3001`)

      // Optional - allow access from all hosts.
      // whitelist.push('*')
    })

    hooks.on('core.entities.definitions', entityTypes => {
      // Reference back to this file to improve debugging experience.
      const hookFile = __filename

      // Extend user entity with custom fields.
      // Ensure that the field key (e.g. firstName) is camelCase.
      entityTypes.User.fields.firstName = {
        label: 'First Name',
        type: 'string',
        description: `The user's last name`,
        required: true,
        _meta: { hookFile }
      }

      entityTypes.User.fields.lastName = {
        label: 'Last Name',
        type: 'string',
        description: `The user's first name`,
        required: true,
        _meta: { hookFile }
      }
    })
  }
}
