import { action, observable } from 'mobx';
import { CellHighlight, Grid } from './Plan';

export interface GridPos {
  x: number;
  y: number;
}

export interface Ship {
  type: string;
  width: number;
  height: number;
  gridPos: GridPos;
}

const ship1: Ship = {
  type: 'ship',
  width: 2,
  height: 1,
  gridPos: {
    x: 0,
    y: 0,
  },
};

const ship2: Ship = {
  type: 'ship',
  width: 1,
  height: 1,
  gridPos: {
    x: 3,
    y: 3,
  },
};

// Could I use accept on drop target to disallow certain ships?...
// const ship2: Ship = {
//   type: 'ship',
//   width: 2,
//   height: 1,
// };

export class AppState {
  @observable yourGrid: Grid;
  public ships: Ship[];

  private hoverShip?: Ship;
  private hoverPos?: GridPos;

  constructor() {
    const gridSize = 5;
    this.yourGrid = new Grid(gridSize);
    this.ships = [ship1, ship2];
    // Place ships randomly to begin with; user can move them around after
    this.ships.forEach((ship) => {
      this.yourGrid.dropOnCell(ship.gridPos, ship);
    });
  }

  @action public onHoverDropTarget(ship: Ship, gridPos: GridPos) {
    this.hoverShip = ship;
    this.hoverPos = gridPos;
    if (this.canDrop(gridPos)) {
      this.yourGrid.highlightCells([gridPos], CellHighlight.CAN_DROP);
    } else {
      this.yourGrid.highlightCells([gridPos], CellHighlight.CANNOT_DROP);
    }
  }

  public onDragEnd() {
    // Clear any active highlights
    this.yourGrid.clearCellsHighlight();
  }

  public onDrop() {
    console.log('successful drop');
    // Have already set the ship and pos from hover
    // Set cell content to taken
    if (this.canDrop(this.hoverPos)) {
      this.yourGrid.dropOnCell(this.hoverPos, this.hoverShip);
    }
  }

  private canDrop(gridPos: GridPos) {
    return this.yourGrid.isCellEmpty(gridPos);

    // Are the cells this ship takes up free?
    // Count width to the right
    // Count height downwards
    // Therefore start/head of ship is always top-left point

    // What about neighbouring cells?
  }
}
