import { observer } from 'mobx-react';
import React from 'react';

import { GridPos, TargetCell } from '../game-setup/GridData';
import { ShipUtils } from '../game-setup/ShipUtils';
import { Attack } from './GameState';
import { TargetGridCell } from './TargetGridCell';

import './target-grid.scss';

interface TGProps {
  targetCells: TargetCell[][];
  active: boolean;
  onSelectCell: (pos: GridPos) => void;
}

@observer
export class TargetGrid extends React.PureComponent<TGProps> {
  public render() {
    console.log('target grid render, active: ', this.props.active);

    const activeClass = this.props.active ? 'active' : '';

    return <div className={'target-grid ' + activeClass}>{this.renderGrid()}</div>;
  }

  private renderGrid() {
    const { targetCells, onSelectCell } = this.props;
    const cells: JSX.Element[] = [];

    targetCells.forEach((row, i) => {
      row.forEach((targetCell, j) => {
        cells.push(
          <TargetGridCell
            key={`tc-${i}${j}`}
            targetCell={targetCell}
            onSelect={() => onSelectCell({ x: i, y: j })}
          />
        );
      });
    });

    return cells;
  }
}
