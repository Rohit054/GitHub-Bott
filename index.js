const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';
const _ = require('lodash');
const fs = require('fs'); // Import the 'fs' module to work with file paths

const makeCommit = async (n) => {
  if (n === 0) {
    await simpleGit().push();
    return;
  }

  const x = _.random(0, 54);
  const y = _.random(0, 6);
  const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();
  const data = {
    date: DATE
  };

  console.log(n);

  // Modify other files, e.g., index.js
  // Add the file paths of all files you want to commit here
  const filesToCommit = [FILE_PATH, 'index.js', 'other-file-1.js', 'other-file-2.js']; // Add more files as needed

  // Add and commit all specified files
  for (const filePath of filesToCommit) {
    if (fs.existsSync(filePath)) { // Check if the file exists before adding it
      await simpleGit().add(filePath);
    }
  }

  await simpleGit().commit(DATE, { '--date': DATE });

  makeCommit(n - 1);
};

makeCommit(100);
