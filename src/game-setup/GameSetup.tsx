import { observer } from 'mobx-react';
import React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

import { Button } from '../common/Button';
import { DragItem } from './DragItem';
import { DropArea } from './DropArea';
import { GameSetupState } from './GameSetupState';
import { Cell, GridPos, GRID_SIZE } from './GridData';
import { Ship } from './ShipUtils';

import './game-setup.scss';

interface SetupProps {
  onReady: (grid: Cell[][]) => void; // will need to pass grid data
}

@observer
export class GameSetup extends React.PureComponent<SetupProps> {
  private readonly setupState = new GameSetupState(GRID_SIZE);

  public render() {
    const { onReady } = this.props;

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={'game-setup'}>
          <div className={'button-panel'}>
            <Button
              enabled={this.setupState.readyBtnActive}
              text={this.setupState.readyBtnText}
              onClick={() => {
                this.setupState.readyUp();
                onReady(this.setupState.grid.cells);
              }}
            />
            <Button
              enabled={this.setupState.shouldEnableRotateButton()}
              text={'ROTATE'}
              onClick={() => this.setupState.rotateShip()}
            />
          </div>
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
                <DragItem
                  ship={cell.ship}
                  onDragEnd={() => this.setupState.onDragEnd()}
                  onSelect={() => this.setupState.selectShip(cell.ship)}
                  selected={cell.ship.id === this.setupState.selectedShip?.id}
                />
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
