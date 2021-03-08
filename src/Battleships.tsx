import { observer } from 'mobx-react';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { BattleshipsScreen, BattleshipsState } from './BattleshipsState';

import './battleships.scss';
import { MainMenu } from './main-menu/MainMenu';

@observer
export class Battleships extends React.PureComponent {
  private readonly bsState = new BattleshipsState();

  public render() {
    this.parseUrlHash();

    let toRender: JSX.Element;

    switch (this.bsState.bshipsScreen) {
      case BattleshipsScreen.MENU:
        toRender = <MainMenu bsState={this.bsState} />;
        break;
      case BattleshipsScreen.GAME:
        toRender = <div>game</div>;
        break;
    }

    return (
      <div className={'background'}>
        <HashRouter>
          <Switch>
            <Route render={() => toRender} />
          </Switch>
        </HashRouter>
      </div>
    );
  }

  private parseUrlHash() {
    const query = window.location.hash;
    // See if we've been given a join id
    // If so, url will be of format: base/#/joinId=123joinId456
    const splitQuery = query.split('=');
    if (splitQuery.length === 2) {
      const joinId = splitQuery[1];
      this.bsState.setJoinId(joinId);
    }
  }
}
