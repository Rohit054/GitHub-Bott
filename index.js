const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';
const _ = require('lodash');

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
  // You need to add the file paths of the files you want to commit here
  await jsonfile.writeFile(FILE_PATH, data);
  await simpleGit().add([FILE_PATH, 'index.js']).commit(DATE, { '--date': DATE });
  
  makeCommit(n - 1);
};

makeCommit(100);
