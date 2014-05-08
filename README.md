# Swig translation tags for i18n-abide

[i18n-abide](https://github.com/mozilla/i18n-abide) is a translation library for node.js apps.

## Usage
### Prerequisites
i18n-abide and swig need to be added as a middleware to the express (or other framework) app.

Also, `format` and `gettext` need to be supplied in the context of swig (using res.locals).

### Template helpers

```javascript
// setup the trans & blocktrans template helpers
require('swig-i18n-abide')(swig);
```

### Templates

```javascript
// single line translations
{% trans "I'll be translated" %}
// single line translations with replacements
{% trans "String %(foobar)s with string replacements" %}

// multiline translations with replacements and maybe html
{% blocktrans with name=name url=url %}
Hello <a href="%(url)s">%(name)s</a>.
Pleasure to meet you.
{% blocktrans %}
```