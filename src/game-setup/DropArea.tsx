import { observer } from 'mobx-react';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd-cjs';

import { Cell, GridPos } from './GridData';
import { Ship, ShipType } from './ShipUtils';

interface DAProps {
  onHover: (ship: Ship, gridPos: GridPos) => void;
  onDrop: () => void;
  cell: Cell;
}

export const DropArea: React.FC<DAProps> = observer(({ children, onHover, onDrop, cell }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [ShipType.ONE_BY_ONE],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: Ship, _monitor: DropTargetMonitor) => {
      onHover(item, cell.gridPos);
    },
    drop: (_item: Ship, _monitor: DropTargetMonitor) => {
      onDrop();
    },
  });

  return (
    <div ref={drop} className={'drop-area ' + cell.highlight}>
      {children}
    </div>
  );
});
