import { action, observable } from 'mobx';
import Peer from 'peerjs';

import { BaseMessage, MessageType, NameMessage, ReadyMessage } from '../common/Messages';
import { Cell } from '../game-setup/GridData';

export enum GameScreen {
  SETUP,
  MAIN,
}

export class GameState {
  @observable public gameScreen = GameScreen.SETUP;

  // Player data
  public yourPlayer?: Peer;
  public yourName?: string;
  public otherPlayer?: Peer.DataConnection;
  @observable public otherPlayerName?: string;

  // Game data
  public yourGrid?: Cell[][];
  public otherPlayerGrid?: Cell[][];

  constructor(
    yourPeer: Peer,
    yourName: string,
    otherPlayer: Peer.DataConnection,
    otherPlayerName?: string
  ) {
    this.yourPlayer = yourPeer;
    this.yourName = yourName;
    this.otherPlayer = otherPlayer;
    this.otherPlayerName = otherPlayerName ?? '';
  }

  @action setGameScreen(screen: GameScreen) {
    this.gameScreen = screen;
  }

  @action onReady(grid: Cell[][]) {
    // Assign game data
    this.yourGrid = grid;

    // Tell other player you're ready
    const readyMsg = new ReadyMessage(JSON.stringify(this.yourGrid));
    this.otherPlayer.send(JSON.stringify(readyMsg));

    // If other player is also ready, start the game
    if (this.otherPlayerGrid) {
      this.setGameScreen(GameScreen.MAIN);
    }
  }

  @action receiveMessage(message: BaseMessage) {
    console.log('recieved message: ', message);
    switch (message.type) {
      case MessageType.NAME:
        this.otherPlayerName = (message as NameMessage).name;
        break;
      case MessageType.READY:
        const gridStr = (message as ReadyMessage).grid;
        this.otherPlayerGrid = JSON.parse(gridStr);
        if (this.yourGrid) {
          this.setGameScreen(GameScreen.MAIN);
        }
        break;
    }
  }
}
