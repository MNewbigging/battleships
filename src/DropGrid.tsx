import { observer } from 'mobx-react';
import React from 'react';
import { DropArea } from './DropArea';

import './drop-grid.scss';
import { AppState, GridPos, Ship } from './AppState';
import { DragItem } from './DragItem';

interface DGProps {
  gState: AppState;
}

@observer
export class DropGrid extends React.PureComponent<DGProps> {
  public render() {
    const { gState } = this.props;

    const gridCells: JSX.Element[] = [];
    gState.yourGrid.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        // Is this cell taken?

        gridCells.push(
          <DropArea
            key={`cell_${i}${j}`}
            onHover={(ship: Ship, gridPos: GridPos) => gState.onHoverDropTarget(ship, gridPos)}
            onDrop={() => gState.onDrop()}
            cell={cell}
            children={
              cell.content === '1' ? (
                <DragItem ship={cell.ship} onDragEnd={() => gState.onDragEnd()} />
              ) : (
                <div></div>
              )
            }
          />
        );
      });
    });

    return <div className={'drop-grid'}>{gridCells}</div>;
  }
}
