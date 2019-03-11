var postcss = require('postcss')
var fs = require('fs')
var path = require('path')

var plugin = require('../')

var inputCSS = '.hover\\:text-light-grey:hover {\n  color: #666;\n}\n'
var outputCSS = '%hover\\:text-light-grey:hover {\n  color: #666;\n}\n'

function readFile (file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, { encoding: 'utf-8' }, function (error, data) {
      if (error) reject(error)
      resolve(data)
    })
  })
}

function run (from, input, output, opts) {
  return postcss([plugin(opts)]).process(input, { from: from })
    .then(function (result) {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

it('process (no specify files)', function () {
  var from = path.resolve(__dirname, './test.css')
  return readFile(from).then(function (data) {
    return run(from, data, outputCSS)
  })
})

it('process (specify files)', function () {
  var from = path.resolve(__dirname, './test.css')
  return readFile(from).then(function (data) {
    return run(from, data, outputCSS, { files: [from] })
  })
})

it('process (specify files but not include)', function () {
  var from = path.resolve(__dirname, './test.css')
  return readFile(from).then(function (data) {
    var another = path.resolve(__dirname, './another.css')
    return run(from, data, inputCSS, { files: [another] })
  })
})
