import React from 'react';

import { Ship } from '../game-setup/ShipUtils';

import '../game-setup/drag-item.scss';

interface ShipProps {
  ship: Ship;
}

export const ShipItem: React.FC<ShipProps> = ({ ship }) => {
  const style = {
    width: `${ship.width * 50 - 2}px`,
    height: `${ship.height * 50 - 2}px`,
  };

  const classes = ['drag-item', ship.name, ship.facing];

  return <div className={classes.join(' ')} style={style}></div>;
};
