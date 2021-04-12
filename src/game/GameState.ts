import { action, observable } from 'mobx';
import Peer from 'peerjs';

import {
  AttackMessage,
  BaseMessage,
  MessageType,
  NameMessage,
  ReadyMessage,
  StartMessage,
} from '../common/Messages';
import { Cell, GridPos, GRID_SIZE, TargetCell } from '../game-setup/GridData';
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
  @observable public yourAttacks: TargetCell[][] = [];
  @observable public otherPlayerAttacks: TargetCell[][] = [];
  @observable public attackTarget?: GridPos;

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
      case MessageType.ATTACK:
        this.otherPlayerAttacks = (message as AttackMessage).attackGrid;
        break;
    }
  }

  @action public selectAttackCell(pos: GridPos) {
    if (ShipUtils.areGridPositionsEqual(this.attackTarget, pos)) {
      this.attack(pos);
    } else {
      // Deselect any last selected pos
      if (this.attackTarget) {
        this.yourAttacks[this.attackTarget.x][this.attackTarget.y].selected = false;
      }
      // Select the new target
      this.attackTarget = pos;
      this.yourAttacks[pos.x][pos.y].selected = true;
    }
  }

  @action private attack(pos: GridPos) {
    // Check for a hit or miss
    const attack = this.otherPlayerGrid[pos.x][pos.y]?.content !== '' ? Attack.HIT : Attack.MISS;
    this.yourAttacks[pos.x][pos.y].attack = attack;

    // Inform opponent of attack made
    const attackMsg = new AttackMessage(this.yourAttacks);
    this.otherPlayer.send(JSON.stringify(attackMsg));

    // Check if you can fire again

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
      const yCol: TargetCell[] = [];
      const oCol: TargetCell[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        oCol.push(new TargetCell());
        yCol.push(new TargetCell());
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
