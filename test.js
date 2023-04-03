const kutu = require('./index');
const fs = require('fs');
const path = require('path');

test('test', async () => {
  const content = `<html>
      <head>
        <title>kutu</title>
      </head>
      <body>
        hello world
      </body>
    </html>`;

  await kutu('foo', [
    {
      name: 'bar/index.html',
      content: content,
    },
  ]);

  expect(fs.existsSync('foo')).toBeTruthy();
  expect(fs.existsSync('foo/bar')).toBeTruthy();
  expect(fs.existsSync('foo/bar/index.html')).toBeTruthy();

  expect(
    fs.readFileSync(path.join(__dirname, 'foo/bar/index.html'), 'utf8')
  ).toBe(content);
});
