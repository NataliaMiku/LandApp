'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // load all tasks
  require('time-grunt')(grunt); // only include this if you have added time-grunt

  var jsLibs = [
    'bower_components/foundation/js/vendor/modernizr.js',
    'bower_components/foundation/js/vendor/jquery.js',
    'bower_components/foundation/js/vendor/jquery.cookie.js',
    'bower_components/foundation/js/vendor/placeholder.js',
    'bower_components/foundation/js/vendor/fastclick.js'
  ];

  var jsFoundation = [
    'bower_components/foundation/js/foundation/foundation.js'/*,
    'bower_components/foundation/js/foundation/foundation.abide.js',
    'bower_components/foundation/js/foundation/foundation.accordion.js',
    'bower_components/foundation/js/foundation/foundation.alert.js',
    'bower_components/foundation/js/foundation/foundation.clearing.js',
    'bower_components/foundation/js/foundation/foundation.dropdown.js',
    'bower_components/foundation/js/foundation/foundation.equalizer.js',
    'bower_components/foundation/js/foundation/foundation.interchange.js',
    'bower_components/foundation/js/foundation/foundation.joyride.js',
    'bower_components/foundation/js/foundation/foundation.magellan.js',
    'bower_components/foundation/js/foundation/foundation.offcanvas.js',
    'bower_components/foundation/js/foundation/foundation.orbit.js',
    'bower_components/foundation/js/foundation/foundation.reveal.js',
    'bower_components/foundation/js/foundation/foundation.slider.js',
    'bower_components/foundation/js/foundation/foundation.tab.js',
    'bower_components/foundation/js/foundation/foundation.tooltip.js',
    'bower_components/foundation/js/foundation/foundation.topbar.js'*/
  ];

  //Custom javascript files
  var jsApp = [
    'assets/js/app.js',    
    'assets/js/vendor/dmmenu/classie.js',
    'assets/js/vendor/dmmenu/dmmenu.js'/*,
    'assets/js/vendor/landingpage/vendor/enquire.js',
    'assets/js/vendor/landingpage/plugins/jquery.mousewheel.js',
    'assets/js/vendor/landingpage/plugins/jquery.ba-hashchange.min.js',
    'assets/js/vendor/landingpage/script.js'*/   
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: [
                        require('node-bourbon').includePaths,
                        'bower_components/foundation/scss'
                      ],
        sourceMap: true
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/app.css': 'assets/scss/app.scss'
        }        
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        jsApp
      ]
    },

    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'assets/js/libs/libs.min.js': [jsLibs],
          'assets/js/libs/foundation.min.js': [jsFoundation],
          'assets/js/app.min.js': [jsApp]
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },

      js: {
        files: [
          jsLibs,
          jsFoundation,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },

      livereload: {
        options: {
          livereload: true
        },
        files: [
          'assets/js/app.min.js',
          'assets/css/app.css',
          '*.php',
          '*.html'
        ]
      }

    }
  });

  /*grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);*/

  grunt.registerTask('build', [
      'jshint',
      'uglify',
      'sass'
  ]);

};