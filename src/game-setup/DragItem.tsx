import React from 'react';
import { useDrag } from 'react-dnd-cjs';
import { Ship } from './ShipUtils';

import './drag-item.scss';

interface DragItemProps {
  ship: Ship;
  onDragEnd: () => void;
}

export const DragItem: React.FC<DragItemProps> = ({ ship, onDragEnd }) => {
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
    width: `${ship.width * 50}px`,
    height: `${ship.height * 50}px`,
    border: '1px solid black',
  };

  const dragClass = isDragging ? 'dragging' : '';

  return (
    <div className={'drag-item ' + dragClass} ref={drag} style={style}>
      drag me
    </div>
  );
};
