let Cell = require('./Cell.js');

class ConwayGameOfLife {

  constructor({gridConfig, initialStateGrid}) {

    this.gridConfig = gridConfig;
    this.grid = [];

    this.initialStateGrid = initialStateGrid;

    this.buildGrid();
    this.outputGrid();
  }

  //builds the multidemensional grid
  buildGrid() {

    for(let rowIndex = 0; rowIndex < this.gridConfig.rowCount; rowIndex++) {
      this.grid[rowIndex] = [];
      for(let columnIndex = 0; columnIndex < this.gridConfig.columnCount; columnIndex++) {
        // debugger;
        this.grid[rowIndex][columnIndex] = new Cell({
          initialState: this.initialStateGrid[rowIndex][columnIndex],
          row: rowIndex,
          column: columnIndex
        });
      }
    }
  }

  // outputs the current grid to the console
  // "O" for alive
  // "." for dead
  outputGrid() {

    console.log(`---------------------------------------\r\nGrid:`);
    for(let rowIndex = 0; rowIndex < this.gridConfig.rowCount; rowIndex++) {

      let runningRowString = ``;

      for(let columnIndex = 0; columnIndex < this.gridConfig.columnCount; columnIndex++) {
        let stateRepString = (this.grid[rowIndex][columnIndex].isAlive) ? "O" : ".";

        runningRowString += stateRepString;
      }

      console.log(runningRowString);
    }

    console.log(`---------------------------------------`);
  }

  outputCellBeingCheckedGrid() {

    console.log(`---------------------------------------\r\nGrid:`);
    for(let rowIndex = 0; rowIndex < this.gridConfig.rowCount; rowIndex++) {

      let runningRowString = ``;

      for(let columnIndex = 0; columnIndex < this.gridConfig.columnCount; columnIndex++) {
        let stateRepString = ``;

        if(this.grid[rowIndex][columnIndex].isBeingChecked) {
          stateRepString = "O";
        } else if(this.grid[rowIndex][columnIndex].isActive) {
          stateRepString = "X"
        } else {
          stateRepString = "."
        }
        // let stateRepString = (this.grid[rowIndex][columnIndex].isBeingChecked) ? "O" : ".";

        runningRowString += stateRepString;
      }

      console.log(runningRowString);
    }

    console.log(`---------------------------------------`);
  }

  // steps through a single iteration of evaluating cell states
  step() {
    for(let rowIndex = 0; rowIndex < this.gridConfig.rowCount; rowIndex++) {
      for(let columnIndex = 0; columnIndex < this.gridConfig.columnCount; columnIndex++) {
        this.grid[rowIndex][columnIndex] = this.evaluateCell(this.grid[rowIndex][columnIndex]);
      }
    }
  }

  // evaluates a cell to detirmine it's state, DEAD or ALIVE
  evaluateCell(cell) {
    cell.isActive = true;
    let liveNeighborCount = 0;
    // debugger;
    //grab starting indexes for the neighbor checks
    // if there are no rows above the cell
    let rowIndex = (cell.row - 1 < 0) ? 0 : cell.row - 1;
    //if there are no rows below the cell
    let rowIndexMax = (cell.row + 1 >= this.gridConfig.rowCount) ? this.gridConfig.rowCount - 1 : cell.row + 1 ;
    //if there are no columns to the left of the cell
    let columnIndex = (cell.column - 1 < 0) ? 0 : cell.column - 1;
    //if there are no columns to the right of the cell
    let columnIndexMax = (cell.column + 1 >= this.gridConfig.columnCount) ? this.gridConfig.columnCount - 1 : cell.column + 1;

    // console.log(`(${rowIndex}-${rowIndexMax}, ${columnIndex} - ${columnIndexMax})`);
    let checkCount = 0;

    for(; rowIndex <= rowIndexMax; rowIndex++){
      for(; columnIndex <= columnIndexMax; columnIndex++){
        checkCount++;
        // make sure not to count the cell itself in the live neightbor count
        if(cell.row != rowIndex || cell.column != columnIndex) {
          this.grid[rowIndex][columnIndex].isBeingChecked = true;
          if(this.grid[rowIndex][columnIndex].wasAlive) {
            liveNeighborCount++;
          }
          // this.outputCellBeingCheckedGrid();
          this.grid[rowIndex][columnIndex].isBeingChecked = false;
        }
      }
      //must reset the columnIndex each iteration
      columnIndex = (cell.column - 1 < 0) ? 0 : cell.column - 1;
    }

    // console.log(`${cell.row}, ${cell.column} - ${liveNeighborCount} - ${checkCount}`);

    cell.setLiveNeighborCount(liveNeighborCount);
    cell.isActive = false;

    return cell;
  }


}

module.exports = ConwayGameOfLife;
