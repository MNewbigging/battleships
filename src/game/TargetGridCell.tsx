import { observer } from 'mobx-react';
import React from 'react';

import { Attack } from './GameState';

interface TGCProps {
  attack: Attack;
  onSelect: () => void;
}

@observer
export class TargetGridCell extends React.PureComponent<TGCProps> {
  public render() {
    console.log('tgc render');
    const { attack, onSelect } = this.props;

    return <div className={'target-cell ' + attack} onClick={() => onSelect()}></div>;
  }
}
