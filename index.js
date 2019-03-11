var postcss = require('postcss')

module.exports = postcss.plugin('postcss-test-plugin', function (opts) {
  if (typeof opts !== 'object') opts = { files: [] }
  if (!Array.isArray(opts.files)) opts.files = []
  return function (root) {
    // Transform CSS AST here
    if (opts.files.length === 0) {
      root.walkRules(process)
    } else if (opts.files.indexOf(root.source.input.file) !== -1) {
      root.walkRules(process)
    }
  }

  function process (rule) {
    if (/^\.[-:\w\d\\]+$/.test(rule.selector)) {
      rule.selector = rule.selector + ', ' + rule.selector.replace('.', '%')
    }
  }
})
