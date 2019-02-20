const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const validUrl = require('valid-url');
const download = require('download-file')

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
        mkdirp(path.dirname(name), err => {
          if (err) {
            reject();
          } else {
            const interval = setInterval(() => {
              if (fs.existsSync(path.dirname(name))) {
                resolve()
                clearInterval(interval)
              } 
            })
          }
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
            const basename = path.basename(name)
            if (validUrl.isUri(content)) {
              download(content, { directory: path.dirname(name), filename: basename }, function(err){
                if (err) reject();
                resolve(path.resolve(__dirname, name));
              })
            } else {
              fs.writeFile(name, content, err => {
                resolve(path.resolve(__dirname, name));
              });
            }
          })
        )
      );

      Promise.all(promises).then(resolve).catch(reject);
    });
  });
};

module.exports = kutu;
