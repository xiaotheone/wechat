var path = require('path');
var fs = require('fs');

function mkdirp (filePath) {
    var dir = path.dirname(filePath);
    try {
        fs.readdirSync(dir);
    } catch (err) {
        mkdirp(dir);
        fs.mkdirSync(dir);
    }
}

module.exports = function (file, data, options) {
    return new Promise(function (resolve, reject) {
        mkdirp(file);

        fs.writeFile(file, data, options, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
