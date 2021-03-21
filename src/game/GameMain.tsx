import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from './GameState';
import { ShipItem } from './ShipItem';
import { TargetGrid } from './TargetGrid';

import './game.scss';

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
          <div className={'status-box'}></div>
        </div>
        <div className={'grid-areas'}>
          <div className={'grid-container'}>
            {`${gState.yourName} has 12/12 ships`}
            <div className={'ship-grid'}>
              {this.renderShipLayoutGrid()}
              {this.renderEnemyTargetGrid()}
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
          <div className={'layout-cell'}>
            {cell.ship ? <ShipItem key={`slg-${i}${j}`} ship={cell.ship} /> : <div></div>}
          </div>
        );
      });
    });

    return cells;
  }

  private renderEnemyTargetGrid() {
    return <TargetGrid attacks={this.props.gState.otherPlayerAttacks} />;
  }

  private renderYourTargetGrid() {
    return <TargetGrid attacks={this.props.gState.yourAttacks} />;
  }
}
