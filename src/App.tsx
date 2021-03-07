import { observer } from 'mobx-react';
import React from 'react';
import { AppState } from './AppState';
import { DnDPage } from './DnDPage';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return <DnDPage state={this.appState} />;
  }
}
