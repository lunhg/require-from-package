"use strict";

const fs = require('fs');
const path = require('path');

module.exports = function(opt, done){
    let __deps__ = ["dependencies", "devDependencies"];
    for(let i in __deps__){
	let _p = path.join(opt.path, `${opt.destination}/${__deps__[i]}.${opt.ext}`);
	let str = []
	if(opt.ext === 'js'){
	    str.push("\n\"use strict\"");
	}

	// First contextualize the code
	// with common core library
	for(let j in opt.core){
	    let __pkg__ = opt.core[j]
	    if(opt.ext === 'js'){
		if(__pkg__ !== 'jQuery' || __pkg__ !== 'jquery'){
		    str.push(`const ${__pkg__} = require('${__pkg__}')`);
		}
		else{
		    str.push("window.jQuery = require('jquery')");
		}
	    }
	    else if(opt.ext === 'coffee'){
		if(__pkg__ !== 'jQuery' || __pkg__ !== 'jquery'){
		    str.push(`${__pkg__} = require '${__pkg__}'`);
		}
		else{
		    str.push("window.jQuery = require 'jquery'");
		}
		
	    }
	    else{
		throw new Error("no extension defined");
	    }
	}
	// Now the third pirth libraries
	let _dep = opt.pkg[__deps__[i]];
	for(let j in _dep){
	    let name = j.replace(/-/g, "_")
	    name = j.replace(/\@/g, "")
	    name = j.replace(/\//g, "_")
	    if(opt.validate(name)){
		if(opt.ext === 'js'){
		    str.push(`const ${name} = require('${j}')`);
		}
		if(opt.ext === 'coffee'){
		    str.push(`${name} = require '${j}'`);
		}
	    }
	}

	let text = ""
	if(opt.ext === 'js') text = str.join(";\n")
	if(opt.ext === 'coffee') text = str.join("\n")
	fs.writeFile(_p, text, function(err){
	    if(err) done(err);
	    if(i == 1) done();
	})
    }
}
