# grunt-ng-cache v0.1.0

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

Use 'templates' for template files

#### cacheUrl
Type: `Function`  
Default: null

Allows to customize auto-generated URLs

#### standalone
Type: `Boolean`
Default: false

Indicates if the module referenced by ´moduleName´ it's an existent module or a new one should be created.

#### verbose
Type: `Boolean`  
Default: false

Details of filepaths and URLs of cached files.

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

You can preprocess files before compile them into angular cache. For HTML template files you can use htmlmin as follow:

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
  customCache: {
    src: '.tmp/templates/**/*.html',
    dest: 'dist/ngCache.js',
    moduleName: 'demo',
    options: {
      cacheUrl: function (filePath) {
        var regexp = new RegExp(/^\.tmp\/templates(.*)/);
        return '/static/templates'.concat(regexp.exec(path));
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