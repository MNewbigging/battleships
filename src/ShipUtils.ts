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

export interface ShipArea {
  footprint: GridPos[];
  boundary: GridPos[];
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

  public static getSmallShipArea(startPos: GridPos): ShipArea {
    const footprint: GridPos[] = [];
    const boundary: GridPos[] = [];

    // Footprint for 1x1 ship is the start pos
    footprint.push(startPos);

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
        // Current position
        const thisPos: GridPos = {
          x: i,
          y: j,
        };
        // Don't include any positions already in footprint
        if (!footprint.some((pos) => this.areGridPositionsEqual(pos, thisPos))) {
          boundary.push(thisPos);
        }
      }
    }

    return { footprint, boundary };
  }

  public static areGridPositionsEqual(posA: GridPos, posB: GridPos) {
    if (!posA || !posB) {
      return false;
    }

    return posA.x === posB.x && posA.y === posB.y;
  }
}
