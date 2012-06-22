/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'jquery.stickyscroll.js', 'test/jquery.stickyscroll.tests.js']
    },
    qunit: {
      files: ['index.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        equals: true,
        same: true,
        test: true,
        asyncTest: true,
        module: true,
        start: true,
        stop: true,
        sinon: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit');

};
