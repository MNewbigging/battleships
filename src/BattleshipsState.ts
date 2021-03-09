import { timeStamp } from 'console';
import { action, observable } from 'mobx';
import Peer from 'peerjs';
import { AlertDuration, alerter } from './common/Alerter';

export enum BattleshipsScreen {
  MENU,
  GAME,
}

export enum MenuScreen {
  MAIN,
  HOST,
  JOIN,
}

// This tracks whether we're in the menu or playing the game
export class BattleshipsState {
  @observable public bshipsScreen = BattleshipsScreen.MENU;
  @observable public menuScreen = MenuScreen.MAIN;
  @observable public name = '';
  @observable public hostId = '';
  @observable public joinId = '';
  @observable public joining = false;
  @observable public joinerStatus = 'Waiting for player to join...';
  public peer: Peer;
  public otherPlayer?: Peer.DataConnection;
  public otherName?: string;

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
      this.joinerStatus = `${this.otherName} connecting...`;

      conn.on('open', () => {
        this.joinerStatus = 'Starting game...';
      });
    });
  }

  joinGame() {
    this.joining = true;
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
    });
  }

  private invalidHostId() {
    this.joining = false;
    alerter.showAlert({
      content: 'Cannot connect to host - check the join id is correct',
      duration: AlertDuration.NORMAL,
    });
  }
}
