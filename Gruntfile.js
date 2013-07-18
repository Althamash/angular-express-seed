module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'public/js/sample.js'],
      options: {
        // options here to override JSHint defaults
        // globals: {
        //   jQuery: true,
        //   console: true,
        //   module: true,
        //   document: true
        // }
      }
    },
    compass:{
      'public':{
        options:{
          sassDir: 'public/sass',
          cssDir: 'public/css'
        }
      },
    },
    watch: {
      scss: {
        files: 'public/**/*.scss',
        tasks: ['compass']
      },
      css:{
        files: 'public/**/*.css',
        options:{
          livereload: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('server', 'Server task starts the Server', function() {
    

    grunt.log.writeln('Started web server on port 3000');
    require('./app.js').listen(3000);
    grunt.task.run(['compass', 'watch']);
  });

  grunt.registerTask('custom', 'Custom task', function() {
    grunt.log.writeln('Custom task called');
  });

  grunt.registerTask('default', ['server']);

};