import React from 'react';
import { Attack } from './GameState';

import './target-grid.scss';

interface TGProps {
  attacks: Attack[][];
}

export class TargetGrid extends React.PureComponent<TGProps> {
  public render() {
    return <div className={'target-grid'}>{this.renderGrid()}</div>;
  }

  private renderGrid() {
    const { attacks } = this.props;
    const cells: JSX.Element[] = [];

    attacks.forEach((row, i) => {
      row.forEach((attack, j) => {
        cells.push(<div key={`tc-${i}${j}`} className={'target-cell ' + attack}></div>);
      });
    });

    return cells;
  }
}
