let Cell = require('../src/game/Cell.js')

describe("A Cell", () => {

  let goodCellConfig = {
    initialState: Cell.STATES.DEAD,
    row: 0,
    column: 0
  };

  let exampleCell = new Cell(goodCellConfig);

  it("should be defined after creating instance of Cell", () => {

    let cell = new Cell(goodCellConfig);

    expect(cell).toBeDefined();
  });

  it("should set default values properly", () => {

    let cell = new Cell();

    expect(cell.initialState).toBe(Cell.STATES.DEAD);
    expect(cell.row).toBe(0);
    expect(cell.column).toBe(0);
  });

  it("should set config values properly", () => {

    let cell = new Cell(goodCellConfig);

    expect(cell.initialState).toBe(Cell.STATES.DEAD);
    expect(cell.row).toBe(0);
    expect(cell.column).toBe(0);
  });

  it("should create an alive cell", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    expect(cell.initialState).toBe(Cell.STATES.ALIVE);
  });

  it("should die if alive with fewer than two neightbors", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    cell.setLiveNeighborCount(1);
    expect(cell.isAlive).toBe(false);

    cell.setLiveNeighborCount(0);
    expect(cell.isAlive).toBe(false);
  });

  it("should die if alive with more than three neightbors", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    cell.setLiveNeighborCount(4);
    expect(cell.isAlive).toBe(false);

    cell.setLiveNeighborCount(6);
    expect(cell.isAlive).toBe(false);
  });

  it("should stay alive if already alive with 2 - 3 neighbors", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    cell.setLiveNeighborCount(2);
    expect(cell.isAlive).toBe(true);

    cell.setLiveNeighborCount(3);
    expect(cell.isAlive).toBe(true);
  });

  it("should become alive after starting alive, then dying then gaining three live neighbors", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    cell.setLiveNeighborCount(1);
    expect(cell.isAlive).toBe(false);

    cell.setLiveNeighborCount(3);
    expect(cell.isAlive).toBe(true);
  });

  it("should stay dead", () => {

    let cell = new Cell({
      initialState: Cell.STATES.DEAD,
      row: 0,
      column: 0
    });

    expect(cell.wasAlive).toBe(false);

    cell.setLiveNeighborCount(2);
    expect(cell.wasAlive).toBe(false);
    expect(cell.isAlive).toBe(false);

    cell.setLiveNeighborCount(2);
    expect(cell.wasAlive).toBe(false);
    expect(cell.isAlive).toBe(false);

  });

  it("should be dead", () => {

    let cell = new Cell({
      initialState: Cell.STATES.ALIVE,
      row: 0,
      column: 0
    });

    cell.setLiveNeighborCount(1);
    expect(cell.wasAlive).toBe(true);
    expect(cell.isAlive).toBe(false);

    cell.setLiveNeighborCount(2);
    expect(cell.wasAlive).toBe(false);
    expect(cell.isAlive).toBe(false);

  });

});
