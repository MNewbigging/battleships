import { action, observable } from 'mobx';
import Peer from 'peerjs';
import { BaseMessage, MessageType, NameMessage } from '../common/Messages';

export enum GameScreen {
  SETUP,
  MAIN,
}

export class GameState {
  @observable public gameScreen = GameScreen.SETUP;
  public yourPlayer?: Peer;
  public yourName?: string;
  public otherPlayer?: Peer.DataConnection;
  @observable public otherPlayerName?: string;

  constructor(
    yourPeer?: Peer,
    yourName?: string,
    otherPlayer?: Peer.DataConnection,
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

  // TODO takes game data
  @action onReadyUp() {
    // Assign game data, check if both players are ready now
  }

  @action receiveMessage(message: BaseMessage) {
    console.log('recieved message: ', message);
    switch (message.type) {
      case MessageType.NAME:
        this.otherPlayerName = (message as NameMessage).name;
        break;
    }
  }
}
