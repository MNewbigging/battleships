import { GridPos } from './AppState';

export enum ShipType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ShipSize {
  width: number;
  height: number;
}

export interface Ship {
  id: string;
  type: string;
  width: number;
  height: number;
  gridPos: GridPos;
}

export class ShipUtils {
  public static smallShipSize: ShipSize = {
    width: 1,
    height: 1,
  };

  public static getSmallShipArea(startPos: GridPos) {
    const cells: GridPos[] = [];
    // Small ships take up 1x1 cells, so boundary is 3x3
    for (
      let i = startPos.x - this.smallShipSize.width;
      i <= startPos.x + this.smallShipSize.width;
      i++
    ) {
      for (
        let j = startPos.y - this.smallShipSize.height;
        j <= startPos.y + this.smallShipSize.height;
        j++
      ) {
        cells.push({
          x: i,
          y: j,
        });
      }
    }

    return cells;
  }

  public static areGridPositionsEqual(posA: GridPos, posB: GridPos) {
    if (!posA || !posB) {
      return false;
    }

    return posA.x === posB.x && posA.y === posB.y;
  }
}
