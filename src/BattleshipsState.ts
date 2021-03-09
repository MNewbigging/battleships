import { action, observable } from 'mobx';

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
    return this.name.length > 0 && this.joinId.length > 0;
  }

  public joinGame() {}
}
