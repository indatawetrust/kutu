import test from 'ava';
import kutu from './index';
import fs from 'fs';
import path from 'path';

test('test', async t => {
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

  t.is(fs.existsSync('foo'), true);
  t.is(fs.existsSync('foo/bar'), true);
  t.is(fs.existsSync('foo/bar/index.html'), true);

  t.is(
    fs.readFileSync(path.join(__dirname, 'foo/bar/index.html'), 'utf8'),
    content,
  );
});
