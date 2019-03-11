# PostCSS Util Class Placeholder [![Build Status][ci-img]][ci]

A simple [PostCSS] plugin that add `Placeholder` syntax (SASS-like) behind the utility class selector.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.com/ShenTengTu/postcss-util-class-placeholder.svg
[ci]:      https://travis-ci.com/ShenTengTu/postcss-util-class-placeholder

```css
.hover\:text-light-grey:hover {
  color: #666;
}
```

```css
.hover\:text-light-grey:hover, %hover\:text-light-grey:hover {
  color: #666;
}
```

## Usage

```js
const path = require('path')
module.exports = {
  plugins: [
    //specify the files which you want to process only
    require('postcss-util-class-placeholder')({files: [
      path.resolve(__dirname, './src/your-util.css')
    ]})
  ]
}
```
