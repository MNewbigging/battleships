import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState } from '../BattleshipsState';

interface MenuProps {
  bsState: BattleshipsState;
}

@observer
export class MainMenu extends React.PureComponent<MenuProps> {
  public render() {
    return <div className={'panel'}>menu, {this.props.bsState.joinId}</div>;
  }
}
