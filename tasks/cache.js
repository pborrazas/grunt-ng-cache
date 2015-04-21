'use strict';

var util = require('util');

module.exports = function(grunt) {

  grunt.registerMultiTask('ngCache', 'Compile files into AngularJs cache', function() {

    var options = this.options({
      moduleName: '', /* {String=} AngularJS module name by default */
      standalone: false, /* {Boolean=} Indicates whether the referenced module by ´moduleName´ is an existing module or a new one has to be created. Defaults to false */
      cacheName: '$http', /* {String=} Defaults to '$http' the default AngularJs cache name for http requests. Use 'templates' to cache HTML files */
      cacheUrl: null, /* {Function=} Allows customization of the urls files are added to the cache. Optional */
      verbose: false, /* {Boolean=} Print details of the added files to cache. Disabled by default */
      escapeContent: true /* {Boolean=} Whether the content should be escaped. Enabled by default */
    });

    var tpl = [
      "angular.module('%s'" + (options.standalone ? ", []" : "") + ").",
      "run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {", /* trick to prevent the cache is overwritten when services are instantiated */
        "\tvar c = cf.get('%s') || cf('%s');",
        "\t%s",
      "}]);"
    ].join("\n");

    var entryTpl = "c.put('%s', %s);";

    this.files.filter(function(module) {
      if (!module.src.length) {
        grunt.log.warn('No templates found.');
        return false;
      }
      if (!(module.moduleName || options.moduleName)) {
        grunt.log.error('Missing param. ´moduleName´ is required.');
        return false;
      }
      return true;
    }).forEach(function (module) {

      var entries = module.src.map(function(path) {
        function escape(data) {
          return options.escapeContent ? '\'' + (data + '').replace(/'/g, '\\$&').replace(/\r?\n/g, '\\n').replace(/(\t)/g, '\\t') + '\'' : data;
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

      var moduleName = module.moduleName || options.moduleName;
      var cacheName = module.cacheName || options.cacheName;

      var fileContent = util.format(tpl,
        moduleName,
        cacheName,
        cacheName,
        entries.join('\n\t')
      );

      grunt.file.write(module.dest, fileContent);

      grunt.log.writeln(module.src.length + ' files cached into ' + cacheName + ' cache for ' + moduleName + ' module');
      grunt.log.writeln('File ' + module.dest.cyan + ' created.');

    });
  });
};