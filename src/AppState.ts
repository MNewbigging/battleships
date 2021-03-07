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

  constructor() {
    const gridSize = 4;
    this.yourGrid = new Grid(gridSize);
  }

  @action public canDropOnGrid(_ship: Ship, gridPos: GridPos) {
    // Can this ship be placed here?
    const cell = this.yourGrid.getCell(gridPos);

    // Is this cell empty?
    if (cell.content === '0') {
      // Can drop into cell
      this.yourGrid.highlightCells([gridPos], CellHighlight.CAN_DROP);
      return;
    }

    if (cell.content === '1') {
      // Cannot drop into cell
      this.yourGrid.highlightCells([gridPos], CellHighlight.CANNOT_DROP);
      return;
    }
  }

  public onDragEnd() {
    // Clear any active highlights
    this.yourGrid.clearCellsHighlight();
  }
}
