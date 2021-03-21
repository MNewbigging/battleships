import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from './GameState';

import './game.scss';

interface GameProps {
  gState: GameState;
}

@observer
export class GameMain extends React.PureComponent<GameProps> {
  public render() {
    return (
      <div className={'game'}>
        <div>oh herro</div>
      </div>
    );
  }
}
