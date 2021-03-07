import React from 'react';
import { useDrag } from 'react-dnd-cjs';
import { Ship } from './AppState';
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
    width: `${ship.width * 100}px`,
    height: `${ship.height * 100}px`,
    border: '1px solid black',
  };

  return (
    <div className={'drag-item'} ref={drag} style={style}>
      drag me
    </div>
  );
};
