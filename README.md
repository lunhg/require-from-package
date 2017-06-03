# Require from package

This package enable a node.js project powered by [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) to inject dependencies and devDependencies from a package.json in a unified source code.

## Install

```
npm i --save-dev require-from-package
```

## Run

This module will create the files dependencies.js and devDependencies.js, in the folder `boot/`,  where `boot/` is located according the current working directory.

```js
grunt.registerTask('libs', 'An async library maker task', function(){
  let done = this.async();
  require_from_package({
    path: process.cwd(),
    destination: "boot"
    pkg: grunt.file.readJSON('package.json'),
    core: ['fs', 'path'],
    validate: function(name){
      let regexp = new RegExp("(grunt.*|check_node|require_from_package)");
      return !name.match(regexp);
    }
  }, done);
});

### Options

- `path`: a working directory string ;
- `destination`: the folder where you put the files;
- `pkg`: a Object corresponding to `package.json`, with the dependencies and devDependencies,
- `core`: an Array of strings to add node.js core modules
- `core`: a Function to validate modules. All `-` characters will be tranformed to `_`
```