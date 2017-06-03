# Require from package

This package enable a node.js project powered by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) to inject dependencies and devDependencies from a package.json in a unified source code.

## Install

```
npm i --save-dev require-from-package
```

## Run

```js
grunt.registerTask('libs', 'An async library maker task', function(){
  let done = this.async();
  require_from_package({
    path: __dirname,
    pkg: pkg,
    deps: ['dependencies','devDependencies'],
    core: ['fs', 'path']
  }, done);
});
```