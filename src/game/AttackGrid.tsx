import { observer } from 'mobx-react';
import React from 'react';

import { TargetCell } from '../game-setup/GridData';

import './target-grid.scss';

interface AGProps {
  attacks: TargetCell[][];
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
      row.forEach((targetCell, j) => {
        cells.push(<div key={`ac-${i}${j}`} className={'target-cell ' + targetCell.attack}></div>);
      });
    });

    return cells;
  }
}
