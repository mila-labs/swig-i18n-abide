/**
 * Translate tag
 *
 * {% trans "String to be translated" %}
 *
 * Copyright 2014 Mila
 * Author: Michael Weibel <michael@mila.com>
 */
'use strict';

var util = require('util');

exports.parse = function parseTrans(str, line, parser, types, options) {
	parser.on(types.STRING, function parseTransToken(token) {
		this.out.push(token.match);
		return false;
	});
	parser.on(types.VAR, function(token) {
		this.out.push(token.match);
		return false;
	});

	return true;
};

exports.compile = function compileTrans(compiler, args, content, parents, options, blockName) {
	var str = args.shift();
	return util.format('_output += _ctx.gettext(%s);', str);
};

exports.ends = false;
exports.blockLevel = false;