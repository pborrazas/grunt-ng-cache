# grunt-ng-cache v0.2.0

> Grunt plugin to compile files into AngularJs cache


## Getting Started



*If you are new to Grunt, you will find a lot of answers to your questions in their [getting started guide](http://gruntjs.com/getting-started).

To install the module:
```
npm install --save-dev git@gitlab.despegar.it:front-end-tools/grunt-ng-cache.git
```

Include the task in your Gruntfile:
```js
grunt.loadNpmTasks('grunt-ng-cache');
```

Create a config block within your Gruntfile:
```js
ngCache: {
    target: {
        src: 'path/to/files/to/be/cached',
        dest: 'path/to/dist/folder/',
        moduleName: 'moduleName' /* Required. AngularJs module name */
    },
    options: {
        cacheName: 'customCacheName', /* Use 'templates' for template files */,
        cacheUrl: null,
        standalone: false,
        verbose: false
    }
}
```

## Options

#### cacheName
Type: `String`  
Default: `$http`

Defaults to '$http', the default AngularJs cache name for http requests. Use 'templates' to cache HTML files. 

#### cacheUrl
Type: `Function`  
Default: null

Allows customization of the urls files are added to the cache. The function receives the auto-generated url path as the first argument and is expected to return a string which will be used as the new url path for cache.

#### standalone
Type: `Boolean`
Default: false

Indicates whether the referenced module by ´moduleName´ is an existing module or a new one has to be created. Defaults to false

#### verbose
Type: `Boolean`  
Default: false

Print details of the added files to cache.

#### escapeContent
Type: `Boolean`  
Default: true

Whether the content should be escaped. Enabled by default.

#### defaultModuleName
Type: `String`  
Default: ''

AngularJS module name by default.

## Usage Examples:

### $http cache (default AngularJs cache for http requests)
```js
ngCache: {
  customCache: {
    src: 'src/i18n/*.json',
    dest: 'dist/l10nCache.js',
    moduleName: 'demo'
  }
}
```

### Template cache (default AngularJs cache for templates)
```js
ngCache: {
  templateCache: {
    src: 'src/templates/*.html',
    dest: 'dist/templateCache.js',
    moduleName: 'demo',
    options: {
      cacheName: 'templates'
    }
  }
}
```

### Custom cache
```js
ngCache: {
  customCache: {
    src: 'src/i18n/*.json',
    dest: 'dist/l10nCache.js',
    moduleName: 'demo',
    options: {
      cacheName: 'customCacheName'
    }
  }
}
```

### Custom cached URLs
```js
ngCache: {
  customCache: {
    src: 'src/templates/*.html',
    dest: 'dist/templateCache.js',
    moduleName: 'demo',
    options: {
      cacheUrl: function (filePath) {
        var fileName = filePath.replace(/\/|.*(?![^\/]*$)/g, '');
        return 'custom-url-path/' + fileName;
      }
    }
  }
}
```
## Use with file preprocessors

You can pre process files before compile them into angular's cache. For HTML template files you can use htmlmin as follow:

```js
htmlmin: {
  templates: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: 'ng-app/',
      src: '**/*.html',
      dest: '.tmp/templates'
    }]
  }
},
ngCache: {
  dist: {
    src: '.tmp/templates/**/*.html',
    dest: 'dist/ngCache.js',
    moduleName: 'templatesDemo',
    options: {
      cacheUrl: function (filePath) {
        var regexp = new RegExp(/^\.tmp\/templates(.*)/);
        return '/static/templates'.concat(regexp.exec(path)[1]);
      }
    }
  }
}
```

Run htmlmin before cache task:
```js
grunt.registerTask('build', [
  'htmlmin:templates',
  'ngCache'
]);
```

## Based on previous work of [https://github.com/ericclemmons](https://github.com/ericclemmons) and [https://github.com/vojtajina](https://github.com/vojtajina) in the following plugins:

[https://github.com/karma-runner/karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor)
[https://github.com/ericclemmons/grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates)