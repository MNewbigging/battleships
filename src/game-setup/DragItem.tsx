import React from 'react';
import { useDrag } from 'react-dnd-cjs';
import { Ship } from './ShipUtils';

import './drag-item.scss';

interface DragItemProps {
  ship: Ship;
  onDragEnd: () => void;
  onSelect: () => void;
  selected: boolean;
}

export const DragItem: React.FC<DragItemProps> = ({ ship, onDragEnd, onSelect, selected }) => {
  const [{ isDragging }, drag] = useDrag({
    item: ship,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, _monitor) => {
      onDragEnd();
    },
  });

  const style = {
    width: `${ship.width * 49}px`,
    height: `${ship.height * 49}px`,
  };

  const dragClass = isDragging ? 'dragging' : '';
  const selectClass = selected ? 'selected' : '';

  const classes: string[] = ['drag-item', dragClass, selectClass, ship.name];

  return <div className={classes.join(' ')} ref={drag} style={style} onClick={onSelect}></div>;
};
