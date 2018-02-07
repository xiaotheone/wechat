var fs = require('fs');
var tap = require('tap');
var write = require('..');

tap.test('write a file', function (t) {
    var filePath = 'tmp/nested/file';
    return write(filePath, '12').then(function () {
        var fromDisk = fs.readFileSync(filePath);
        t.equal(fromDisk.toString(), '12');
    });
});
