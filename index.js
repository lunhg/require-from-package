"use strict";

const fs = require('fs');
const path = require('path');

module.exports = function(opt, done){
    let __deps__ = ["dependencies", "devDependencies"];
    for(let i in __deps__){
	let _p = path.join(opt.path, `${opt.destination}/${__deps__[i]}.js`);
	let str = ["\n\"use strict\""];

	// First contextualize the code
	// with common core library
	for(let j in opt.core){
	    let __pkg__ = opt.core[j]
	    str.push(`const ${__pkg__} = require('${__pkg__}')`);
	}

	// Now the third pirth libraries
	let _dep = opt.pkg[__deps__[i]];
	for(let j in _dep){
	    let name = j.replace(/-/g, "_")
	    if(opt.validate(name)){
		str.push(`const ${name} = require('${j}')`);
	    }
	}
	
	fs.writeFile(_p, str.join(";\n"), function(err){
	    if(err) done(err);
	    if(i == 1) done();
	})
    }
}
