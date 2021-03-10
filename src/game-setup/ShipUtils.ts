import { GridPos } from './GridData';

export enum ShipType {
  ONE_BY_ONE = 'one-by-one',
  TWO_BY_ONE = 'two-by-one',
  THREE_BY_ONE = 'three-by-one',
  FOUR_BY_ONE = 'four-by-one',
  TWO_BY_TWO = 'two-by-two',
}

export enum ShipName {
  ARROWHEAD = 'arrowhead',
  VICE = 'vice',
  CLAW = 'claw',
  STUB = 'stub',
  RAY = 'ray',
  LONG_TAIL = 'long-tail',
  SATELLITE = 'satellite',
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
  type: ShipType;
  name: string;
  width: number;
  height: number;
  gridPos: GridPos;
}

export class ShipUtils {
  public static getShipArea(ship: Ship, startPos: GridPos): ShipArea {
    switch (ship.type) {
      case ShipType.ONE_BY_ONE:
        return this.getOneByOneArea(startPos);
      case ShipType.TWO_BY_ONE:
        return this.getTwoByOneArea(startPos);
    }
  }

  public static getOneByOneArea(startPos: GridPos): ShipArea {
    const footprint: GridPos[] = [];
    const boundary: GridPos[] = [];

    // Footprint for 1x1 ship is the start pos
    footprint.push(startPos);

    // Small ships take up 1x1 cells, so boundary is 3x3
    for (let i = startPos.x - 1; i <= startPos.x + 1; i++) {
      for (let j = startPos.y - 1; j <= startPos.y + 1; j++) {
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

  public static getTwoByOneArea(startPos: GridPos): ShipArea {
    const footprint: GridPos[] = [];
    const boundary: GridPos[] = [];

    // Footprint is start pos, then plus 1 on x
    footprint.push(startPos);
    footprint.push({ x: startPos.x + 1, y: startPos.y });

    // Boundary is 4x3
    for (let i = startPos.x - 1; i <= startPos.x + 2; i++) {
      for (let j = startPos.y - 1; j <= startPos.y + 1; j++) {
        // Current position
        const thisPos: GridPos = {
          x: i,
          y: j,
        };
        if (!footprint.some((pos) => this.areGridPositionsEqual(pos, thisPos))) {
          boundary.push(thisPos);
        }
      }
    }

    return { footprint, boundary };
  }

  public static getShipFootprint(ship: Ship, startPos: GridPos) {
    const footprint: GridPos[] = [startPos];
    switch (ship.type) {
      case ShipType.ONE_BY_ONE:
        return footprint;
      case ShipType.TWO_BY_ONE:
        footprint.push({ x: startPos.x + 1, y: startPos.y });
        return footprint;
    }
  }

  public static areGridPositionsEqual(posA: GridPos, posB: GridPos) {
    if (!posA || !posB) {
      return false;
    }

    return posA.x === posB.x && posA.y === posB.y;
  }
}
