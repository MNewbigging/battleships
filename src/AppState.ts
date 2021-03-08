import { action, observable } from 'mobx';
import { CellHighlight, Grid } from './Plan';
import { Ship, ShipUtils } from './ShipUtils';

export interface GridPos {
  x: number;
  y: number;
}

const ship1: Ship = {
  id: '0',
  type: 'ship',
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 0,
    y: 0,
  },
};

const ship2: Ship = {
  id: '1',
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

  @action public onHoverCell(ship: Ship, gridPos: GridPos) {
    // Only run hover logic once per cell hovered over
    const equal = ShipUtils.areGridPositionsEqual(this.hoverPos, gridPos);
    if (!equal) {
      this.hoverShip = ship;
      this.hoverPos = gridPos;
      this.canHoverBeDropped = this.canDrop(ship, gridPos);
    }
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

    // Clear hover props
    this.hoverShip = undefined;
    this.hoverPos = undefined;
    this.canHoverBeDropped = false;
  }

  private canDrop(ship: Ship, gridPos: GridPos) {
    // Clear any previous cell highlighting
    this.yourGrid.clearCellsHighlight();

    // Get list of positions to check
    const cellsToCheck: GridPos[] = ShipUtils.getSmallShipArea(gridPos);

    // Check cell contents and highlight them against this ship's positions
    return this.yourGrid.areCellsEmpty(cellsToCheck, ship.id);
  }
}
