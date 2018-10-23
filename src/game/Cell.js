class Cell {

  //set default values
  constructor({initialState = 0, row = 0, column = 0} = {}) {
    //set config values
    this.initialState = (initialState == null) ? 0 : initialState;
    this.row = (typeof row === "undefined") ? 0 : row;
    this.column = (typeof column === "undefined") ? 0 : column;

    this.liveNeighborCount = 0;

    this.isBeingChecked = false;
    this.isActive = false;

    this.postStepState = Cell.STATES.DEAD;
    this.setState(initialState);
    this.preStepState = this.postStepState;
  }

  //detirmines wether the cell lives or dies
  processVitalStatus() {

    if(this.preStepState == Cell.STATES.ALIVE) {
      if(this.liveNeighborCount < 2 || this.liveNeighborCount > 3) {
        this.setState(Cell.STATES.DEAD);
      } else {
        this.setState(Cell.STATES.ALIVE);
      }
    } else if(this.preStepState == Cell.STATES.DEAD) {
      if(this.liveNeighborCount == 3) {
        this.setState(Cell.STATES.ALIVE);
      }
    }

  }

  setState(givenState) {
    if(givenState !== Cell.STATES.DEAD && givenState !== Cell.STATES.ALIVE) {
      throw new Error(`Error: Given state "${givenState}" is invalid, setState method only accepts numeric values of 0 for dead or 1 for alive.`);
      return;
    }

    this.postStepState = givenState;
  }

  //sets the live neight count of the cell and then does processing on it
  setLiveNeighborCount(count) {
    this.liveNeighborCount = count;

    this.preStepState = this.postStepState;
    this.processVitalStatus();
  }

  //was the cell alive at the beggining of the step?
  get wasAlive() {
    if(this.preStepState == Cell.STATES.ALIVE) {
      return true;
    } else {
      return false;
    }
  }

  //is the cell currently alive?
  get isAlive() {
    if(this.postStepState == Cell.STATES.DEAD) {
      return false;
    } else {
      return true;
    }
  }

  //public static object returning possible states, an "enum" if you will
  static get STATES() {
    return {
      DEAD: 0,
      ALIVE: 1
    }
  }

}

module.exports = Cell;
