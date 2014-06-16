/**
 * Translate tag
 *
 * {% trans "String to be translated" %}
 * {% trans "String %(foobar)s with string replacements" %}
 *
 * Copyright 2014 Mila
 * Author: Michael Weibel <michael@mila.com>
 */
'use strict';

var util = require('util')
	, throwError = require('swig/lib/utils').throwError;

var FIND_PARAMS_REGEX = /%\(\s*([^)]+)\s*\)s/g;

exports.parse = function parseTrans(str, line, parser, types, options) {
	parser.on(types.STRING, function parseTransToken(token) {
		if(token.match.length <= 2) {
			throwError("Non-empty string expected", line, parser.filename);
		}
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
	var str = args.shift()
		, params = []
		, match = [];
	while((match = FIND_PARAMS_REGEX.exec(str)) !== null) {
		var ctxToken = match[1];
		params.push('"' + ctxToken + '": _filters.escape(_ctx["' + ctxToken + '"])');
	}
	return util.format('_output += _ctx.format(_ctx.gettext(%s), {' + params.join(',') + '});', str);
};

exports.ends = false;
exports.blockLevel = false;
