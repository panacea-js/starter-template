export default function() {
  return {
    // Run `npm run build:cms` after changing any cms values.
    cms: {
      head: {
        title: 'Panacea CMS'
      },
      build: {
        // The path where the CMS should load.
        publicPath: '/cms'
      }
    },
    plugins: [
      '@panaceajs/meta-tag'
    ]
  }
}
