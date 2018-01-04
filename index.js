const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const kutu = (folder, files) => {
  let promises = [];

  files = files.map(file => {
    file.name = path.join(folder, file.name);
    file.dir = path.dirname(file.name);

    return file;
  });

  files.map(({name, dir}) =>
    promises.push(
      new Promise((resolve, reject) => {
        mkdirp(path.join(__dirname, path.dirname(name)), err => {
          if (err) reject(err);
          else resolve();
        });
      })
    )
  );

  return new Promise((resolve, reject) => {
    Promise.all(promises).then(() => {
      promises = [];

      files.map(({name, content}) =>
        promises.push(
          new Promise(resolve => {
            fs.writeFile(name, content, err => {
              console.log(err)
              resolve();
            });
          })
        )
      );

      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

module.exports = kutu;
