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
  SATELLITE2 = 'satellite-yellow',
  SLIM_ROCKET_3 = 'slim-rocket3',
  FAT_ROCKET_3 = 'fat-rocket3',
  SLIM_ROCKET_4 = 'slim-rocket4',
  FAT_ROCKET_4 = 'fat-rocket4',
}

export enum ShipOrientation {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
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
  facing: ShipOrientation;
}

export class ShipUtils {
  public static getShipArea(ship: Ship, startPos: GridPos): ShipArea {
    const footprint = this.getShipFootprint(ship, startPos);
    const boundary = this.getShipBoundary(ship, startPos, footprint);

    return { footprint, boundary };
  }

  public static getShipBoundary(ship: Ship, startPos: GridPos, footprint: GridPos[]) {
    const boundary: GridPos[] = [];
    for (let i = startPos.x - 1; i <= startPos.x + ship.width; i++) {
      for (let j = startPos.y - 1; j <= startPos.y + ship.height; j++) {
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
    return boundary;
  }

  public static getShipFootprint(ship: Ship, startPos: GridPos) {
    const footprint: GridPos[] = [startPos];
    switch (ship.type) {
      case ShipType.ONE_BY_ONE:
        break;
      case ShipType.TWO_BY_ONE:
        footprint.push({ x: startPos.x + 1, y: startPos.y });
        break;
      case ShipType.THREE_BY_ONE:
        footprint.push({ x: startPos.x + 1, y: startPos.y });
        footprint.push({ x: startPos.x + 2, y: startPos.y });
        break;
      case ShipType.FOUR_BY_ONE:
        footprint.push({ x: startPos.x + 1, y: startPos.y });
        footprint.push({ x: startPos.x + 2, y: startPos.y });
        footprint.push({ x: startPos.x + 3, y: startPos.y });
        break;
    }
    return footprint;
  }

  public static areGridPositionsEqual(posA: GridPos, posB: GridPos) {
    if (!posA || !posB) {
      return false;
    }

    return posA.x === posB.x && posA.y === posB.y;
  }
}
