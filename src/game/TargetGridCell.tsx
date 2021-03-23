import { observer } from 'mobx-react';
import React from 'react';
import { Button } from '../common/Button';

import { Attack } from './GameState';

interface TGCProps {
  attack: Attack;
  selected: boolean;
  onSelect: () => void;
}

@observer
export class TargetGridCell extends React.PureComponent<TGCProps> {
  public render() {
    console.log('tgc render');
    const { attack, selected, onSelect } = this.props;

    const selectedClass = selected ? 'selected' : '';
    const classes = ['target-cell', attack, selectedClass];

    return (
      <div className={classes.join(' ')} onClick={() => onSelect()}>
        {selected && <Button enabled text={'FIRE'} onClick={onSelect} />}
      </div>
    );
  }
}
