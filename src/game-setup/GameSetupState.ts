import { action, observable } from 'mobx';

import { Grid, GridPos } from './GridData';
import { ships } from './ShipData';
import { Ship, ShipArea, ShipOrientation, ShipUtils } from './ShipUtils';

export class GameSetupState {
  public grid: Grid;
  @observable public ships: Ship[];

  @observable selectedShip?: Ship;

  private hoverShip?: Ship;
  private hoverPos?: GridPos;
  private canHoverBeDropped = false;

  constructor(gridSize: number) {
    this.grid = new Grid(gridSize);
    this.ships = ships;
    // Place ships randomly to begin with; user can move them around after
    this.ships.forEach((ship) => {
      this.grid.dropOnCell(ship.gridPos, ship);
    });
  }

  @action public selectShip(ship: Ship) {
    this.selectedShip = ship;
  }

  public shouldEnableRotateButton() {
    return this.selectedShip !== undefined;
  }

  @action public rotateShip() {
    if (!this.selectedShip) {
      return;
    }

    this.grid.rotateShip(this.selectedShip);
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
    this.grid.clearCellsHighlight();
  }

  public onDrop() {
    // Already set ship drop details on hover
    if (this.canHoverBeDropped) {
      this.grid.dropOnCell(this.hoverPos, this.hoverShip);
    }

    // Clear hover props
    this.hoverShip = undefined;
    this.hoverPos = undefined;
    this.canHoverBeDropped = false;
  }

  private canDrop(ship: Ship, gridPos: GridPos) {
    // Clear any previous cell highlighting
    this.grid.clearCellsHighlight();

    // Get list of positions to check
    const shipArea: ShipArea = ShipUtils.getShipArea(ship, gridPos);

    // Check cell contents and highlight them against this ship's positions
    return this.grid.canDropShip(shipArea, ship.id);
  }
}
