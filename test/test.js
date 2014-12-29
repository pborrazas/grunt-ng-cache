'use strict';

var grunt = require('grunt');

exports.ngtemplates = {

  standAloneCache: function(test) {
    var actual = grunt.file.read('tmp/standAloneModule.js');
    var expected = grunt.file.read('test/expected/standAloneModule.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  customUrlCache: function(test) {
    var actual = grunt.file.read('tmp/customUrlCache.js');
    var expected = grunt.file.read('test/expected/customUrlCache.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  customCache: function(test) {
    var actual = grunt.file.read('tmp/customCache.js');
    var expected = grunt.file.read('test/expected/customCache.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  /* output file only if files were cached */
  emptyCache: function(test) {
    var actual = grunt.file.exists('tmp/emptyCache.js');
    var expected = grunt.file.exists('test/no/existing/path/customCache.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  /* escape singlequotes */
  singlequotes: function(test) {
    var actual = grunt.file.read('tmp/singlequotes.js');
    var expected = grunt.file.read('test/expected/singlequotes.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  /* expresions within templates */
  escapeTextareas: function(test) {
    var actual = grunt.file.read('tmp/expresions.js');
    var expected = grunt.file.read('test/expected/expresions.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  /* tabulation and carriage return stringify */
  escapeHTML: function (test) {
    var actual = grunt.file.read('tmp/indentation.js');
    var expected = grunt.file.read('test/expected/indentation.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },

  noEscaped: function (test) {
    var actual = grunt.file.read('tmp/noEscaped.js');
    var expected = grunt.file.read('test/expected/noEscaped.js');

    test.expect(1);
    test.equal(expected, actual);
    test.done();
  },  
};