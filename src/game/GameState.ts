import { action, observable } from 'mobx';
import Peer from 'peerjs';

import {
  BaseMessage,
  MessageType,
  NameMessage,
  ReadyMessage,
  StartMessage,
} from '../common/Messages';
import { Cell, GridPos, GRID_SIZE } from '../game-setup/GridData';
import { ShipUtils } from '../game-setup/ShipUtils';

export enum GameScreen {
  SETUP,
  MAIN,
}

export enum Turn {
  YOUR_TURN,
  THEIR_TURN,
}

export enum Attack {
  NONE = 'none',
  HIT = 'hit',
  MISS = 'miss',
}

export class GameState {
  @observable public gameScreen = GameScreen.SETUP;

  // Player data
  public isHost: boolean;
  public yourPlayer?: Peer;
  public yourName?: string;
  public otherPlayer?: Peer.DataConnection;
  @observable public otherPlayerName?: string;

  // Game data
  public turn: Turn;
  @observable public gameStatus = '';
  public yourGrid?: Cell[][];
  public otherPlayerGrid?: Cell[][];
  public yourAttacks: Attack[][] = [];
  public otherPlayerAttacks: Attack[][] = [];
  @observable attackTarget?: GridPos;

  constructor(
    yourPeer: Peer,
    yourName: string,
    otherPlayer: Peer.DataConnection,
    otherPlayerName?: string,
    isHost = false
  ) {
    this.yourPlayer = yourPeer;
    this.yourName = yourName;
    this.otherPlayer = otherPlayer;
    this.otherPlayerName = otherPlayerName ?? '';
    this.isHost = isHost;
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
      this.readyGame();
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
          this.readyGame();
        }
        break;
      case MessageType.START:
        this.startGame((message as StartMessage).youStart);
        break;
    }
  }

  public shouldEnableAttackBtn() {
    return this.turn === Turn.YOUR_TURN && this.attackTarget !== undefined;
  }

  @action public selectAttackCell(pos: GridPos) {
    if (ShipUtils.areGridPositionsEqual(this.attackTarget, pos)) {
      this.attack(pos);
    } else {
      this.attackTarget = pos;
    }
  }

  @action private attack(pos: GridPos) {
    this.attackTarget = undefined;
  }

  @action private readyGame() {
    this.setupAttackGrids();

    // Host rolls for starting player
    if (this.isHost) {
      this.decideStartingPlayer();
    }

    this.setGameScreen(GameScreen.MAIN);
  }

  @action private setupAttackGrids() {
    this.yourAttacks = [];
    this.otherPlayerAttacks = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      const yCol: Attack[] = [];
      const oCol: Attack[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        oCol.push(Attack.NONE);
        yCol.push(Attack.NONE);
      }
      this.yourAttacks.push(yCol);
      this.otherPlayerAttacks.push(oCol);
    }
  }

  @action private decideStartingPlayer() {
    const theyStart = Math.random() < 0.5;
    const startMsg = new StartMessage(theyStart);
    this.otherPlayer.send(JSON.stringify(startMsg));
    this.startGame(!theyStart);
  }

  @action private startGame(youStart: boolean) {
    // Initialise turns
    if (youStart) {
      this.turn = Turn.YOUR_TURN;
    } else {
      this.turn = Turn.THEIR_TURN;
    }

    this.updateGameStatus();
  }

  @action private updateGameStatus() {
    if (this.turn === Turn.YOUR_TURN) {
      this.gameStatus = `${this.yourName} is playing`;
    } else {
      this.gameStatus = `${this.otherPlayerName} is playing`;
    }
  }
}
