import { observer } from 'mobx-react';
import React from 'react';

import { Button } from '../common/Button';
import { TargetCell } from '../game-setup/GridData';

interface TGCProps {
  targetCell: TargetCell;
  onSelect: () => void;
}

@observer
export class TargetGridCell extends React.PureComponent<TGCProps> {
  public render() {
    console.log('tgc render');
    const { targetCell, onSelect } = this.props;

    const selectedClass = targetCell.selected ? 'selected' : '';
    const classes = ['target-cell', targetCell.attack, selectedClass];

    return (
      <div className={classes.join(' ')} onClick={() => onSelect()}>
        {targetCell.selected && <Button enabled text={'FIRE'} onClick={onSelect} />}
      </div>
    );
  }
}
