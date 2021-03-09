import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState, MenuScreen } from '../BattleshipsState';
import { Button } from '../common/Button';
import { TextInput } from '../common/TextInput';

interface MainProps {
  bsState: BattleshipsState;
}

@observer
export class MainPanel extends React.PureComponent<MainProps> {
  public render() {
    const { bsState } = this.props;
    return (
      <>
        <TextInput
          placeholder={'NAME'}
          value={bsState.name}
          onChange={(name: string) => bsState.setName(name)}
        />
        <Button
          enabled={bsState.shouldEnableMainMenuButton()}
          text={'HOST'}
          onClick={() => bsState.setMenuScreen(MenuScreen.HOST)}
        />
        <Button
          enabled={bsState.shouldEnableMainMenuButton()}
          text={'JOIN'}
          onClick={() => bsState.setMenuScreen(MenuScreen.JOIN)}
        />
      </>
    );
  }
}
