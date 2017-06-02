"use strict";

const fs = require('fs');
const path = require('path');

module.exports = function(deps, core, done){
    for(let p in deps){
	let _p = path.join(__dirname, `boot/${deps[p]}.js`);
	let str = ["\n\"use strict\""];

	// First contextualize the code
	// with common core library
	for(let __pkg__ in core){
	    str.push(`const ${name} = require('${__pkg__}')`);
	}

	// Now the third pirth libraries
	for(let __pkg__ in pkg[deps[p]]){
	    let name = __pkg__.replace(/-/, "_")
	    if(!name.match(/grunt.*/) && !name.match(/check_node/)){
		str.push(`const ${name} = require('${__pkg__}')`);
		grunt.log.writeln(`${__pkg__} added to ${deps[p]}`)
	    }
	}
	
	fs.writeFile(_p, str.join(";\n\n"), function(err){
	    if(err) done(err);
	    if(p == 1) done();
	})
    }
}
