module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    requirejs : require('./.grunt/requirejs'),
    uglify : {
      build : {
        files : {
          'bundles/patterns.min.js' : ['bundles/patterns.js']
        }
      },
      standalone : {
        files : {
          'bundles/patterns-standalone.min.js' : ['bundles/patterns-standalone.js']
        }
      }
    },
    clean : {
      build : [
        'bundles/patterns.js',
        'bundles/patterns.min.js',
        'bundles/patterns-standalone.js',
        'bundles/patterns-standalone.min.js'
      ]
    }
  });

  grunt.registerTask('check','Run unit tests through PhantomJS',function(){
    var done = this.async();
    runCommand('phantomjs',['lib/phantom-jasmine/lib/run_jasmine_test.coffee','tests/index.html'], done);
  })

  grunt.registerTask('localize-demo-images','Localize Demo Images',function(){
    var done = this.async();
    runCommand('tools/localize-demo-images.sh',[], done);
  })

  grunt.registerTask('doc','Build docs',function(){
    var done = this.async();
    runCommand('sphinx-build',['-b', 'html','docs','build/docs'], done);
  })

  function runCommand(command, args, done) {
    grunt.log.write('Running ' + command + '...');
    grunt.util.spawn({
      cmd: command,
      args: args
    }, function(err, result, code) {
      if (err) grunt.log.error().error(result);
      else     grunt.log.ok().writeln(result);
      done(code);
    });
  }

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'requirejs', 'uglify']);

};

