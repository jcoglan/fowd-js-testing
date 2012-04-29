JSCLASS_PATH = 'node_modules/jsclass/src'
require('../../' + JSCLASS_PATH + '/loader')

jQuery = $ = {}
zxcvbn = function() { return {entropy: 10} }

require('./runner')

