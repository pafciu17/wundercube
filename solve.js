'use strict';

const getCharacterFromCube = (position, cube) => {
  try {
    return cube[position[0]][position[1]][position[2]];
  } catch (error) {
    return null;
  }
}

const clearCharacterFromTube = (position, cube) => {
  try {
    return cube[position[0]][position[1]][position[2]] = null;
  } catch (error) {}
}

const copyCube = (cube) => {
  const newCube = [];
  for (let i = 0; i < cube[0].length; i++) {
    newCube[i] = []
    for (let j = 0; j < cube[0].length; j++) {
      newCube[i][j] = []
      for (let k = 0; k < cube[0].length; k++) {
        newCube[i][j][k] = cube[i][j][k];
      }
    }
  }
  return newCube;
}

const getNextPositions = (position, cube) => {
  var nextPositions = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        const checkPosition = [
          position[0] + i,
          position[1] + j,
          position[2] + k
        ];
        if (
          i != position[0]
          || j != position[1]
          || k != position[2]
        ) {
          const character = getCharacterFromCube(checkPosition, cube);
          if (character) {
            nextPositions.push({
              character,
              position: checkPosition
            })
          }
        }
      }
    }
  }
  return nextPositions;
}

const getMatchingWordsByFirstCharacter = (character, words) => {
  return words
    .filter(word => word[0] === character[0])
    .map(word => word.slice(1));
}

const solveCase = (prefix, positionToCheck, words, cube, cubeCounterCharacter) => {
  let foundWords = [];
  positionToCheck.forEach(positionToCheck => {
    const character = positionToCheck.character;
    const position = positionToCheck.position;
    const matchingWords = getMatchingWordsByFirstCharacter(character, words);
    const newPrefix = prefix + character;

    const wordsToProcess = matchingWords.filter(word => {
      if (word.length === 0) {
        foundWords.push(newPrefix);
        return false;
      }
      return true;
    });

    if (wordsToProcess.length > 0) {
      const newCube = copyCube(cube);
      clearCharacterFromTube(position, newCube);
      const nextPositions = getNextPositions(position, newCube);
      foundWords = foundWords.concat(solveCase(newPrefix, nextPositions, wordsToProcess, newCube));
    }
  });
  return foundWords;
};

const getAllPositions = (cube) => {
  const allPositions = [];
  for (let i = 0; i < cube[0].length ; i++) {
    for (let j = 0; j < cube[0].length; j++) {
      for (let k = 0; k < cube[0].length; k++) {
        const position = [i, j, k];
        const character = getCharacterFromCube(position, cube);
        allPositions.push({
          character,
          position
        })
      }
    }
  }
  return allPositions;
};

module.exports = (words, cube) => {
  const allPositions = getAllPositions(cube);
  return solveCase('', allPositions, words, cube);
}