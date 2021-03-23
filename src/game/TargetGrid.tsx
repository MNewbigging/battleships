import { observer } from 'mobx-react';
import React from 'react';

import { GridPos } from '../game-setup/GridData';
import { ShipUtils } from '../game-setup/ShipUtils';
import { Attack } from './GameState';
import { TargetGridCell } from './TargetGridCell';

import './target-grid.scss';

interface TGProps {
  attacks: Attack[][];
  active: boolean;
  onSelectCell: (pos: GridPos) => void;
  selectedCell: GridPos;
}

@observer
export class TargetGrid extends React.PureComponent<TGProps> {
  public render() {
    console.log('target grid render, active: ', this.props.active);

    const activeClass = this.props.active ? 'active' : '';

    return <div className={'target-grid ' + activeClass}>{this.renderGrid()}</div>;
  }

  private renderGrid() {
    const { attacks, onSelectCell, selectedCell } = this.props;
    const cells: JSX.Element[] = [];

    attacks.forEach((row, i) => {
      row.forEach((attack, j) => {
        cells.push(
          <TargetGridCell
            key={`tc-${i}${j}`}
            attack={attack}
            onSelect={() => onSelectCell({ x: i, y: j })}
            selected={ShipUtils.areGridPositionsEqual({ x: i, y: j }, selectedCell)}
          />
        );
      });
    });

    return cells;
  }
}
