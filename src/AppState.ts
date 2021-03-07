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
  gridPos?: GridPos;
}

export class AppState {
  @observable yourGrid: Grid;

  private dropShip?: Ship;
  private dropPos?: GridPos;

  constructor() {
    const gridSize = 4;
    this.yourGrid = new Grid(gridSize);
  }

  @action public onHoverDropTarget(ship: Ship, gridPos: GridPos) {
    if (this.canDrop(gridPos)) {
      this.dropShip = ship;
      this.dropPos = gridPos;
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
    this.yourGrid.dropOnCell(this.dropPos);
  }

  private canDrop(gridPos: GridPos) {
    // Can this ship be placed here?
    return this.yourGrid.isCellEmpty(gridPos);
  }
}
