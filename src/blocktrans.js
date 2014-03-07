/**
 * Translate block
 *
 * {% blocktrans %}
 * String to be translated
 * {% endblock %}
 *
 * Copyright 2014 Mila
 * Author: Patrick Stadler <pstadler@mila.com>
 */
'use strict';

var util = require('util');

exports.parse = function parseBlocktrans(str, line, parser, types, stack, options) {
	var lastKwargName;
	parser.on(types.VAR, function (token) {
		if(token.match === 'with') {
			return;
		}
		if(lastKwargName) {
			this.out.push('"' + lastKwargName + '": ' + '_ctx.' + token.match);
			lastKwargName = null;
			return;
		}
		lastKwargName = token.match;
		return false;
	});

	parser.on(types.STRING, function (token) {
		if(lastKwargName) {
			this.out.push('"' + lastKwargName + '": ' + token.match);
			lastKwargName = null;
			return;
		}
		return false;
	});

	return true;
};

exports.compile = function compileBlocktrans(compiler, args, content, parents, options, blockName) {
	var lines = [];
	for(var i in content) {
		lines.push(content[i].replace(/\n|\t/g,' '));
	}
	var str = lines.join(' ').replace(/ +(?= )/g,'').replace(/\"/g, '\\"').trim();

	if(!str) {
		return;
	}
	var out = util.format('_output += _ctx.format(_ctx.gettext("%s"), {' + args.join(',') + '});', str);

	return out;
};

exports.ends = true;
exports.block = true;
exports.blockLevel = false;