'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    clean: {
      tests: 'tmp'
    },

    nodeunit: {
      tests: 'test/test.js'
    },

    ngCache: {
      customCache: {
        src: 'test/fixtures/data.json',
        dest: 'tmp/customCache.js',
        moduleName: 'demo',
        options: {
          cacheName: 'customCacheName'
        }
      },
      customUrlCache: {
        src: 'test/fixtures/template.html',
        dest: 'tmp/customUrlCache.js',
        moduleName: 'demo',
        options: {
          cacheUrl: function (path) {
            return 'custom-cache-url/' + path.replace(/\/|.*(?![^\/]*$)/g, '');
          },
          verbose: true
        }
      },
      emptyCache: {
        src: 'test/no/existing/path/*.html',
        dest: 'tmp/emptyCache.js',
        moduleName: 'demo'
      },
      standAlone: {
        src: 'test/fixtures/template.html',
        dest: 'tmp/standAloneModule.js',
        moduleName: 'demo',
        options: {
          standalone: true
        }
      },
      singlequotes: {
        src: ['test/fixtures/singlequotes.html', 'test/fixtures/singlequotes.json'],
        dest: 'tmp/singlequotes.js',
        moduleName: 'demo'
      },
      expresions: {
        src: 'test/fixtures/expresions.html',
        dest: 'tmp/expresions.js',
        moduleName: 'demo'
      },
      indentation: {
        src: 'test/fixtures/indentation.html',
        dest: 'tmp/indentation.js',
        moduleName: 'demo'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'clean', 'ngCache', 'nodeunit']);
};