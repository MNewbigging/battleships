import { action, observable } from 'mobx';
import { CellHighlight, Grid } from './Plan';
import { ShipUtils } from './ShipUtils';

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
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 0,
    y: 0,
  },
};

const ship2: Ship = {
  type: 'ship',
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 3,
    y: 3,
  },
};

export class AppState {
  @observable yourGrid: Grid;
  public ships: Ship[];

  private hoverShip?: Ship;
  private hoverPos?: GridPos;
  private canHoverBeDropped = false;

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
    this.canHoverBeDropped = this.canDrop(ship, gridPos);
  }

  public onDragEnd() {
    // Clear any active highlights
    this.yourGrid.clearCellsHighlight();
  }

  public onDrop() {
    // Already set ship drop details on hover
    if (this.canHoverBeDropped) {
      this.yourGrid.dropOnCell(this.hoverPos, this.hoverShip);
    }
  }

  private canDrop(ship: Ship, gridPos: GridPos) {
    // Clear any previous cell highlighting
    this.yourGrid.clearCellsHighlight();

    // Get list of positions to check, start with hover pos
    const cellsToCheck: GridPos[] = ShipUtils.getSmallShipArea(gridPos);

    // What about neighbouring cells?

    return this.yourGrid.areCellsEmpty(cellsToCheck);
  }
}
