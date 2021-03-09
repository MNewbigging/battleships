import { observer } from 'mobx-react';
import React from 'react';
import { GameSetup } from '../game-setup/GameSetup';
import { GameMain } from './GameMain';

import { GameScreen, GameState } from './GameState';

interface GameProps {
  gState: GameState;
}

@observer
export class Game extends React.PureComponent<GameProps> {
  public render() {
    const { gState } = this.props;

    if (gState.gameScreen === GameScreen.SETUP) {
      return <GameSetup onReady={() => this.onReady()} />;
    }

    return <GameMain gState={gState} />;
  }

  private onReady() {
    // Take game data, pass to state
  }
}
