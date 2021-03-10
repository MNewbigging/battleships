import { Ship, ShipName, ShipType, ShipUtils } from './ShipUtils';

const ship1: Ship = {
  id: '0',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.ARROWHEAD,
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 0,
    y: 0,
  },
};

const ship2: Ship = {
  id: '1',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.VICE,
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 3,
    y: 3,
  },
};

const ship3: Ship = {
  id: '2',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.CLAW,
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 6,
    y: 6,
  },
};

const ship4: Ship = {
  id: '3',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.RAY,
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 9,
    y: 9,
  },
};

const ship5: Ship = {
  id: '4',
  type: ShipType.ONE_BY_ONE,
  name: ShipName.STUB,
  width: ShipUtils.smallShipSize.width,
  height: ShipUtils.smallShipSize.height,
  gridPos: {
    x: 0,
    y: 9,
  },
};

export const ships = [ship1, ship2, ship3, ship4, ship5];
