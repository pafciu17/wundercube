'use strict';

const reader = require('./reader');
const solve = require('./solve');

const args = process.argv.slice(2);

const words = reader.readWordsFromFile(args[0]);
const cube = reader.readCubeFromFile(args[1]);

const foundWords = solve(words, cube);

console.log('Number of results: ' + foundWords.length);