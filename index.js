/**
 * Swig translation tags using [i18n-abide](https://github.com/mozilla/i18n-abide)
 *
 * Authors:
 *   - Michael Weibel <michael@mila.com>
 *   - Patrick Stadler <pstadler@mila.com>
 *
 * License: MIT
 * Copyright 2014 Mila AG
 */

var trans = require('./src/trans')
  , blocktrans = require('./src/blocktrans');

module.exports = function(swig) {
  swig.setTag("trans", trans.parse, trans.compile, trans.ends, trans.blockLevel);
  swig.setTag("blocktrans", blocktrans.parse, blocktrans.compile
    , blocktrans.ends, blocktrans.blockLevel);
};
