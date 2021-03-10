import { Ship, ShipName, ShipOrientation, ShipType, ShipUtils } from './ShipUtils';

const ship1: Ship = {
  id: '1',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.ARROWHEAD,
  facing: ShipOrientation.DOWN,
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
  facing: ShipOrientation.DOWN,
  width: 1,
  height: 1,
  gridPos: {
    x: 2,
    y: 0,
  },
};

const ship3: Ship = {
  id: '3',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.CLAW,
  facing: ShipOrientation.DOWN,
  width: 1,
  height: 1,
  gridPos: {
    x: 0,
    y: 2,
  },
};

const ship4: Ship = {
  id: '4',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.RAY,
  facing: ShipOrientation.DOWN,
  width: 1,
  height: 1,
  gridPos: {
    x: 2,
    y: 2,
  },
};

const ship5: Ship = {
  id: '5',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.STUB,
  facing: ShipOrientation.DOWN,
  width: 1,
  height: 1,
  gridPos: {
    x: 0,
    y: 4,
  },
};

const ship6: Ship = {
  id: '6',
  type: ShipType.TWO_BY_ONE,
  name: ShipName.LONG_TAIL,
  facing: ShipOrientation.RIGHT,
  width: 2,
  height: 1,
  gridPos: {
    x: 4,
    y: 2,
  },
};

const ship7: Ship = {
  id: '7',
  type: ShipType.TWO_BY_ONE,
  name: ShipName.SATELLITE,
  facing: ShipOrientation.UP,
  width: 2,
  height: 1,
  gridPos: {
    x: 4,
    y: 0,
  },
};

const ship8: Ship = {
  id: '8',
  type: ShipType.THREE_BY_ONE,
  name: ShipName.SLIM_ROCKET_3,
  facing: ShipOrientation.RIGHT,
  width: 3,
  height: 1,
  gridPos: {
    x: 4,
    y: 4,
  },
};

const ship9: Ship = {
  id: '9',
  type: ShipType.THREE_BY_ONE,
  name: ShipName.FAT_ROCKET_3,
  facing: ShipOrientation.RIGHT,
  width: 3,
  height: 1,
  gridPos: {
    x: 4,
    y: 6,
  },
};

const ship10: Ship = {
  id: '10',
  type: ShipType.FOUR_BY_ONE,
  name: ShipName.SLIM_ROCKET_4,
  facing: ShipOrientation.RIGHT,
  width: 4,
  height: 1,
  gridPos: {
    x: 0,
    y: 8,
  },
};

const ship11: Ship = {
  id: '11',
  type: ShipType.FOUR_BY_ONE,
  name: ShipName.FAT_ROCKET_4,
  facing: ShipOrientation.RIGHT,
  width: 4,
  height: 1,
  gridPos: {
    x: 6,
    y: 8,
  },
};

const ship12: Ship = {
  id: '12',
  type: ShipType.TWO_BY_ONE,
  name: ShipName.SATELLITE2,
  facing: ShipOrientation.UP,
  width: 2,
  height: 1,
  gridPos: {
    x: 7,
    y: 0,
  },
};

export const ships = [
  ship1,
  ship2,
  ship3,
  ship4,
  ship5,
  ship6,
  ship7,
  ship8,
  ship9,
  ship10,
  ship11,
  ship12,
];
