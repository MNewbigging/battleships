import { observer } from 'mobx-react';
import React from 'react';

import { Button } from '../common/Button';
import { AttackGrid } from './AttackGrid';
import { GameState, Turn } from './GameState';
import { ShipItem } from './ShipItem';
import { TargetGrid } from './TargetGrid';

import './game.scss';
import { GridPos } from '../game-setup/GridData';

interface GameProps {
  gState: GameState;
}

@observer
export class GameMain extends React.PureComponent<GameProps> {
  public render() {
    const { gState } = this.props;
    return (
      <div className={'game'}>
        <div className={'top-bar'}>
          <div className={'status-box'}>{gState.gameStatus}</div>
        </div>
        <div className={'grid-areas'}>
          <div className={'grid-container'}>
            {`${gState.yourName} has 12/12 ships`}
            <div className={'ship-grid'}>
              {this.renderShipLayoutGrid()}
              {this.renderEnemyAttackGrid()}
            </div>
          </div>
          <div className={'grid-container'}>
            {`${gState.otherPlayerName} has 12/12 ships`}
            <div className={'ship-grid'}>{this.renderYourTargetGrid()}</div>
          </div>
        </div>
      </div>
    );
  }

  private renderShipLayoutGrid() {
    const { gState } = this.props;
    const cells: JSX.Element[] = [];

    gState.yourGrid.forEach((row, i) => {
      row.forEach((cell, j) => {
        cells.push(
          <div key={`slg-${i}${j}`} className={'layout-cell'}>
            {cell.ship ? <ShipItem ship={cell.ship} /> : <div></div>}
          </div>
        );
      });
    });

    return cells;
  }

  private renderEnemyAttackGrid() {
    return <AttackGrid attacks={this.props.gState.otherPlayerAttacks} />;
  }

  private renderYourTargetGrid() {
    const { gState } = this.props;
    return (
      <TargetGrid
        active={gState.turn === Turn.YOUR_TURN}
        attacks={this.props.gState.yourAttacks}
        onSelectCell={(pos: GridPos) => gState.selectAttackCell(pos)}
        selectedCell={gState.attackTarget}
      />
    );
  }
}
