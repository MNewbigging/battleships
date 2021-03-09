import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from './GameState';

interface GameProps {
  gState: GameState;
}

@observer
export class GameMain extends React.PureComponent<GameProps> {
  public render() {
    return <div>game screen</div>;
  }
}
