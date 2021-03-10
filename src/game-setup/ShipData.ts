import { Ship, ShipName, ShipType, ShipUtils } from './ShipUtils';

const ship1: Ship = {
  id: '1',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.ARROWHEAD,
  width: 1,
  height: 1,
  gridPos: {
    x: 0,
    y: 0,
  },
};

const ship2: Ship = {
  id: '2',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.VICE,
  width: 1,
  height: 1,
  gridPos: {
    x: 3,
    y: 3,
  },
};

const ship3: Ship = {
  id: '3',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.CLAW,
  width: 1,
  height: 1,
  gridPos: {
    x: 6,
    y: 6,
  },
};

const ship4: Ship = {
  id: '4',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.RAY,
  width: 1,
  height: 1,
  gridPos: {
    x: 9,
    y: 9,
  },
};

const ship5: Ship = {
  id: '5',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.STUB,
  width: 1,
  height: 1,
  gridPos: {
    x: 0,
    y: 9,
  },
};

const ship6: Ship = {
  id: '6',
  type: ShipType.TWO_BY_ONE,
  name: ShipName.LONG_TAIL,
  width: 2,
  height: 1,
  gridPos: {
    x: 5,
    y: 2,
  },
};

const ship7: Ship = {
  id: '7',
  type: ShipType.TWO_BY_ONE,
  name: ShipName.SATELLITE,
  width: 2,
  height: 1,
  gridPos: {
    x: 1,
    y: 6,
  },
};

export const ships = [ship1, ship2, ship3, ship4, ship5, ship6, ship7];
