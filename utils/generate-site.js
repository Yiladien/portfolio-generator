const fs = require("fs");
const { finished } = require("stream");

// writing user input to log file
const logUserInput = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      "./last-user-input.txt",
      JSON.stringify(fileContent),
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(fileContent);
      }
    );
  });
};

// writing files
const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
};

// copying file
const copyFile = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "Stylesheet created!",
      });
    });
  });
};

module.exports = { logUserInput, writeFile, copyFile };
