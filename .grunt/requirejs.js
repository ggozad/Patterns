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
            out : 'bundles/patterns-<%= meta.fingerprint %>.js'
        }
    },
    standalone : {
        options : {
            // XXX: do we need this or is it covered by almond:true?
            name : '../lib/almond',
            include : 'main',
            wrap : true,
            out : 'bundles/patterns-standalone-<%= meta.fingerprint %>.js',
            almond: true
        }
    }
}