
let ConwayGameOfLife = require('./game/ConwayGameOfLife.js');

let start = () => {

  let gameConfig = {
    gridConfig: {
      rowCount: 6,
      columnCount: 12
    },
    initialStateGrid: [
      [ 0, 0, 0, 0, 0, 0, 1, 0],
      [ 1, 1, 1, 0, 0, 0, 1, 0],
      [ 0, 0, 0, 0, 0, 0, 1, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 1, 1, 0, 0, 0],
      [ 0, 0, 0, 1, 1, 0, 0, 0]
    ]
  }

  let conwayGameOfLife = new ConwayGameOfLife(gameConfig);

  conwayGameOfLife.step();
  conwayGameOfLife.outputGrid();
  // there is a bug where some cells report the wrong wasAlive value after the first step
  // not sure why yet...
  // conwayGameOfLife.step();
  // conwayGameOfLife.outputGrid();
}

start();

// for waiting for the chrome debugger to attach
// setTimeout(start, 5000);
