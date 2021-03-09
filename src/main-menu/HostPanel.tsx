import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState, MenuScreen } from '../BattleshipsState';
import { Button } from '../common/Button';

interface HostProps {
  bsState: BattleshipsState;
}

@observer
export class HostPanel extends React.PureComponent<HostProps> {
  public render() {
    const { bsState } = this.props;
    return (
      <>
        <Button text={'BACK'} onClick={() => bsState.setMenuScreen(MenuScreen.MAIN)} />
        <div>copy link / host id</div>
        <div>waiting for player to join</div>
      </>
    );
  }
}
