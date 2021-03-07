import { observer } from 'mobx-react';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd-cjs';
import { GridPos, Ship } from './AppState';

import './drop-area.scss';
import { Cell } from './Plan';

interface DAProps {
  onHover: (ship: Ship, gridPos: GridPos) => void;
  cell: Cell;
}

export const DropArea: React.FC<DAProps> = observer(({ onHover, cell }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'ship',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: Ship, _monitor: DropTargetMonitor) => {
      onHover(item, cell.gridPos);
    },
  });

  return (
    <div ref={drop} className={'drop-area ' + cell.highlight}>
      {cell.content}
    </div>
  );
});
