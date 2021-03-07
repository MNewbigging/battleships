// tslint:disable: max-classes-per-file

import { action, observable } from 'mobx';
import { GridPos, Ship } from './AppState';

/**
 * Will need to have two of these; one for each player
 */
export class Grid {
  // A grid has a 2d array of the squares
  public cells: Cell[][] = [];

  constructor(size: number) {
    // Create the squares for this game
    // Could affect game size by altering squares and ships count
    for (let i = 0; i < size; i++) {
      const col: Cell[] = [];
      for (let j = 0; j < size; j++) {
        col.push(new Cell({ x: j, y: i }));
      }
      this.cells.push(col);
    }
  }

  getCell(gridPos: GridPos) {
    return this.cells[gridPos.y][gridPos.x];
  }

  isCellEmpty(gridPos: GridPos) {
    return this.getCell(gridPos).content === '0';
  }

  areCellsEmpty(positions: GridPos[]) {
    for (const pos of positions) {
      if (!this.isCellEmpty(pos)) {
        return false;
      }
    }
    return true;
  }

  highlightCells(positions: GridPos[], highlight: CellHighlight) {
    this.cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        // Does this cell appear in positions array?
        if (positions.some((pos) => pos.x === x && pos.y === y)) {
          cell.highlight = highlight;
        } else {
          cell.highlight = CellHighlight.NONE;
        }
      });
    });
  }

  clearCellsHighlight() {
    this.cells.forEach((row) => {
      row.forEach((cell) => (cell.highlight = CellHighlight.NONE));
    });
  }

  /**
   *
   * @param gridPos the new position for the ship
   * @param ship the ship being moved
   */
  @action dropOnCell(gridPos: GridPos, ship: Ship) {
    // Get old cell and remove its ship
    const oldCell = this.getCell(ship.gridPos);
    oldCell.content = '0';
    oldCell.ship = undefined;
    // Get new cell and update to have this ship
    const cell = this.getCell(gridPos);
    cell.content = '1';
    cell.ship = ship;
    ship.gridPos = gridPos;
  }
}

/**
 * A single square on the grid. Shows what's on that square.
 */
enum Attack {
  HIT,
  MISS,
}

/**
 * Will have a component for a square, which looks at this class.
 * It will be styled according to its properties below.
 */
export enum CellHighlight {
  NONE = 'none',
  CAN_DROP = 'can-drop',
  CANNOT_DROP = 'cannot-drop',
}

export class Cell {
  // An attack may not have occurred on this square
  // If it has, it can either be a hit or a miss
  public gridPos: GridPos;
  @observable public attack?: Attack;
  @observable public content: string;
  @observable public highlight = CellHighlight.NONE;

  @observable public ship?: Ship;

  constructor(pos: GridPos) {
    this.gridPos = pos;
    this.content = '0';
  }
}
