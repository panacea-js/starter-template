export default function () {
  return {
    // Run `npm run build:cms` after changing any cms values.
    cms: {
      head: {
        title: 'Panacea Starter Template Application'
      },
      build: {
        // The path where the CMS should load.
        publicPath: '/cms/'
      },
      vars: {
        colors: {
          primary: '#bada55',
          secondary: '#3a3a46',
          accent: '#bada55',
          error: '#ca372a',
          info: '#2196F3',
          success: '#97ba28',
          warning: '#FFC107'
        }
      }
    },
    plugins: [
      //'@panaceajs/meta-tag'
    ]
  }
}
