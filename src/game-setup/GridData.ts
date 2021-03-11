// tslint:disable: max-classes-per-file

import { action, observable } from 'mobx';
import { Ship, ShipArea, ShipOrientation, ShipUtils } from './ShipUtils';

export interface GridPos {
  x: number;
  y: number;
}

export class Grid {
  public gridSize: number;
  public cells: Cell[][] = [];

  constructor(size: number) {
    this.gridSize = size;

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

  canDropShip(shipArea: ShipArea, shipId: string) {
    let canDrop = true;

    // Check footprint first
    for (const pos of shipArea.footprint) {
      const cell = this.getCell(pos);
      // If a footprint is out of bounds, cannot drop
      if (!cell) {
        canDrop = false;
        return canDrop;
      }

      // This will check if cell is empty and highlight accordingly
      if (!this.isCellEmpty(cell, shipId, CellHighlight.SHIP_FOOTPRINT)) {
        canDrop = false;
      }
    }

    // Then check ship boundaries
    for (const pos of shipArea.boundary) {
      const cell = this.getCell(pos);
      if (!cell) {
        continue;
      }
      if (!this.isCellEmpty(cell, shipId, CellHighlight.CAN_DROP)) {
        canDrop = false;
      }
    }

    return canDrop;
  }

  isCellEmpty(cell: Cell, shipId: string, highlight: CellHighlight) {
    let empty = true;
    if (cell.content === '' || cell.content === shipId) {
      cell.highlight = highlight;
    } else {
      cell.highlight = CellHighlight.CANNOT_DROP;
      empty = false;
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
    // Remove ship from current cells
    this.removeShip(ship);

    // Add it to new cells
    this.addShip(ship, gridPos);
  }

  @action rotateShip(ship: Ship) {
    // First check if rotation is possible given space
    // Need a deep copy so we don't affect ship yet
    const fakeShip: Ship = {
      id: ship.id,
      type: ship.type,
      name: ship.name,
      width: ship.width,
      height: ship.height,
      gridPos: ship.gridPos,
      facing: ship.facing,
    };
    // Transpose width and height
    const tempW = fakeShip.width;
    fakeShip.width = fakeShip.height;
    fakeShip.height = tempW;
    // Get the new area for it to check
    const fakeShipArea = ShipUtils.getShipArea(fakeShip, fakeShip.gridPos);
    // Remove cell highlihting as a result of canDropShip
    setTimeout(() => this.clearCellsHighlight(), 800);
    if (!this.canDropShip(fakeShipArea, fakeShip.id)) {
      // Stop here if we can't rotate
      return;
    }

    // Remove ship from current cells
    this.removeShip(ship);

    // Rotate:
    // Transpose ship width and height
    const temp = ship.width;
    ship.width = ship.height;
    ship.height = temp;

    // Move one along in enum value
    const dirs = Array.from(Object.values(ShipOrientation));
    let cur = dirs.indexOf(ship.facing);
    cur++;
    if (cur === dirs.length) {
      cur = 0;
    }
    ship.facing = dirs[cur];

    // Drop on new cells
    this.addShip(ship, ship.gridPos);
  }

  @action private removeShip(ship: Ship) {
    // Get current cell and remove its ship
    const curCell = this.getCell(ship.gridPos);
    curCell.ship = undefined;

    // Get footprint of ship and remove content
    const footprint: GridPos[] = ShipUtils.getShipFootprint(ship, ship.gridPos);
    footprint.forEach((gp) => {
      const fpCell = this.getCell(gp);
      if (fpCell) {
        fpCell.content = '';
      }
    });
  }

  @action private addShip(ship: Ship, gridPos: GridPos) {
    // Get new cell and update to have this ship
    const cell = this.getCell(gridPos);
    ship.gridPos = gridPos;
    cell.ship = ship;

    // Then update rest of footprint contents
    const newFootprint: GridPos[] = ShipUtils.getShipFootprint(ship, gridPos);
    newFootprint.forEach((gp) => {
      const newCell = this.getCell(gp);
      if (newCell) {
        newCell.content = ship.id;
      }
    });
  }
}

export enum CellHighlight {
  NONE = 'none',
  CAN_DROP = 'can-drop',
  CANNOT_DROP = 'cannot-drop',
  SHIP_FOOTPRINT = 'ship-footprint',
}

export class Cell {
  public gridPos: GridPos;
  @observable public content = '';
  @observable public highlight = CellHighlight.NONE;

  @observable public ship?: Ship;

  constructor(pos: GridPos) {
    this.gridPos = pos;
  }
}
