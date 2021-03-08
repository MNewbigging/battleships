import { observer } from 'mobx-react';
import React from 'react';

import { BattleshipsState, MenuScreen } from '../BattleshipsState';
import { HostPanel } from './HostPanel';
import { JoinPanel } from './JoinPanel';
import { MainPanel } from './MainPanel';

import './main-menu.scss';

interface MenuProps {
  bsState: BattleshipsState;
}

@observer
export class MainMenu extends React.PureComponent<MenuProps> {
  public render() {
    const { bsState } = this.props;
    let toRender: JSX.Element;
    switch (bsState.menuScreen) {
      case MenuScreen.MAIN:
        toRender = <MainPanel />;
        break;
      case MenuScreen.HOST:
        toRender = <HostPanel />;
        break;
      case MenuScreen.JOIN:
        toRender = <JoinPanel />;
        break;
    }

    return (
      <>
        <div className={'panel'}>{toRender}</div>
        <div className={'how-to-play'}>{this.renderHowToPlay()}</div>
      </>
    );
  }

  private renderHowToPlay() {
    return (
      <>
        <h1>HOW TO PLAY</h1>
        <p>This is how you play the game</p>
        <p>how awesome</p>
      </>
    );
  }
}
