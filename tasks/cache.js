'use strict';

var util = require('util');

module.exports = function(grunt) {

  grunt.registerMultiTask('ngCache', 'Compile files into AngularJs cache', function() {

    var options = this.options({
      cacheName: '$http', /* {String} Defatuls to '$http'. Use 'templates' to cache HTML files */
      cacheUrl: null, /* {Function} Allows to customize auto-generated URLs based on filepaths. Defaults to null */
      standalone: false, /* {Boolean} Indicates if the module referenced by ´moduleName´ it's an existent module or a new one should be created. Defaults to false */
      verbose: false, /* {Boolean} Include into log the filepaths and URLs of cached files. Defaults to false */
    });

    grunt.verbose.writeflags(options, 'Options');

    var tpl = [
      "angular.module('%s'" + (options.standalone ? ", []" : "") + ").",
      "run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {", /* trick to avoid cache override when angular services start  */
        "\tvar c = cf.get('%s') || cf('%s');",
        "\t%s",
      "}]);"
    ].join("\n");

    var entryTpl = "c.put('%s', '%s');";

    this.files.filter(function(module) {
      if (!module.src.length) {
        grunt.log.warn('No templates found.');
        return false;
      }
      if (!module.moduleName) {
        grunt.log.error('Missing param. ´moduleName´ is required.');
        return false;
      }
      return true;
    }).forEach(function (module) {

      var entries = module.src.map(function(path) {
        function escape(data) {
          return options.escapeContent ? (data + '').replace(/'/g, '\\$&').replace(/\r?\n/g, '\\n').replace(/(\t)/g, '\\t') : data;
        }
        function cacheUrl(path) {
          path = path.replace(/\\/g, '/'); /* fix windows backslashes */
          return typeof options.cacheUrl === 'function' ? options.cacheUrl(path) : path;
        }
        var url = cacheUrl(path);
        if (options.verbose) { 
          grunt.log.writeln(path.green + ' >> ' + url.green);
        }
        return util.format(entryTpl, url, escape(grunt.file.read(path)));
      });

      var fileContent = util.format(tpl,
        module.moduleName,
        options.cacheName,
        options.cacheName,
        entries.join('\n\t')
      );

      grunt.file.write(module.dest, fileContent);

      grunt.log.writeln(module.src.length + ' files cached into ' + options.cacheName + ' cache for ' + module.moduleName + ' module');
      grunt.log.writeln('File ' + module.dest.cyan + ' created.');

    });

  });
};