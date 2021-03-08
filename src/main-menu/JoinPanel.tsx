import { observer } from 'mobx-react';
import React from 'react';

@observer
export class JoinPanel extends React.PureComponent {
  public render() {
    return (
      <>
        <div>back</div>
        <div>name</div>
        <div>join id</div>
        <div>Start game</div>
      </>
    );
  }
}
