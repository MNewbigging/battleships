import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState, MenuScreen } from '../BattleshipsState';
import { Button } from '../common/Button';
import { TextInput } from '../common/TextInput';

interface HostProps {
  bsState: BattleshipsState;
}

@observer
export class HostPanel extends React.PureComponent<HostProps> {
  public render() {
    const { bsState } = this.props;
    return (
      <>
        <Button enabled text={'BACK'} onClick={() => bsState.setMenuScreen(MenuScreen.MAIN)} />
        <TextInput readonly value={bsState.hostId} />
        <Button enabled text={'Copy invite link'} onClick={() => bsState.copyInviteLink()} />
        <div>{bsState.joinerStatus}</div>
      </>
    );
  }
}
