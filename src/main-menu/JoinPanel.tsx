import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState, MenuScreen } from '../BattleshipsState';
import { Button } from '../common/Button';
import { TextInput } from '../common/TextInput';

interface JoinProps {
  bsState: BattleshipsState;
}
@observer
export class JoinPanel extends React.PureComponent<JoinProps> {
  public render() {
    const { bsState } = this.props;
    return (
      <>
        <Button
          enabled={true}
          text={'BACK'}
          onClick={() => bsState.setMenuScreen(MenuScreen.MAIN)}
        />
        <TextInput
          placeholder={'NAME'}
          value={bsState.name}
          onChange={(name: string) => bsState.setName(name)}
        />
        <TextInput
          placeholder={'GAME ID'}
          value={bsState.joinId}
          onChange={(id: string) => bsState.setJoinId(id)}
        />
        <Button
          enabled={bsState.shouldEnableJoinButton()}
          text={'JOIN GAME'}
          onClick={() => bsState.joinGame()}
        />
        <div className={'status'}>{bsState.joinerStatus}</div>
      </>
    );
  }
}
