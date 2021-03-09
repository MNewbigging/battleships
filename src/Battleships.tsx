import { observer } from 'mobx-react';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { BattleshipsScreen, BattleshipsState } from './BattleshipsState';
import { Alert } from './common/Alert';
import { alerter } from './common/Alerter';
import { MainMenu } from './main-menu/MainMenu';

import './battleships.scss';

@observer
export class Battleships extends React.PureComponent {
  private readonly bsState = new BattleshipsState();

  public render() {
    this.parseUrlHash();

    let scene: JSX.Element;

    switch (this.bsState.bshipsScreen) {
      case BattleshipsScreen.MENU:
        scene = <MainMenu bsState={this.bsState} />;
        break;
      case BattleshipsScreen.GAME:
        scene = <div>game</div>;
        break;
    }

    const toRender = (
      <>
        <Alert open={alerter.alertShowing} content={alerter.alertContent} />
        {scene}
      </>
    );

    return (
      <div className={'background'}>
        <div className={'stars'}></div>
        <div className={'stars2'}></div>
        <div className={'stars3'}></div>
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
