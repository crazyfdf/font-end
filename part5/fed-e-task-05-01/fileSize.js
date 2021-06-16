const fs = require("fs");
const path = require("path");
function fileSize(filePath, callback) {
  let size = 0;
  const absPath = path.join(__dirname, filePath);
  fs.stat(absPath, (err, data) => {
    if (err) return callback(err);
    if (data.isFile()) return callback(err, data.size);
    fs.readdir(absPath, (err1, data1) => {
      if (err1) return callback(err1);
      if (data1.length === 0) return callback(err1, 0);
      data1.forEach((item, index) => {
        console.log(item);
        fileSize(path.join(filePath, item), (err1, _size) => {
          if (err1) return callback(err1);
          size += _size;
          if (index <= 0) {
            callback(err, size);
          }
        });
      });
    });
  });
}
fileSize("node-static", (err, size) => {
  console.log(size);
});
