module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: [ 'src/*.js' ]
    },
    concat: {
      build: {
        src: [ 'src/*.js' ],
        dest: '_/Q.js'
      }
    },
    uglify: {
      build: {
        src: [ '_/Q.js' ],
        dest: 'dist/Q.min.js'
      }
    },
    watch: {
      js: {
        files: [ 'src/*.js' ],
        tasks: [ 'jshint', 'concat', 'uglify' ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
