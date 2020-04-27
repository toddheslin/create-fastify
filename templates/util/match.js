const isEqual = require('lodash/fp/isEqual')

/**
 * The coolest replacement for switch(){} ever
 * https://codeburst.io/alternative-to-javascripts-switch-statement-with-a-functional-twist-3f572787ba1c
 */
const matched = x => ({
	on: () => matched(x),
	otherwise: () => x,
})
const match = x => ({
	on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
	otherwise: fn => fn(x),
})

exports.match = match
exports.isEqual = isEqual