import { observer } from 'mobx-react';
import React from 'react';

import { Attack } from './GameState';

import './target-grid.scss';

interface AGProps {
  attacks: Attack[][];
}

@observer
export class AttackGrid extends React.PureComponent<AGProps> {
  public render() {
    return <div className={'target-grid'}>{this.renderGrid()}</div>;
  }

  private renderGrid() {
    const { attacks } = this.props;
    const cells: JSX.Element[] = [];

    attacks.forEach((row, i) => {
      row.forEach((attack, j) => {
        cells.push(<div key={`ac-${i}${j}`} className={'target-cell ' + attack}></div>);
      });
    });

    return cells;
  }
}
