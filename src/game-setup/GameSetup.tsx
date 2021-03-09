import { observer } from 'mobx-react';
import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

import { Button } from '../common/Button';
import { DragItem } from './DragItem';
import { DropArea } from './DropArea';
import { GameSetupState } from './GameSetupState';
import { GridPos } from './GridData';
import { Ship } from './ShipUtils';

import './game-setup.scss';

interface SetupProps {
  onReady: () => void; // will need to pass grid data
}

@observer
export class GameSetup extends React.PureComponent<SetupProps> {
  private readonly gridSize = 8;
  private readonly setupState = new GameSetupState(this.gridSize);

  public render() {
    const { onReady } = this.props;
    // TODO: render ready up button, onClick = onReady(gridDataFromState)
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={'game-setup'}>
          <Button enabled text={'READY'} onClick={() => onReady()} />
          {this.renderSetupGrid()}
        </div>
      </DndProvider>
    );
  }

  private renderSetupGrid() {
    const cells: JSX.Element[] = [];
    this.setupState.grid.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        cells.push(
          <DropArea
            key={`cell-${i}${j}`}
            onHover={(ship: Ship, gridPos: GridPos) => this.setupState.onHoverCell(ship, gridPos)}
            onDrop={() => this.setupState.onDrop()}
            cell={cell}
            children={
              cell.ship ? (
                <DragItem ship={cell.ship} onDragEnd={() => this.setupState.onDragEnd()} />
              ) : (
                <div></div>
              )
            }
          />
        );
      });
    });

    return <div className={'grid'}>{cells}</div>;
  }
}
