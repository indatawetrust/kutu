# kutu
multiple file creation package

### install
```
npm i kutu --save
```

### usage
```js
const kutu = require('kutu');

kutu('foo', [
  {
    name: 'bar/index.html',
    content: `<html>
      <head>
        <title>kutu</title>
      </head>
      <body>
        hello world
      </body>
    </html>`
  }
]).then(() => {

  // foo/bar/index.html created..

})

// or url

kutu('foo', [
  {
    name: 'bar/avatar.png',
    content: 'https://avatars2.githubusercontent.com/u/6845298?s=460&v=4'
  }
]).then(() => {

  // foo/bar/avatar.png created..

})
```
