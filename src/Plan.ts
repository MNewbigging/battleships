// tslint:disable: max-classes-per-file

import { action, observable } from 'mobx';
import { GridPos } from './AppState';
import { Ship } from './ShipUtils';

/**
 * Will need to have two of these; one for each player
 */
export class Grid {
  public gridSize: number;
  // A grid has a 2d array of the squares
  public cells: Cell[][] = [];

  constructor(size: number) {
    this.gridSize = size;
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

  getCell(gridPos: GridPos): Cell | undefined {
    // If position is out of lower bounds, no cell
    if (gridPos.x < 0 || gridPos.y < 0) {
      return undefined;
    }
    // If position is out of upper bounds, no cell
    if (gridPos.x >= this.gridSize || gridPos.y >= this.gridSize) {
      return undefined;
    }

    return this.cells[gridPos.y][gridPos.x];
  }

  isCellEmpty(gridPos: GridPos) {
    return this.getCell(gridPos).content === '';
  }

  areCellsEmpty(positions: GridPos[], shipId: string) {
    let empty = true;
    for (const pos of positions) {
      const cell = this.getCell(pos);
      // Discounts out of bounds cells
      if (!cell) {
        continue;
      }

      // If cell contains this ship, or nothing, can drop on it
      if (cell.content === '' || cell.content === shipId) {
        cell.highlight = CellHighlight.CAN_DROP;
      } else {
        cell.highlight = CellHighlight.CANNOT_DROP;
        empty = false;
      }
    }
    return empty;
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
    oldCell.content = '';
    oldCell.ship = undefined;
    // Get new cell and update to have this ship
    const cell = this.getCell(gridPos);
    cell.content = ship.id;
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
  @observable public content = '';
  @observable public highlight = CellHighlight.NONE;

  @observable public ship?: Ship;

  constructor(pos: GridPos) {
    this.gridPos = pos;
  }
}
