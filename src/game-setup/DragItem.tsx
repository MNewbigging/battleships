import { observer } from 'mobx-react';
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

export const DragItem: React.FC<DragItemProps> = observer(
  ({ ship, onDragEnd, onSelect, selected }) => {
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
      width: `${ship.width * 50 - 1}px`,
      height: `${ship.height * 50 - 1}px`,
    };

    const dragClass = isDragging ? 'dragging' : '';
    const selectClass = selected ? 'selected' : '';

    const outerClasses: string[] = ['drag-item', dragClass, selectClass, ship.name, ship.facing];

    return (
      <div className={outerClasses.join(' ')} ref={drag} style={style} onClick={onSelect}></div>
    );
  }
);
