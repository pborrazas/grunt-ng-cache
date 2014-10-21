# grunt-ng-cache v0.1.0

> Grunt plugin to compile files into AngularJs cache


## Getting Started



*If you are new to Grunt, you will find a lot of answers to your questions in their [getting started guide](http://gruntjs.com/getting-started).

To install the module:
```
npm install --save-dev git@github.com:pborrazas/grunt-ng-cache.git
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
  customCache: {
    src: 'src/i18n/*.json',
    dest: 'dist/l10nCache.js',
    moduleName: 'demo'
  }
```

### Template cache (default AngularJs cache for templates)
```js
  templateCache: {
    src: 'src/templates/*.html',
    dest: 'dist/templateCache.js',
    moduleName: 'demo',
    options: {
      cacheName: 'templates'
    }
  }
```

### Custom cache
```js
  customCache: {
    src: 'src/i18n/*.json',
    dest: 'dist/l10nCache.js',
    moduleName: 'demo',
    options: {
      cacheName: 'customCacheName'
    }
  }

```

### Custom cached URLs
```js
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

```