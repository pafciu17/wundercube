'use strict';

const fs = require('fs');

module.exports = {
  readCubeFromFile: (path) => {
    const cube = [];
    let sideLength;
    fs.readFileSync(path, 'utf8').split('\n')
      .filter(row => row.length > 0)
      .forEach((row, index) => {
        if (!sideLength) {
          sideLength = row.length;
        }
        const x = index % sideLength;
        const y = Math.floor(index / sideLength);
        if (!cube[y]) {
          cube[y] = [];
        }
        cube[y][x] = row.toLowerCase().split('');
      });
    return cube;
  },

  readWordsFromFile: (path) => {
    return fs.readFileSync(path, 'utf8').split('\n');
  }
};