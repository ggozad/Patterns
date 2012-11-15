module.exports = {
  options : {
    baseUrl: 'src',
    insertRequire: ["main"],
    mainConfigFile: "src/main.js",
    name: 'main',
    optimize:'none'
  },
  build : {
    options : {
      out : 'bundles/patterns.js'
    }
  },
  standalone : {
    options : {
      name : '../lib/almond',
      include : 'main',
      wrap : true,
      out : 'bundles/patterns-standalone.js',
      almond: true
    }
  }
}