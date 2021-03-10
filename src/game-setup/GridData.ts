// tslint:disable: max-classes-per-file

import { action, observable } from 'mobx';
import { Ship, ShipArea, ShipUtils } from './ShipUtils';

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
      // Discounts out of bounds cells
      if (!cell) {
        continue;
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
    // Get old cell and remove its ship
    const oldCell = this.getCell(ship.gridPos);
    oldCell.ship = undefined;

    // Get footprint of ship and remove content
    const oldFootprint: GridPos[] = ShipUtils.getShipFootprint(ship, ship.gridPos);
    oldFootprint.forEach((gp) => {
      const cell = this.getCell(gp);
      if (cell) {
        cell.content = '';
      }
    });

    // Get new cell and update to have this ship
    const cell = this.getCell(gridPos);
    ship.gridPos = gridPos;
    cell.ship = ship;

    // Then update rest of footprint contents
    const newFootprint: GridPos[] = ShipUtils.getShipFootprint(ship, gridPos);
    newFootprint.forEach((gp) => {
      const cell = this.getCell(gp);
      if (cell) {
        cell.content = ship.id;
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
