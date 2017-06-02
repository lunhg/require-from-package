"use strict";

const fs = require('fs');
const path = require('path');

module.exports = function(opt, done){
    for(let i in opt.deps){
	let _p = path.join(opt.path, `boot/${opt.deps[i]}.js`);
	let str = ["\n\"use strict\""];

	// First contextualize the code
	// with common core library
	for(let j in opt.core){
	    let __pkg__ = opt.core[j]
	    str.push(`const ${__pkg__} = require('${__pkg__}')`);
	}

	// Now the third pirth libraries
	let _dep = opt.pkg[opt.deps[i]];
	for(let j in _dep){
	    let name = j.replace(/-/, "_")
	    if(!name.match(/grunt.*/) && !name.match(/check_node/)){
		str.push(`const ${name} = require('${j}')`);
	    }
	}
	
	fs.writeFile(_p, str.join(";\n\n"), function(err){
	    if(err) done(err);
	    if(i == 1) done();
	})
    }
}
