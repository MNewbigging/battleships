import { action, observable } from 'mobx';
import Peer from 'peerjs';

import { AlertDuration, alerter } from './common/Alerter';
import { NameMessage } from './common/Messages';
import { GameState } from './game/GameState';

export enum BattleshipsScreen {
  MENU,
  GAME,
}

export enum MenuScreen {
  MAIN,
  HOST,
  JOIN,
}

export enum JoinStatus {
  WAITING = 'Waiting...',
  CONNECTING = 'Connecting...',
  CONNECTED = 'Starting game...',
}

export class BattleshipsState {
  @observable public bshipsScreen = BattleshipsScreen.MENU;
  @observable public menuScreen = MenuScreen.MAIN;
  @observable public name = '';
  @observable public hostId = '';
  @observable public joinId = '';
  @observable public joining = false;
  @observable public joinerStatus = JoinStatus.WAITING;
  public gameState?: GameState;
  private readonly peer: Peer;
  private otherPlayer?: Peer.DataConnection;
  private otherName?: string;

  constructor() {
    this.peer = new Peer({
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
        ],
      },
    });
    this.peer.on('open', (id: string) => (this.hostId = id));

    // Prepare to be host by default
    this.hostGame();
  }

  @action setBattleshipsScreen(screen: BattleshipsScreen) {
    this.bshipsScreen = screen;
  }

  @action setMenuScreen(screen: MenuScreen) {
    this.menuScreen = screen;
  }

  @action setJoinId(id: string) {
    this.joinId = id;
  }

  @action setName(name: string) {
    this.name = name;
  }

  shouldEnableMainMenuButton() {
    return this.name.length > 0;
  }

  shouldEnableJoinButton() {
    return this.name.length > 0 && this.joinId.length > 0 && !this.joining;
  }

  async copyInviteLink() {
    try {
      const inviteLink = `https://mnewbigging.github.io/battleships/#/joinId=${this.hostId}`;
      await navigator.clipboard.writeText(inviteLink);
      alerter.showAlert({
        content: 'Copied link to clipboard!',
        duration: AlertDuration.QUICK,
      });
    } catch (e) {
      console.error('Could not copy to clipboard, ', e);
    }
  }

  hostGame() {
    this.peer.on('connection', (conn: Peer.DataConnection) => {
      this.otherPlayer = conn;
      this.otherName = conn.label;
      this.joinerStatus = JoinStatus.CONNECTING;

      conn.on('open', () => {
        this.joinerStatus = JoinStatus.CONNECTED;
        // Send joiner host name
        const nameMsg = new NameMessage(this.name);
        conn.send(JSON.stringify(nameMsg));
        // Ready to start
        this.onConnect();
      });
    });
  }

  joinGame() {
    this.joining = true;
    this.joinerStatus = JoinStatus.CONNECTING;
    const conn = this.peer.connect(this.joinId, { label: this.name });

    // Handle invalid join id
    this.peer.on('error', () => this.invalidHostId());

    // Handle inevitable first failure
    conn.peerConnection.onconnectionstatechange = (_ev: Event) => {
      if (conn.peerConnection.connectionState === 'failed') {
        this.joinGame();
      }
    };

    // Connected to host
    conn.on('open', () => {
      this.otherPlayer = conn;
      this.joinerStatus = JoinStatus.CONNECTED;
      this.onConnect();
    });
  }

  onConnect() {
    this.gameState = new GameState(this.peer, this.name, this.otherPlayer, this.otherName);
    this.otherPlayer.on('data', (data: any) => this.gameState.receiveMessage(JSON.parse(data)));
    // Delay swap to game
    setTimeout(() => this.setBattleshipsScreen(BattleshipsScreen.GAME), 3000);
  }

  private invalidHostId() {
    this.joining = false;
    alerter.showAlert({
      content: 'Cannot connect to host - check the join id is correct',
      duration: AlertDuration.NORMAL,
    });
  }
}
