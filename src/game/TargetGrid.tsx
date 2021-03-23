import { observer } from 'mobx-react';
import React from 'react';

import { Attack } from './GameState';

import './target-grid.scss';
import { TargetGridCell } from './TargetGridCell';

interface TGProps {
  attacks: Attack[][];
  active: boolean;
  onSelectCell?: (x: number, y: number) => void;
}

@observer
export class TargetGrid extends React.PureComponent<TGProps> {
  public render() {
    console.log('target grid render, active: ', this.props.active);

    const activeClass = this.props.active ? 'active' : '';

    return <div className={'target-grid ' + activeClass}>{this.renderGrid()}</div>;
  }

  private renderGrid() {
    const { attacks, onSelectCell } = this.props;
    const cells: JSX.Element[] = [];

    attacks.forEach((row, i) => {
      row.forEach((attack, j) => {
        cells.push(
          <TargetGridCell key={`tc-${i}${j}`} attack={attack} onSelect={() => onSelectCell(i, j)} />
        );
      });
    });

    return cells;
  }
}
