import { observer } from 'mobx-react';
import React from 'react';

@observer
export class MainPanel extends React.PureComponent {
  public render() {
    return (
      <>
        <div>name</div>
        <div>host</div>
        <div>join</div>
      </>
    );
  }
}
